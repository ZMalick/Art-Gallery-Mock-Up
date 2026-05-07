#!/usr/bin/env bash
# sync-to-final.sh
# Copies approved website files from the main project to Kay's Originals Website - Final
# and pushes the changes to GitHub.

set -e

SRC="$(cd "$(dirname "$0")" && pwd)"
DEST="$(cd "$SRC/../Kay's Originals Website - Final" && pwd)"

echo "Syncing from: $SRC"
echo "Syncing to:   $DEST"

# Copy website files
cp "$SRC/index.html"              "$DEST/index.html"
cp "$SRC/pages/"*.html            "$DEST/pages/"
cp "$SRC/css/styles.css"          "$DEST/css/styles.css"
cp "$SRC/js/data.js"              "$DEST/js/data.js"
cp "$SRC/js/main.js"              "$DEST/js/main.js"
cp -r "$SRC/images/." "$DEST/images/"
cp "$SRC/Open Website.bat"          "$DEST/Open Website.bat"

# Commit and push if there are changes
cd "$DEST"

if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "No changes to sync — Final repo is already up to date."
  exit 0
fi

# Use the latest commit message from the main repo as context
MAIN_MSG=$(cd "$SRC" && git log -1 --pretty=format:"%s")

git add -A
git commit -m "Sync from main: $MAIN_MSG"
git push origin master

echo "Done — Final repo updated and pushed."
