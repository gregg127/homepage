#!/usr/bin/env bash

# Get the latest version from git tags and increment minor version
CURRENT_VERSION=$(git describe --tags --abbrev=0 2>/dev/null | sed 's/v//' || echo "1.0")
MAJOR=$(echo $CURRENT_VERSION | cut -d. -f1)
MINOR=$(echo $CURRENT_VERSION | cut -d. -f2)
NEW_MINOR=$((MINOR + 1))
VERSION="$MAJOR.$NEW_MINOR"

REGISTRY_HOST=harbor.golebiowski.dev
IMAGE_NAME=harbor.golebiowski.dev/services/homepage

log() {
    echo "$(date +"%Y-%m-%d %H:%M:%S") - $1"
}

log_error() {
    echo -e "\033[31m$(date +"%Y-%m-%d %H:%M:%S") - Error: $1\033[0m" >&2
}

# Detect OS and set appropriate platforms
if [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORMS="linux/amd64,linux/arm64"
    log "Detected macOS - building for multiple platforms: $PLATFORMS"
else
    PLATFORMS="linux/amd64"
    log "Detected Linux - building for single platform: $PLATFORMS"
fi

if ! docker info > /dev/null 2>&1; then
    log_error "Error: Docker daemon is not running"
    exit 1
fi

log "Cleaning up..."
npm run clean

log "Updating version in package.json..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json
else
    sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json
fi

log "Installing for production..."
npm install --production

log "Building site..."
npm run build

log "Building Docker image with version $VERSION..."
if ! docker build --platform "$PLATFORMS" --build-arg VERSION="$VERSION" --tag "$IMAGE_NAME:$VERSION" -f Dockerfile .; then
    log_error "Application Docker build failed"
    exit 1
fi

log "Pushing Docker image to remote registry..."

log "Checking connectivity to registry host: $REGISTRY_HOST"
if ping -c 1 -W 5 "$REGISTRY_HOST" > /dev/null 2>&1; then
    log "Pushing application image..."
    if docker push "$IMAGE_NAME:$VERSION" --platform linux/amd64; then
        log "Application Docker image pushed successfully"
    else
        log_error "Failed to push application Docker image to registry"
        exit 1
    fi
else
    log_error "Cannot reach registry host $REGISTRY_HOST."
    exit 1
fi

log "Updating version in kustomization..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s|$IMAGE_NAME:.*|$IMAGE_NAME:$VERSION|" kustomization/deployment.yaml
else
    sed -i "s|$IMAGE_NAME:.*|$IMAGE_NAME:$VERSION|" kustomization/deployment.yaml
fi

log "Commiting version to the repostiory..."
git add deploy.sh
git add package.json
git add package-lock.json
git add kustomization/deployment.yaml
git commit -m "Release version $VERSION"
git tag v$VERSION

log "Deployment completed successfully. Now push commit and tag to the repository."
