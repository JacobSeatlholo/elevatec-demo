#!/usr/bin/env bash
# ---------------------------------------------------------------
# Elevate Commercial Construction — GitHub push helper
# 1. Verifies the sandbox-generated SSH key exists
# 2. Verifies GitHub recognises the key for your account
# 3. Pushes main to git@github.com:JacobSeatlholo/elevatec-demo.git
# ---------------------------------------------------------------
set -euo pipefail

REMOTE="git@github.com:JacobSeatlholo/elevatec-demo.git"

if [ ! -f "$HOME/.ssh/id_ed25519" ]; then
  echo "❌ No SSH key found at ~/.ssh/id_ed25519"
  echo "   Generate one with:  ssh-keygen -t ed25519 -C 'elevatec-demo'"
  exit 1
fi

echo "🔑 Public key (add this to GitHub → Settings → SSH and GPG keys → New SSH key):"
echo ""
cat "$HOME/.ssh/id_ed25519.pub"
echo ""

echo "🧪 Testing GitHub SSH authentication..."
if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
  echo "✅ Authentication confirmed."
else
  echo "⚠️  GitHub has not seen this key yet. Add the public key above first:"
  echo "   https://github.com/settings/ssh/new"
  exit 1
fi

git remote set-url origin "$REMOTE" 2>/dev/null || git remote add origin "$REMOTE"
echo "🚀 Pushing main → $REMOTE"
git push -u origin main
echo "✅ Done — repository live at https://github.com/JacobSeatlholo/elevatec-demo"
