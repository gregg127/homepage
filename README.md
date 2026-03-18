# Homepage

This repository contains the source code for my homepage built with Gatsby.

## Development

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
npm run container
```

## Deployment

### Steps to Deploy

1. **Run Deployment**: Execute the following command:
   ```sh
   npm run deploy
   ```
   This will:
   - Automatically increment the minor version based on the latest git tag.
   - Update the version in `package.json`.
   - Build a Docker image.
   - Push the Docker image to a private registry.
   - Update the version in the kustomization directory.
   - Create a commit and tag with the new release.
2. Push commit and tag. This will cause deployment to [the cluster](https://github.com/gregg127/anton).

