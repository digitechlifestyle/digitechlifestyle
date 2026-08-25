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

LOCK_DIR="$SCRIPT_DIR/.deploy.lock"

# Atomic lock (mkdir fails if it already exists) so two deploys (e.g. the
# hourly launchd job and a content routine's own deploy step) never run
# `next build` at the same time — Next.js hard-fails the second one with
# "Another next build process is already running." Wait up to 8 min for a
# stale build to clear before giving up.
WAITED=0
while ! mkdir "$LOCK_DIR" 2>/dev/null; do
  LOCK_PID=$(cat "$LOCK_DIR/pid" 2>/dev/null || echo "")
  if [ -n "$LOCK_PID" ] && ! kill -0 "$LOCK_PID" 2>/dev/null; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Stale lock from dead PID $LOCK_PID, removing" >> "$LOG"
    rm -rf "$LOCK_DIR"
    continue
  fi
  if [ "$WAITED" -ge 480 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ABORT: another deploy (PID $LOCK_PID) still running after 8 min wait" >> "$LOG"
    exit 1
  fi
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Another deploy (PID $LOCK_PID) in progress, waiting..." >> "$LOG"
  sleep 15
  WAITED=$((WAITED + 15))
done
echo $$ > "$LOCK_DIR/pid"
trap 'rm -rf "$LOCK_DIR"' EXIT

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Build started" >> "$LOG"

# Self-heal WP core BEFORE build (build needs wp-json alive to fetch articles).
# Restores wp-includes/wp-admin from ~/wp-core-backup on server if damaged.
ssh -i "$SSH_KEY" -p "$SSH_PORT" -o StrictHostKeyChecking=no -o ConnectTimeout=15 -o ServerAliveInterval=15 -o ServerAliveCountMax=4 "$SSH_HOST" \
  "/home/u505433088/wp-core-heal.sh" >> "$LOG" 2>&1 || true

# DB backup BEFORE build, on every deploy cycle. Files (wp-admin/wp-includes)
# have the heal script above; the database never had an equivalent — a
# 2026-07-25 DB rollback lost 641 posts with zero recoverable backup anywhere.
# Best-effort: a failed backup must never block a deploy.
ssh -i "$SSH_KEY" -p "$SSH_PORT" -o StrictHostKeyChecking=no -o ConnectTimeout=15 -o ServerAliveInterval=15 -o ServerAliveCountMax=4 "$SSH_HOST" \
  "/home/u505433088/wp-db-backup.sh" >> "$LOG" 2>&1 || echo "[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: DB backup failed" >> "$LOG"

# Pull the latest DB backup down to the Mac too — the 2026-07-25 incident
# wiped the entire server docroot in one shot, so a server-only backup isn't
# enough on its own.
LOCAL_DB_BACKUP_DIR="$SCRIPT_DIR/../site-backups/db-backups"
mkdir -p "$LOCAL_DB_BACKUP_DIR"
LATEST_REMOTE=$(ssh -i "$SSH_KEY" -p "$SSH_PORT" -o StrictHostKeyChecking=no -o ConnectTimeout=15 "$SSH_HOST" \
  "ls -t /home/u505433088/db-backups/db-*.sql.gz 2>/dev/null | head -1" 2>>"$LOG" || true)
if [ -n "$LATEST_REMOTE" ]; then
  scp -i "$SSH_KEY" -P "$SSH_PORT" -o StrictHostKeyChecking=no -o ConnectTimeout=15 \
    "$SSH_HOST:$LATEST_REMOTE" "$LOCAL_DB_BACKUP_DIR/" >> "$LOG" 2>&1 || echo "[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: local DB backup pull failed" >> "$LOG"
  # Keep the last 60 local copies too.
  ls -t "$LOCAL_DB_BACKUP_DIR"/db-*.sql.gz 2>/dev/null | tail -n +61 | xargs -r rm --
fi

# Abort if WP API is down — deploying placeholder pages is worse than not deploying
if ! curl -sf --max-time 20 "https://digitechlifestyle.com/wp-json/wp/v2/posts?per_page=1&_fields=slug" > /dev/null; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ABORT: wp-json unreachable — skipping deploy to protect live site" >> "$LOG"
  exit 1
fi

# Build
cd "$SCRIPT_DIR"
NODE_BIN="$(ls -d "$HOME"/.nvm/versions/node/*/bin 2>/dev/null | sort -V | tail -1)"
export PATH="$NODE_BIN:$PATH"
# Clear Next.js fetch cache so WP articles are always fresh
rm -rf .next/cache/fetch-cache
npm run build >> "$LOG" 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Build done. Deploying..." >> "$LOG"

# Deploy. WP dirs/files are excluded so rsync NEVER uploads over or deletes them.
# Hostinger SSH occasionally resets mid-transfer; retry before giving up.
RSYNC_OK=0
for i in 1 2 3; do
  if rsync -a --timeout=120 \
    -e "ssh -i $SSH_KEY -p $SSH_PORT -o StrictHostKeyChecking=no -o ConnectTimeout=15 -o ServerAliveInterval=15 -o ServerAliveCountMax=4" \
    --filter="protect /wp-content/***" \
    --filter="protect /wp-admin/***" \
    --filter="protect /wp-includes/***" \
    --filter="protect /wp-*.php" \
    --filter="protect /.htaccess" \
    --exclude="/index.php" \
    --exclude="/default.php" \
    --exclude="/license.txt" \
    --exclude="/.htaccess" \
    --exclude="/wp-api-proxy.php" \
    --exclude="/wp-admin/***" \
    --exclude="/wp-includes/***" \
    --exclude="/wp-content/***" \
    --exclude="/wp-*.php" \
    --exclude="/xmlrpc.php" \
    --exclude="/prices.php" \
    --filter="protect _next/static/chunks/***" \
    --filter="protect _next/static/css/***" \
    "$SCRIPT_DIR/out/" \
    "$SSH_HOST:$REMOTE_PATH" \
    >> "$LOG" 2>&1; then
    RSYNC_OK=1
    break
  fi
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] rsync attempt $i failed, retrying..." >> "$LOG"
  sleep 10
done
if [ "$RSYNC_OK" -ne 1 ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ABORT: rsync failed after 3 attempts" >> "$LOG"
  exit 1
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deploy complete." >> "$LOG"

# Self-heal WP core AFTER deploy too — catches damage from a mid-rsync
# connection drop instead of waiting up to the next scheduled run.
ssh -i "$SSH_KEY" -p "$SSH_PORT" -o StrictHostKeyChecking=no -o ConnectTimeout=15 -o ServerAliveInterval=15 -o ServerAliveCountMax=4 "$SSH_HOST" \
  "/home/u505433088/wp-core-heal.sh" >> "$LOG" 2>&1 || true
