#!/usr/bin/env node
/**
 * DigiTech Lifestyle — autonomous daily article publisher
 * Runs via launchd at 9am. Uses Claude CLI to write articles, publishes to WP, deploys site.
 * No Claude Code session required. No permission prompts.
 */

import https from 'https';
import { execSync, spawnSync } from 'child_process';
import { readFileSync, appendFileSync } from 'fs';

const CLAUDE = '/Users/joerobertson/Library/Application Support/Claude/claude-code/2.1.181/claude.app/Contents/MacOS/claude';
const WP_HOST = 'digitechlifestyle-com-206789.hostingersite.com';
const WP_CREDS = Buffer.from('digitechlifestyle@gmail.com:Hmm4!hH)B214@!Ew4ILQmX7J').toString('base64');
const IMAGE_REGISTRY = '/Users/joerobertson/.claude/projects/-Users-joerobertson-Claude---Flowstate/memory/reference_digitechlifestyle_images.md';
const LOG = '/Users/joerobertson/Claude - Flowstate/digitechlifestyle/auto-publish.log';
const DEPLOY = '/Users/joerobertson/Claude - Flowstate/digitechlifestyle/deploy.sh';

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  appendFileSync(LOG, line + '\n');
}

function wpRequest(path, method, data, isBuffer, contentType, disposition) {
  return new Promise((resolve, reject) => {
    const body = isBuffer ? data : (data ? Buffer.from(JSON.stringify(data)) : null);
    const headers = {
      'Authorization': 'Basic ' + WP_CREDS,
      ...(contentType ? { 'Content-Type': contentType } : { 'Content-Type': 'application/json' }),
      ...(disposition ? { 'Content-Disposition': disposition } : {}),
      ...(body ? { 'Content-Length': body.length } : {})
    };
    const opts = { hostname: WP_HOST, path, method: method || 'GET', headers };
    const req = https.request(opts, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { reject(new Error('Bad JSON: ' + d.slice(0,200))); } });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function getUrl(url) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    https.get(url, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        getUrl(r.headers.location).then(resolve).catch(reject);
        return;
      }
      r.on('data', c => chunks.push(c));
      r.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

function askClaude(prompt) {
  log('Calling Claude CLI...');
  const result = spawnSync(CLAUDE, ['--print', '--output-format', 'text', prompt], {
    encoding: 'utf8',
    timeout: 300000, // 5 min
    env: { ...process.env, HOME: '/Users/joerobertson' }
  });
  if (result.error) throw new Error('Claude CLI error: ' + result.error.message);
  if (result.status !== 0) throw new Error('Claude CLI failed: ' + (result.stderr || '').slice(0, 500));
  return result.stdout.trim();
}

async function getLatestPostDate() {
  const posts = await wpRequest('/wp-json/wp/v2/posts?per_page=3&orderby=date&order=desc&_fields=id,date,title', 'GET');
  posts.forEach(p => log(`  Existing: WP${p.id} ${p.date.slice(0,10)} ${p.title.rendered.slice(0,50)}`));
  return posts[0]?.date || '2026-06-01T00:00:00';
}

async function getExistingTitles() {
  const posts = await wpRequest('/wp-json/wp/v2/posts?per_page=100&_fields=title', 'GET');
  return posts.map(p => p.title.rendered.toLowerCase());
}

function getUsedImageIds() {
  try {
    const content = readFileSync(IMAGE_REGISTRY, 'utf8');
    const matches = content.match(/pexels-photo-(\d+)/g) || [];
    return new Set(matches.map(m => m.replace('pexels-photo-', '')));
  } catch { return new Set(); }
}

function pickTopics(existingTitles, runCount) {
  const aiQueue = [
    { title: 'Chatbots and Virtual Assistants: The Future of Customer Service', cat: 1372 },
    { title: 'AI and Creativity: Can Machines Make Art and Music?', cat: 1372 },
    { title: 'Deep Learning vs Machine Learning: The Key Differences Explained', cat: 1372 },
    { title: 'AI in Education: Personalised Learning and Automated Grading', cat: 1372 },
    { title: 'Large Language Models and Their Limitations', cat: 1372 },
    { title: 'Prompt Engineering: How to Get Better Results from AI', cat: 1374 },
    { title: 'The Ethical Case for AI Regulation in the UK', cat: 1372 },
    { title: 'AI in Healthcare: Revolutionising Diagnosis and Treatment', cat: 1372 },
    { title: 'How AI Is Changing the UK Job Market', cat: 1372 },
    { title: 'Computer Vision Explained: How AI Sees the World', cat: 1372 },
    { title: 'Reinforcement Learning: How AI Learns by Trial and Error', cat: 1372 },
    { title: 'AI and Climate Change: Can Technology Help Save the Planet?', cat: 1372 },
  ];
  const cryptoQueue = [
    { title: 'Top 4 Security Risks in Digital Assets and How to Avoid Them', cat: 930 },
    { title: 'The Importance of Self-Custody: Why You Should Own Your Crypto Keys', cat: 1377 },
    { title: 'Crypto Lending Platforms: How They Work and the Risks', cat: 1377 },
    { title: 'NFTs in Gaming: Play-to-Earn and Virtual Economies Explained', cat: 1377 },
    { title: 'Crypto in Retirement Planning: What UK Investors Need to Know', cat: 1377 },
    { title: 'The Psychology of Crypto Investing: Avoiding FOMO and Panic Selling', cat: 1377 },
    { title: 'Crypto Tax in the UK: Complete HMRC Guide for 2026', cat: 1377 },
    { title: 'Bitcoin vs Ethereum: Which Is the Better Investment for UK Holders?', cat: 1377 },
    { title: 'What Is Dollar Cost Averaging and Does It Work for Crypto?', cat: 1377 },
    { title: 'Staking Explained: How to Earn Passive Income from Crypto', cat: 1377 },
  ];

  const avail = (q) => q.filter(t => !existingTitles.some(e => e.includes(t.title.toLowerCase().slice(0, 20))));

  const availAI = avail(aiQueue);
  const availCrypto = avail(cryptoQueue);

  // Alternate: even runs = 2AI+1Crypto, odd = 1AI+2Crypto
  const pattern = runCount % 2 === 0 ? [availAI[0], availAI[1], availCrypto[0]] : [availAI[0], availCrypto[0], availCrypto[1]];
  return pattern.filter(Boolean).slice(0, 3);
}

function makePastDate(index) {
  // Always use yesterday's date to guarantee past timestamps
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(8 + index * 2, 0, 0, 0);
  return d.toISOString().slice(0, 19);
}

async function publishArticle(topic, dateStr, articleNum) {
  log(`Writing article ${articleNum}: ${topic.title}`);

  const prompt = `Write a high-quality evergreen blog article for digitechlifestyle.com about: "${topic.title}"

Requirements:
- 1600+ words minimum
- HTML format only: use <p>, <h2>, <ul>, <li> tags. No markdown, no # headers
- UK audience: mention HMRC, FCA, GBP, UK regulations, UK companies where relevant
- Each section: 2-3 paragraphs, max 4 sentences each, max 25 words per sentence
- At least one specific number or statistic per section
- Opening paragraph: hook that explains why this matters to UK readers NOW
- 6-8 subheadings as <h2> tags
- End with <h2>What This Means for You</h2> section
- Final line exactly: <p><em>This article is for educational purposes only and does not constitute financial advice. Cryptocurrency investments involve significant risk. Always do your own research.</em></p>

Anti-AI writing rules (mandatory):
- Mix very short sentences (3-5 words) with longer complex ones
- Use unexpected phrasing: "falls apart fast", "ugly workaround" — not "improves efficiency"
- Add first-person signals at least twice: "When I looked into this...", "UK investors keep asking..."
- BANNED words: delve, comprehensive, robust, leverage, utilize, facilitate
- BANNED sentence starters: Furthermore, Moreover, Additionally
- Never list exactly 5 items — use 4, 6, 7, or 9 items

Output ONLY the HTML article content. No introduction, no explanation, no markdown. Start with <p> and end with </p>.`;

  const content = askClaude(prompt);

  if (!content || content.length < 3000) {
    throw new Error(`Article too short: ${content.length} chars`);
  }
  log(`Article written: ${content.length} chars`);

  // Pick image based on category
  const usedIds = getUsedImageIds();
  const imageOptions = topic.cat === 1377
    ? ['6802042', '4386424', '6801648', '7047268', '4386369', '844124', '6770614']
    : ['8386440', '2599244', '3861969', '8386461', '3184418', '1181298', '2582937', '5669619'];

  const imgId = imageOptions.find(id => !usedIds.has(id));
  if (!imgId) throw new Error('No unused image IDs available');

  const imgUrl = `https://images.pexels.com/photos/${imgId}/pexels-photo-${imgId}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
  log(`Using image: ${imgId}`);

  const imgBuf = await getUrl(imgUrl);
  const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
  const media = await wpRequest('/wp-json/wp/v2/media', 'POST', imgBuf, true, 'image/jpeg', `attachment; filename="${slug}.jpg"`);
  if (!media.id) throw new Error('Media upload failed: ' + JSON.stringify(media).slice(0, 200));
  log(`Media uploaded: ${media.id}`);

  const excerpt = askClaude(`Write a 140-160 character SEO excerpt for this article title: "${topic.title}". UK audience. Include primary keyword. Output ONLY the excerpt text, nothing else.`);

  const post = await wpRequest('/wp-json/wp/v2/posts', 'POST', {
    title: topic.title,
    content,
    excerpt: excerpt.slice(0, 160),
    status: 'publish',
    date: dateStr,
    categories: [topic.cat],
    featured_media: media.id
  });

  if (!post.id) throw new Error('Post creation failed: ' + JSON.stringify(post).slice(0, 200));
  log(`Post created: WP${post.id} status=${post.status}`);

  // Fix if stuck as future
  if (post.status !== 'publish') {
    const fix = await wpRequest(`/wp-json/wp/v2/posts/${post.id}`, 'POST', { status: 'publish', date: makePastDate(0) });
    log(`Fixed status: ${fix.status}`);
    if (fix.status !== 'publish') throw new Error('Could not set post to publish');
  }

  // Set alt text
  await wpRequest(`/wp-json/wp/v2/media/${media.id}`, 'POST', { alt_text: `${topic.title} — UK guide 2026` });

  // Update image registry
  const regLine = `\n| auto | ${topic.title.slice(0, 60)} (WP ID ${post.id}) | ${imgUrl} |`;
  appendFileSync(IMAGE_REGISTRY, regLine);
  log(`Registry updated`);

  return { id: post.id, title: topic.title, status: 'publish' };
}

async function main() {
  log('=== Auto-publish started ===');

  // Count previous runs to alternate AI/Crypto pattern
  let runCount = 0;
  try {
    const logContent = readFileSync(LOG, 'utf8');
    runCount = (logContent.match(/=== Auto-publish started ===/g) || []).length - 1;
  } catch { runCount = 0; }
  log(`Run count: ${runCount}`);

  const [existingTitles] = await Promise.all([getExistingTitles()]);
  await getLatestPostDate();

  const topics = pickTopics(existingTitles, runCount);
  if (topics.length === 0) {
    log('ERROR: No unpublished topics found');
    process.exit(1);
  }
  log(`Selected topics: ${topics.map(t => t.title).join(' | ')}`);

  const results = [];
  for (let i = 0; i < topics.length; i++) {
    try {
      const result = await publishArticle(topics[i], makePastDate(i), i + 1);
      results.push(result);
      log(`✅ Published: ${result.title} — WP${result.id}`);
    } catch (err) {
      log(`❌ FAILED article ${i + 1}: ${err.message}`);
    }
  }

  if (results.length === 0) {
    log('ERROR: Zero articles published. Not deploying.');
    process.exit(1);
  }

  log('Deploying site...');
  try {
    execSync(`bash "${DEPLOY}"`, { stdio: 'inherit', timeout: 600000 });
    log('✅ Deploy complete');
  } catch (err) {
    log(`❌ Deploy failed: ${err.message}`);
  }

  log(`=== Done: ${results.length}/3 articles published ===`);
  results.forEach(r => log(`  WP${r.id}: ${r.title}`));
}

main().catch(err => {
  log('FATAL: ' + err.message);
  process.exit(1);
});
