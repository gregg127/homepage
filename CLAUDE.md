# CLAUDE.md — Homepage Codebase Guide

Personal portfolio/resume website built with Gatsby 5 + React 19 + styled-components, deployed to Kubernetes via Docker and GitHub Actions.

## Commands

```bash
npm run dev          # Gatsby dev server → localhost:8000
npm run build        # Build CV PDF (if latexmk available) + Gatsby site → public/
npm run clean        # Clear .cache/ and public/
npm run test         # Run integration tests (requires a prior build)
npm run containerUp  # Build + run Docker locally (port 8000)
npm run containerDown  # Stop Docker container
```

**Node.js 22 required** (matches CI — see `.github/workflows/pr.yml`).

## Branch and PR Workflow

**Never commit directly to `main`. All changes go through a branch and PR.**

Branch naming:

| Type | Prefix | Example |
|------|--------|---------|
| Feature | `feature/` | `feature/add-blog-page` |
| Bug fix | `fix/` | `fix/docker-fonts` |
| Claude-initiated | `claude/` | `claude/some-task` |

PR to `main` triggers `pr.yml` (build + test). Merge triggers `deploy.yml` (build + test + deploy). Both must be green before merging.

## Commit Style

Imperative mood, no trailing period, under 72 characters.

```
Add Footer component with sticky bottom layout
Fix fonts not loading in Docker: copy gatsby-browser.js in build stage
Reduce bullet list left padding on mobile
```

Use: **Add** / **Fix** / **Update** / **Remove**.

## Code Conventions

- Pages: `.js` in `src/pages/`. Components: `.jsx` in `src/components/<category>/`.
- `export default` for components; named `export function Head()` for Gatsby's head API.
- Never hardcode colours — always use CSS custom properties (defined in `src/components/common/Page.jsx`):
  `--color-text`, `--color-text-muted`, `--color-text-link-hover`, `--color-background`, `--color-secondary`
- Single responsive breakpoint: `@media only screen and (max-width: 576px)`
- No TypeScript, no ESLint, no Prettier — project is intentionally plain JS. Don't add config files for these.
- No comments unless the why is genuinely non-obvious.

Every page must: wrap content in `<Page>`, export `Head()` with `<html lang="en" />`, `<title>`, and `<meta name="description">`.

## Quality Gates

Every change must pass both gates before it can ship:

- **axe-core**: no moderate, serious, or critical accessibility violations on any page.
- **Lighthouse CI**: performance ≥80%, accessibility ≥90%, best-practices ≥90%, SEO ≥90%. Thresholds are in `lighthouserc.yml`.

When adding a page, add it to the `PAGES` arrays in `tests/pages.test.js`, `tests/html-validity.test.js`, `tests/accessibility.test.js`, `tests/asset-integrity.test.js`, and add its URL to `lighthouserc.yml`.

## Testing

Tests run against **built output in `public/`**, not source files. Always build before testing:

```bash
npm run build && npm run test
```

Test files in `tests/` cover: page metadata, robots.txt, sitemap, HTML validity, asset integrity, PWA manifest, static assets, bundle sizes, and axe-core accessibility. Each file name is self-explanatory.

## Gotchas

- **`deploy.sh` pushes to the production Docker registry.** Running it locally (via `npm run deploy`) will build and push a Docker image to Harbor and commit locally — but won't push to git (that part is done by CI). Don't run it outside CI unless you intend a manual release.
- **Tests operate on `public/`, not `src/`.** A passing build that doesn't re-run `gatsby build` will test stale output. When in doubt: `npm run clean && npm run build && npm run test`.
- **`font-display: block` is injected by webpack**, not set in source CSS. `gatsby-node.js` rewrites every `font-display: swap` in `@fontsource` stylesheets at build time. Editing the @fontsource files directly has no effect.
- **CV PDF must exist before `gatsby build`.** CI creates a placeholder with `touch`. Locally, if `latexmk` is not installed and `static/Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf` is absent, the build will fail.
- **`public/` and `.cache/` are not tracked by git.** Don't try to commit or diff them.

## CI/CD Pipeline

```
PR opened → pr.yml → build + test (must pass to merge)
Merge to main → deploy.yml → build + test → deploy.sh
  deploy.sh: bump version in package.json + kustomization/deployment.yaml,
             build Docker image, push to Harbor registry, git commit + tag locally
  deploy.yml: git push commit + tags
Flux CD detects new image tag → pulls and deploys to Kubernetes cluster
```
