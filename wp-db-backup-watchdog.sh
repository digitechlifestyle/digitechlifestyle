#!/bin/bash
# Standalone watchdog: SSHes in, runs wp-db-backup.sh, pulls the dump down to
# the Mac. Independent of deploy.sh — closes the gap when deploy.sh
# hangs/skips a run. Runs hourly via launchd.
SSH_KEY="$HOME/.ssh/digitech_deploy"
SSH_HOST="u505433088@77.37.37.226"
SSH_PORT=65002
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG="$SCRIPT_DIR/wp-db-backup-watchdog.log"
LOCAL_DB_BACKUP_DIR="$SCRIPT_DIR/../site-backups/db-backups"

{
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Run started"

  ssh -i "$SSH_KEY" -p "$SSH_PORT" -o StrictHostKeyChecking=no -o ConnectTimeout=15 "$SSH_HOST" \
    "/home/u505433088/wp-db-backup.sh" || echo "WARNING: remote backup failed"

  mkdir -p "$LOCAL_DB_BACKUP_DIR"
  LATEST_REMOTE=$(ssh -i "$SSH_KEY" -p "$SSH_PORT" -o StrictHostKeyChecking=no -o ConnectTimeout=15 "$SSH_HOST" \
    "ls -t /home/u505433088/db-backups/db-*.sql.gz 2>/dev/null | head -1")
  if [ -n "$LATEST_REMOTE" ]; then
    scp -i "$SSH_KEY" -P "$SSH_PORT" -o StrictHostKeyChecking=no -o ConnectTimeout=15 \
      "$SSH_HOST:$LATEST_REMOTE" "$LOCAL_DB_BACKUP_DIR/" || echo "WARNING: local pull failed"
    ls -t "$LOCAL_DB_BACKUP_DIR"/db-*.sql.gz 2>/dev/null | tail -n +61 | xargs -r rm --
  else
    echo "WARNING: no remote backup file found to pull"
  fi

  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Run done"
} >> "$LOG" 2>&1
