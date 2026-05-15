# Homepage

This repository contains the source code for my homepage built with Gatsby.

## Development

### Prerequisites

- Node.js
- Docker
- `latexmk` with a full TeX Live installation (required to build the CV PDF locally)

### Setup

Install dependencies using npm:

```sh
npm install
```

### Run the Application

To start the local development server:

```sh
npm run dev
```

### Run in Container

To run the application in a Docker container:

```sh
npm run containerUp
```

## Deployment

1. Open a pull request with your changes.
2. Merge the pull request into `main`. This triggers a GitHub Actions workflow that runs `deploy.sh`, which:
   - Automatically increments the minor version based on the latest git tag.
   - Updates the version in `package.json` and regenerates `package-lock.json`.
   - Builds a Docker image.
   - Pushes the Docker image to a private registry.
   - Updates the image tag in the `kustomization/` directory (Kubernetes manifests).
   - Creates a commit and tag with the new release and pushes them to the repository.
   - Flux CD, running on [the cluster](https://github.com/gregg127/anton), detects the new image tag in `kustomization/` and triggers deployment.
