#!/bin/zsh

# This script is run before every commit. It checks for the following:
# - If the commit message is empty

if ! npm run lint ; then
  echo "Linting failed. Please fix the errors and try again."
  exit 1
fi
