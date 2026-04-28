#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/me"
PM2_NAME="me-pkn"
HEALTH_URL="https://me.pkn.io.vn/"
REF="${1:-origin/main}"

echo "[me] deploy start $(date '+%Y-%m-%d %H:%M:%S') ref=${REF}"
cd "$APP_DIR"

git fetch origin main --tags --prune
git reset --hard "$REF"

STAMP_FILE="node_modules/.x106_install_stamp"
STAMP_VALUE="$( { sha256sum package.json; [ -f package-lock.json ] && sha256sum package-lock.json; } | sha256sum | awk '{print $1}')"
if [ ! -d node_modules ] || [ ! -f "$STAMP_FILE" ] || [ "$(cat "$STAMP_FILE" 2>/dev/null)" != "$STAMP_VALUE" ]; then
  echo "[me] installing dependencies..."
  if [ -f package-lock.json ]; then npm ci; else npm install; fi
  mkdir -p node_modules
  echo "$STAMP_VALUE" > "$STAMP_FILE"
fi

rm -rf .next
npm run build
pm2 restart "$PM2_NAME"
sleep 2
pm2 describe "$PM2_NAME" | grep -q "status.*online"

HTML="$(mktemp)"
curl -fsSL "$HEALTH_URL" -o "$HTML"
if LC_ALL=C grep -Eq 'â˜|âˆ|ðŸ|CÃ|Pháº|Ká»|NguyÃ|Ä.|Náº|Viá»|å…ƒ' "$HTML"; then
  echo "[me] ERROR: mojibake marker found in HTML"
  rm -f "$HTML"
  exit 1
fi
rm -f "$HTML"

git diff --quiet
echo "[me] deploy done $(date '+%Y-%m-%d %H:%M:%S')"
