# DigiTech Lifestyle — Hard Rules

## This is NOT FlowState

| | Path | GitHub |
|---|---|---|
| **This repo** | `Claude - Flowstate/digitechlifestyle/` | `digitechlifestyle/digitechlifestyle.git` |
| FlowState (different product) | `Claude - Flowstate/` | `digitechlifestyle/FlowState.git` |

**Never mix them. Never commit DigiTech from the parent folder.**

## Git push — only ever this

```bash
cd '/Users/joerobertson/Claude - Flowstate/digitechlifestyle'
git push origin main
# (uses PAT stored in keychain — run from Mac Terminal if Claude shell fails)
```

## What this site is

- **digitechlifestyle.com** — crypto, AI, digital lifestyle for UK readers
- Author: Joe Robertson
- Stack: Next.js static export (`output: "export"`), deployed via rsync to Hostinger

## Banned content (wrong branding — never use on this site)

This site is **digitechlifestyle.com** — crypto, AI, UK news. Any copy that doesn't match must be rewritten.

Specifically blocked by the digitech-guard hook (will hard-block your edit):
- "Digital Living Brief"
- "smarter workflows"
- "stronger income channels"
- "Affiliate angles"
- "Tool picks / Automation ideas" (as newsletter copy)

## Never revert these fixes

1. `src/lib/articles.ts` — `replace("https://www.digitechlifestyle.com", "https://digitechlifestyle.com")` — keeps image URLs non-www
2. `.htaccess` on Hostinger — `Options +FollowSymLinks` — lets wp-content/uploads symlink serve images
3. `wp-content/uploads` symlink on Hostinger → points to 206789 subdomain WP uploads

## Never expose

`digitechlifestyle-com-206789.hostingersite.com` — internal subdomain, never in HTML visible to users

## Deploy

```bash
cd '/Users/joerobertson/Claude - Flowstate/digitechlifestyle'
./deploy.sh
```

Or manually: build → rsync to `/home/u505433088/domains/digitechlifestyle.com/public_html/`
SSH: `ssh -i ~/.ssh/digitech_deploy -p 65002 u505433088@77.37.37.226`

## Before touching anything

1. Read this file (done — you're reading it)
2. Check what's broken on arrival before making changes
3. Verify after every change
4. Never say "fixed" without proof (HTTP 200, git hash, or deploy log line)
