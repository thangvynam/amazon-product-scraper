#!/bin/bash

echo "Initialising pre-commit checkstyle hook for project"
set -e
cp preCommitChecks.sh ../.git/hooks/pre-commit
chmod a+x ../.git/hooks/pre-commit
set +e
echo "Pre-commit hook installed successfully"
echo "Done. Happy coding!"
