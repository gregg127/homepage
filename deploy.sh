#!/bin/bash

# Get the latest version from git tags and increment minor version
CURRENT_VERSION=$(git describe --tags --abbrev=0 2>/dev/null | sed 's/v//' || echo "1.0")
MAJOR=$(echo $CURRENT_VERSION | cut -d. -f1)
MINOR=$(echo $CURRENT_VERSION | cut -d. -f2)
NEW_MINOR=$((MINOR + 1))
VERSION="$MAJOR.$NEW_MINOR"

IMAGE_NAME=harbor.golebiowski.dev/services/homepage

log() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - $1"
}

if ! docker info > /dev/null 2>&1; then
    log "Error: Docker daemon is not running"
    exit 1
fi

log "Cleaning up..."
npm run clean

log "Updating version in package.json..."
sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json
npm install

log "Building site..."
npm run build

log "Building Docker image with version $VERSION..."
docker build --platform linux/amd64,linux/arm64 --build-arg VERSION="$VERSION" -t "$IMAGE_NAME:$VERSION" -f Dockerfile .

log "Pushing Docker image to registry..."
docker push "$IMAGE_NAME:$VERSION"

log "Updating version in kustomization..."
sed -i '' "s|$IMAGE_NAME:.*|$IMAGE_NAME:$VERSION|" kustomization/deployment.yaml

log "Commiting version to the repostiory..."
git add deploy.sh
git add package.json
git add package-lock.json
git add kustomization/deployment.yaml
git commit -m "Release version $VERSION"
git tag v$VERSION

log "Deployment completed successfully. Now push commit and tag to the repository."
