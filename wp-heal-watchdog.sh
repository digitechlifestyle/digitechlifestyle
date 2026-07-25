#!/bin/bash
# Standalone watchdog: SSHes in and runs wp-core-heal.sh, independent of deploy.sh.
# Runs every 15 min via launchd — closes the gap when deploy.sh hangs/skips a run.
SSH_KEY="$HOME/.ssh/digitech_deploy"
SSH_HOST="u505433088@77.37.37.226"
SSH_PORT=65002
LOG="$(cd "$(dirname "$0")" && pwd)/wp-heal-watchdog.log"

ssh -i "$SSH_KEY" -p "$SSH_PORT" -o StrictHostKeyChecking=no -o ConnectTimeout=15 "$SSH_HOST" \
  "bash /home/u505433088/wp-core-heal.sh" >> "$LOG" 2>&1
