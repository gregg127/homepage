# Homepage

Source code for my personal website built with Gatsby 5 + React 19 + styled-components, deployed to Kubernetes.

## Prerequisites

- **Node.js 25** — run `nvm use` in the project root (reads `.nvmrc` automatically)
- **Docker** — for container builds
- **latexmk** + full TeX Live installation — required to build the CV PDF locally (optional: skipped automatically if absent)

## Setup

```sh
npm install
```

## Development

```sh
npm run dev        # start dev server at localhost:8000
npm run build      # build CV PDF (if latexmk available) + Gatsby site → public/
npm run clean      # clear .cache/ and public/
npm run test       # run integration tests (requires a prior build)
```

Tests run against the built output in `public/`, not source files. Always build before testing:

```sh
npm run build && npm run test
```

## Run in Docker

```sh
npm run containerUp    # build image and start container at localhost:8000
npm run containerDown  # stop container
```

## Deployment

All changes go through a branch and pull request — never commit directly to `main`.

1. Open a pull request targeting `main`.
2. `pr.yml` runs automatically: build + test must pass before merging.
3. Merge into `main` triggers `deploy.yml`, which re-runs tests and then runs `deploy.sh`:
   - Increments the minor version from the latest git tag.
   - Updates `package.json`, `package-lock.json`, and the image tag in `kustomization/`.
   - Builds and pushes a Docker image to a private Harbor registry.
   - Commits the version bump and tag locally; `deploy.yml` pushes them to the repository.
4. Flux CD, running on [the cluster](https://github.com/gregg127/anton), detects the new image tag in `kustomization/` and deploys.
