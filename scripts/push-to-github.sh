#!/bin/bash

# Script to push changes to GitHub

# Ensure we're in the project root directory
cd "$(dirname "$0")/.."

# Check if remote exists, if not add it
if ! git remote | grep -q "origin"; then
    echo "Adding GitHub remote..."
    git remote add origin https://github.com/splinteredsunlight/TheMachine.git
fi

# Check if there are any changes to commit
if [ -z "$(git status --porcelain)" ]; then
    echo "No changes to commit."
    exit 0
fi

# Add all changes
git add .

# Commit changes with a descriptive message
git commit -m "Create TheMachine frontend with React, TypeScript, and Tailwind CSS

- Implemented responsive UI with dark/light theme support
- Created Dashboard, Tasks, Models, Agents, Workflows, and Settings pages
- Added comprehensive documentation including API docs and user guide
- Set up development environment with Vite, TypeScript, and Tailwind CSS
- Created Docker configuration for containerized deployment
- Added development scripts for starting and stopping the environment"

# Push changes to GitHub
git push origin main

echo "Changes pushed to GitHub successfully."
