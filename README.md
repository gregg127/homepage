# Homepage

This repository contains the source code for my homepage built with Gatsby.


## Development

### Run the Application
To start the local development server:
```sh
npm run develop
```

### Run in Container
To run the application in a Docker container:
```sh
npm run container
```

### Run Documentation
To serve the documentation locally:
```sh
npm run docs
```

### Run Lighthouse Tests
To execute Lighthouse tests:
```sh
npm run audit
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