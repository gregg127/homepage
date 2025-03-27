#!/bin/bash

# Define variables
BUILD_DIR="public"  # Default Gatsby build output directory
SERVER_USER="daddy"
SERVER_HOST="themachine"
SERVER_PATH="/var/www/html"

# Clean
echo "Building Gatsby application..."
npm run clean || { echo "Gatsby clean failed!"; exit 1; }

# Run the Gatsby build process
echo "Building Gatsby application..."
npm run build || { echo "Gatsby build failed!"; exit 1; }

echo "Build successful! Copying files to the server..."

# Securely copy the build output to the server
scp -r "$BUILD_DIR"/* "$SERVER_USER@$SERVER_HOST:$SERVER_PATH" || { echo "Failed to copy files to server"; exit 1; }

echo "Deployment successful!"