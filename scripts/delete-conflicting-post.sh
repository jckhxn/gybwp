#!/bin/bash

echo "🔍 Finding documents using root pathname..."

# Use Sanity CLI to delete the conflicting post
echo "🗑️  Deleting the 'New Post' document that's blocking the root path..."

# First let's check if sanity CLI is available
if ! command -v sanity &> /dev/null; then
    echo "❌ Sanity CLI not found. Installing..."
    npm install -g @sanity/cli
fi

# Delete the specific document
sanity documents delete 1aee0c1b-5217-4ee5-8f66-6e4fb36cc807

echo "✅ Root path should now be available!"
