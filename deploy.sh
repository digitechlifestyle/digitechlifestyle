#!/bin/bash
# DigiTech Lifestyle — build + deploy to Hostinger
# Runs nightly via launchd. Can also run manually: ./deploy.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG="$SCRIPT_DIR/deploy.log"
SSH_KEY="$HOME/.ssh/digitech_deploy"
SSH_HOST="u505433088@77.37.37.226"
SSH_PORT=65002
REMOTE_PATH="/home/u505433088/domains/digitechlifestyle.com/public_html/"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Build started" >> "$LOG"

# Self-heal WP core BEFORE build (build needs wp-json alive to fetch articles).
# Restores wp-includes/wp-admin from ~/wp-core-backup on server if damaged.
ssh -i "$SSH_KEY" -p "$SSH_PORT" -o StrictHostKeyChecking=no "$SSH_HOST" \
  "/home/u505433088/wp-core-heal.sh" >> "$LOG" 2>&1 || true

# Abort if WP API is down — deploying placeholder pages is worse than not deploying
if ! curl -sf --max-time 20 "https://digitechlifestyle.com/wp-json/wp/v2/posts?per_page=1&_fields=slug" > /dev/null; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ABORT: wp-json unreachable — skipping deploy to protect live site" >> "$LOG"
  exit 1
fi

# Build
cd "$SCRIPT_DIR"
export PATH="/Users/joerobertson/.nvm/versions/node/v24.18.0/bin:$PATH"
# Clear Next.js fetch cache so WP articles are always fresh
rm -rf .next/cache/fetch-cache
npm run build >> "$LOG" 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Build done. Deploying..." >> "$LOG"

# Deploy. WP dirs/files are excluded so rsync NEVER uploads over or deletes them.
rsync -a --delete-after \
  -e "ssh -i $SSH_KEY -p $SSH_PORT -o StrictHostKeyChecking=no" \
  "$SCRIPT_DIR/out/" \
  "$SSH_HOST:$REMOTE_PATH" \
  --exclude="index.php" \
  --exclude="default.php" \
  --exclude="license.txt" \
  --exclude=".htaccess" \
  --exclude="wp-api-proxy.php" \
  --exclude="wp-admin" \
  --exclude="wp-includes" \
  --exclude="wp-content" \
  --exclude="wp-*.php" \
  --exclude="xmlrpc.php" \
  --exclude="prices.php" \
  --filter="protect _next/static/chunks/***" \
  --filter="protect _next/static/css/***" \
  >> "$LOG" 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deploy complete." >> "$LOG"
