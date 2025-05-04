#!/bin/bash
VERSION=1.2
IMAGE_NAME=harbor.golebiowski.dev/services/homepage

log() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - $1"
}

log "Cleaning up..."
npm run clean

log "Updating version in package.json..."
sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json

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
git add kustomization/deployment.yaml
git commit -m "Release version $VERSION"
git tag v$VERSION

log "Deployment completed successfully. Now push commit and tag to the repository."