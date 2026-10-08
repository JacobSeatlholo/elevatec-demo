#!/bin/bash
# Push the Elevate demo to GitHub via the sandbox SSH transport.
# Prerequisite: the sandbox public key must be added to GitHub:
#   repo → Settings → Deploy keys (read/write)  OR  account → Settings → SSH keys
#   https://github.com/settings/ssh/new
set -e
cd "$(dirname "$0")/.."

export GIT_SSH_COMMAND="node /home/z/my-project/scripts/git-ssh-wrapper.cjs -i $HOME/.ssh/id_ed25519 -o StrictHostKeyChecking=no"

echo "Testing SSH auth against GitHub..."
if git ls-remote origin HEAD > /dev/null 2>&1; then
  echo "✓ SSH auth OK — pushing main..."
  git push -u origin main
  echo "✓ Pushed to git@github.com:JacobSeatlholo/elevatec-demo.git"
else
  echo "✗ SSH auth failed — add this public key at https://github.com/settings/ssh/new first:"
  echo
  cat ~/.ssh/id_ed25519.pub
  echo
  exit 1
fi
