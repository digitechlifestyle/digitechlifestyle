#!/bin/bash
# DigiTech Lifestyle — WordPress database backup.
# Lives on the Hostinger server at /home/u505433088/wp-db-backup.sh, run by
# deploy.sh on every deploy cycle via SSH. This local copy is the source of
# truth / disaster-recovery copy — redeploy with:
#   scp -i ~/.ssh/digitech_deploy -P 65002 wp-db-backup.sh u505433088@77.37.37.226:/home/u505433088/wp-db-backup.sh
#   ssh -i ~/.ssh/digitech_deploy -p 65002 u505433088@77.37.37.226 chmod +x /home/u505433088/wp-db-backup.sh
#
# wp-cli's own "wp db export" fails silently on this host (proc_open
# restricted), so this shells out to mysqldump directly instead.
set -e

SITE_DIR="/home/u505433088/domains/digitechlifestyle.com/public_html"
BACKUP_DIR="/home/u505433088/db-backups"
mkdir -p "$BACKUP_DIR"

cd "$SITE_DIR"
DBUSER=$(wp config get DB_USER --allow-root)
DBPASS=$(wp config get DB_PASSWORD --allow-root)
DBNAME=$(wp config get DB_NAME --allow-root)
DBHOST=$(wp config get DB_HOST --allow-root)

TS=$(date +%Y-%m-%d-%H%M%S)
OUT="$BACKUP_DIR/db-$TS.sql"

mysqldump -h "$DBHOST" -u "$DBUSER" -p"$DBPASS" "$DBNAME" > "$OUT"
gzip "$OUT"

# Keep the last 60 backups (~ a couple months at multiple-per-day cadence).
ls -t "$BACKUP_DIR"/db-*.sql.gz 2>/dev/null | tail -n +61 | xargs -r rm --

echo "[$(date '+%Y-%m-%d %H:%M:%S')] DB backup written: $OUT.gz"
