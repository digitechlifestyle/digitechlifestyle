#!/usr/bin/env node
/**
 * DigiTech Lifestyle — queue-based article publisher
 * Reads pre-written articles from article-queue/*.json, publishes 2 per run to WordPress.
 * Runs via launchd at 9am daily. No Claude CLI needed — all content is pre-written.
 *
 * Usage: node queue-publisher.mjs [--dry-run]
 *
 * RULES:
 * - Always uses yesterday's date to avoid WP "future" status bug
 * - Verifies post.status === "publish" after creation, fixes if not
 * - Marks published articles with .published extension to skip on next run
 * - Only deploys if at least 1 article published successfully
 */

import https from 'https';
import { readFileSync, writeFileSync, readdirSync, appendFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const QUEUE_DIR = resolve(__dir, 'article-queue');
const LOG_FILE = resolve(__dir, 'queue-publisher.log');
const DEPLOY = resolve(__dir, 'deploy.sh');
const IMAGE_REGISTRY = '/Users/joerobertson/.claude/projects/-Users-joerobertson-Claude---Flowstate/memory/reference_digitechlifestyle_images.md';

const WP_HOST = 'digitechlifestyle-com-206789.hostingersite.com';
const WP_CREDS = Buffer.from('digitechlifestyle@gmail.com:Hmm4!hH)B214@!Ew4ILQmX7J').toString('base64');

const DRY_RUN = process.argv.includes('--dry-run');

function pastDate(hoursAgo) {
  const d = new Date();
  d.setHours(d.getHours() - (hoursAgo || 2));
  return d.toISOString().slice(0, 19);
}

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  appendFileSync(LOG_FILE, line + '\n');
  process.stderr.write(line + '\n'); // stderr goes to console only, not log file
}

function wpRequest(path, method, data, isBuffer, contentType, disposition) {
  return new Promise((resolve, reject) => {
    const body = isBuffer ? data : (data ? Buffer.from(JSON.stringify(data)) : null);
    const headers = {
      'Authorization': 'Basic ' + WP_CREDS,
      'Content-Type': contentType || 'application/json',
      ...(disposition ? { 'Content-Disposition': disposition } : {}),
      ...(body ? { 'Content-Length': body.length } : {})
    };
    const opts = { hostname: WP_HOST, path, method: method || 'GET', headers };
    const req = https.request(opts, r => {
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => {
        const raw = Buffer.concat(chunks).toString();
        try { resolve(JSON.parse(raw)); }
        catch(e) { reject(new Error('Bad JSON from WP: ' + raw.slice(0, 300))); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    https.get(url, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        fetchUrl(r.headers.location).then(resolve).catch(reject);
        return;
      }
      r.on('data', c => chunks.push(c));
      r.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

// Returns today's date minus a small offset so articles appear as today's content
// index 0 = 30 mins ago, index 1 = 15 mins ago
async function getSlotDate(index) {
  const now = new Date();
  const offsetMins = (1 - index) * 15 + 15; // index 0 = 30 min ago, index 1 = 15 min ago
  now.setMinutes(now.getMinutes() - offsetMins);
  return now.toISOString().slice(0, 19);
}

function getQueueFiles() {
  const files = readdirSync(QUEUE_DIR)
    .filter(f => f.endsWith('.json') && !existsSync(`${QUEUE_DIR}/${f}.published`))
    .sort(); // alphabetical = creation order
  return files.map(f => resolve(QUEUE_DIR, f));
}

async function publishArticle(filePath, dateStr) {
  const article = JSON.parse(readFileSync(filePath, 'utf8'));
  const { title, category, imageId, altText, excerpt, content } = article;

  log(`Publishing: ${title}`);

  if (DRY_RUN) {
    log(`[DRY RUN] Would publish: ${title} with image ${imageId}`);
    return { id: 0, title };
  }

  // Download and upload image
  const imgUrl = `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
  log(`Fetching image: ${imageId}`);
  const imgBuf = await fetchUrl(imgUrl);

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
  const media = await wpRequest(
    '/wp-json/wp/v2/media',
    'POST',
    imgBuf,
    true,
    'image/jpeg',
    `attachment; filename="${slug}.jpg"`
  );

  if (!media.id) throw new Error('Media upload failed: ' + JSON.stringify(media).slice(0, 200));
  log(`Media uploaded: ${media.id}`);

  // Set alt text
  await wpRequest(`/wp-json/wp/v2/media/${media.id}`, 'POST', { alt_text: altText });

  // Create post
  const post = await wpRequest('/wp-json/wp/v2/posts', 'POST', {
    title,
    content,
    excerpt,
    status: 'publish',
    date: dateStr,
    categories: [category],
    featured_media: media.id
  });

  if (!post.id) throw new Error('Post creation failed: ' + JSON.stringify(post).slice(0, 300));
  log(`Post created: WP${post.id} status=${post.status}`);

  // Fix if WP made it "future" (should not happen with yesterday date, but guard anyway)
  if (post.status !== 'publish') {
    log(`Fixing status: was ${post.status}, forcing publish`);
    const fix = await wpRequest(`/wp-json/wp/v2/posts/${post.id}`, 'POST', {
      status: 'publish',
      date: pastDate(0)
    });
    if (fix.status !== 'publish') throw new Error(`Could not force publish: status=${fix.status}`);
    log(`Status fixed: ${fix.status}`);
  }

  // Update image registry
  const regLine = `\n| queue | ${title.slice(0, 70)} (WP${post.id}) | https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg |`;
  appendFileSync(IMAGE_REGISTRY, regLine);

  // Mark as published
  writeFileSync(`${filePath}.published`, `WP${post.id} published ${new Date().toISOString()}\n`);

  log(`✅ Done: WP${post.id} — ${title}`);
  return { id: post.id, title };
}

async function main() {
  log('=== Queue publisher started ===');

  const queue = getQueueFiles();
  log(`Queue: ${queue.length} articles waiting`);

  if (queue.length === 0) {
    log('Queue empty. Nothing to publish.');
    process.exit(0);
  }

  // Publish 2 articles per run
  const toPublish = queue.slice(0, 2);
  const results = [];

  for (let i = 0; i < toPublish.length; i++) {
    try {
      const dateStr = await getSlotDate(i);
      log(`Date slot ${i}: ${dateStr}`);
      const result = await publishArticle(toPublish[i], dateStr);
      results.push(result);
    } catch (err) {
      log(`❌ FAILED: ${toPublish[i]} — ${err.message}`);
    }
  }

  if (results.length === 0) {
    log('Zero articles published. Not deploying.');
    process.exit(1);
  }

  // Deploy handled by com.digitechlifestyle.deploy-hourly launchd job (7am, 10:30am, 1:30pm, 4:30pm, 7:30pm, 10:30pm)
  // Articles are live in WP now; static site rebuild happens on next deploy-hourly run
  log(`Published ${results.length} articles. Site rebuilds on next deploy-hourly run.`);
  if (DRY_RUN) log('[DRY RUN] Would publish to WP');

  const remaining = getQueueFiles();
  log(`Queue remaining: ${remaining.length} articles`);
  log(`=== Done: ${results.length}/2 published ===`);
  results.forEach(r => log(`  WP${r.id}: ${r.title}`));
}

main().catch(err => {
  log('FATAL: ' + err.message);
  process.exit(1);
});
