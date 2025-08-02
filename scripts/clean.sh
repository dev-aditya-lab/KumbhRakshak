#!/bin/bash
# Clean script for KumbhRakshak project

echo "🧹 Cleaning auto-generated files..."

# Remove node modules
if [ -d "node_modules" ]; then
    echo "Removing node_modules..."
    rm -rf node_modules/
fi

# Remove Expo cache
if [ -d ".expo" ]; then
    echo "Removing .expo cache..."
    rm -rf .expo/
fi

# Remove build directories
rm -rf dist/
rm -rf web-build/
rm -rf build/
rm -rf .cache/
rm -rf .tmp/
rm -rf .temp/
rm -rf .metro-cache/

# Remove lock files (optional)
rm -f package-lock.json
rm -f yarn.lock

echo "✅ Project cleaned! Run 'npm install' to reinstall dependencies."
