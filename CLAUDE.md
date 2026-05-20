# CLAUDE.md — Homepage Codebase Guide

## Project Overview

Personal portfolio/resume website built with **Gatsby 5** and **React 19**, styled with **styled-components**, and deployed to Kubernetes via Docker. CI/CD runs on GitHub Actions.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Gatsby 5.16 (static site generator) |
| UI | React 19, styled-components 6 |
| Fonts | @fontsource/lato, @fontsource/courier-prime (self-hosted) |
| Testing | Node.js built-in test runner (`node --test`) |
| CI/CD | GitHub Actions → Docker → Harbor registry → Kubernetes (Flux CD) |
| Web server | nginx with Brotli compression |

## Repository Structure

```
src/
  components/
    common/     # Page-level wrappers: Header, Footer, Page
    layout/     # Content containers: Panel, SectionedList
    ui/         # Reusable atoms: Link, Icon, ThemeButton
  pages/        # Gatsby file-based routing (index, about, resume, contact, privacy, 404)
tests/          # Integration test suites (run against built output in public/)
static/         # Static assets: icons (SVG), CV PDF, favicon, video
cv/             # LaTeX source for CV (only .tex/.md tracked in git)
kustomization/  # Kubernetes manifests
nginx/          # nginx config for production
.github/
  workflows/
    pr.yml      # Runs build + tests on every PR to main
    deploy.yml  # Runs build + tests + deployment on merge to main
    lhci.yml    # Manual Lighthouse CI performance testing
```

## Development Commands

```bash
npm run dev          # Start Gatsby dev server at localhost:8000
npm run build        # Build CV PDF (if latexmk available) + Gatsby site → public/
npm run build:cv     # Build CV PDF from LaTeX only
npm run clean        # Clear Gatsby cache (.cache/ and public/)
npm run test         # Run all integration tests (requires a prior build)
npm run containerUp  # Build + run Docker container locally (port 8000)
npm run containerDown # Stop Docker container
npm run docs         # Serve docsify documentation at localhost:3000
npm run deploy       # Full deployment: version bump, Docker build/push, K8s update
```

## Branch and PR Workflow

**All changes must be made on a branch and merged via a pull request. Never commit directly to `main`.**

### Naming conventions

Use these prefixes based on the type of change:

| Type | Branch prefix | Example |
|------|--------------|---------|
| New feature | `feature/` | `feature/add-blog-page` |
| Bug fix | `fix/` | `fix/docker-fonts` |
| Tooling / CI | `feature/` or `fix/` | `feature/ci-pr-tests` |
| Claude-initiated | `claude/` | `claude/create-claude-guide` |

### Workflow

1. Create a branch from `main`:
   ```bash
   git checkout main && git pull origin main
   git checkout -b feature/your-feature-name
   ```
2. Make changes, commit with a clear message (see commit style below).
3. Push and open a PR targeting `main`.
4. The `pr.yml` CI workflow runs automatically: build + test must pass.
5. Merge into `main` triggers `deploy.yml`: build + test + deployment.

## Commit Message Style

Write concise, imperative-mood subject lines. No trailing period.

```
Add Footer component with sticky bottom layout
Fix fonts not loading in Docker: copy gatsby-browser.js in build stage
Reduce bullet list left padding on mobile
Gate deployment on passing tests in CI
```

- **Add** for new things, **Fix** for bug fixes, **Update** for changes to existing things, **Remove** for deletions.
- Keep the subject under 72 characters.
- No need for a body unless the why is non-obvious.

## Writing Components

### File conventions

- Pages: `.js` extension, in `src/pages/`
- Components: `.jsx` extension, in `src/components/<category>/`
- Use `export default` for components; named export for Gatsby's `Head` function.

### Component pattern

```jsx
import React from "react";
import styled from "styled-components";

const StyledFoo = styled.div`
  /* use CSS custom properties for theme colours */
  color: var(--color-text);
  background: var(--color-background);

  @media only screen and (max-width: 576px) {
    /* mobile overrides */
  }
`;

const Foo = ({ title, children }) => {
  return (
    <StyledFoo>
      {children}
    </StyledFoo>
  );
};

export default Foo;
```

### CSS custom properties (theme colours)

Defined in `src/components/common/Page.jsx` via `createGlobalStyle`. Always use these variables — never hardcode colours.

| Variable | Purpose |
|----------|---------|
| `--color-text` | Primary text |
| `--color-text-muted` | Secondary / muted text |
| `--color-text-link-hover` | Link hover colour |
| `--color-background` | Page background |
| `--color-secondary` | Borders, dividers |

Light/dark variants are prefixed `--light-` and `--dark-`. The `ThemeButton` component toggles a class on `<body>` and switches the active set.

### Responsive breakpoint

The single breakpoint is **576px**. All `@media` queries use:

```css
@media only screen and (max-width: 576px) { … }
```

### Typography

- Body: `"Lato"`, `sans-serif`, weight 300
- Headings (`h1`–`h6`): `"Courier Prime"`, `monospace`, weight 400
- Both fonts are self-hosted via `@fontsource` and imported in `gatsby-browser.js`.

## Writing Pages

Every page must:

1. Wrap content in `<Page>` (provides `<Header>`, `<Footer>`, global styles).
2. Export a `Head()` function with `<html lang="en" />`, `<title>`, and a `<meta name="description">`.

```jsx
import React from "react";
import Page from "../components/common/Page";
import Panel from "../components/layout/Panel";

const MyPage = () => (
  <Page>
    <Panel title="section title">
      {/* content */}
    </Panel>
  </Page>
);

export default MyPage;

export function Head() {
  return (
    <>
      <html lang="en" />
      <title>My Page</title>
      <meta name="description" content="Brief description for SEO." />
    </>
  );
}
```

## Available Components

### `<Page>` — `src/components/common/Page.jsx`
Root wrapper. Provides global styles, `<Header>`, and `<Footer>`. Always the outermost element on a page.

### `<Panel title="...">` — `src/components/layout/Panel.jsx`
Bordered content section with a heading. Pass `title` as a lowercase string.

### `<SectionedList header date list>` — `src/components/layout/SectionedList.jsx`
Renders a labelled section with a date and a bullet list. Used for experience/education entries.

```jsx
<SectionedList
  header="Job Title"
  date="Jan 2023 – Present"
  list={["Bullet one", "Bullet two"]}
/>
```

### `<Link href="...">` — `src/components/ui/Link.jsx`
Styled anchor with animated underline on hover. Use instead of bare `<a>`.

### `<Icon iconName="..." label="...">` — `src/components/ui/Icon.jsx`
Displays an SVG icon from `static/icons/` with a text label. `iconName` must match an existing SVG filename (without `.svg`).

### `<ThemeButton>` — `src/components/ui/ThemeButton.jsx`
Light/dark toggle. Already included in `<Header>`; do not add it elsewhere.

## Adding a New Page

1. Create `src/pages/my-page.js` following the page template above.
2. Add the route to the nav links in `src/components/common/Header.jsx` if it should appear in the menu.
3. Add the page path to `PAGES` in each relevant test file under `tests/` (especially `pages.test.js`, `html-validity.test.js`, `accessibility.test.js`, `asset-integrity.test.js`).
4. Add the URL to `lighthouserc.yml` if Lighthouse CI should test it.

## Adding a New Technology Icon

1. Place the SVG in `static/icons/<name>.svg`.
2. Reference it with `<Icon iconName="<name>" label="Label" />`.

## Testing

Tests run against the **built output** in `public/`, not source files. Always build before testing.

```bash
npm run build   # build first
npm run test    # then test
```

### Test suites

| File | What it checks |
|------|---------------|
| `pages.test.js` | Page titles, meta descriptions, `lang="en"` |
| `robots-txt.test.js` | `public/robots.txt` content |
| `sitemap.test.js` | XML sitemap contains all page URLs |
| `html-validity.test.js` | Heading hierarchy, image alt text, internal links |
| `asset-integrity.test.js` | All JS/CSS/img paths resolve to real files |
| `manifest.test.js` | PWA `manifest.webmanifest` validity |
| `static-assets.test.js` | Critical static files exist (CV PDF, favicon, video, icons) |
| `bundle.test.js` | Build artifacts exist; reports bundle sizes |
| `accessibility.test.js` | axe-core: no moderate/serious/critical violations |

When adding a page, update `PAGES` arrays in the test files. When adding a static asset, add an assertion to `static-assets.test.js`.

## CI/CD Pipeline

```
PR opened → pr.yml → build + npm test (must pass to merge)
     ↓
Merge to main → deploy.yml → build + npm test → deploy.sh
     ↓
deploy.sh: bump version, build multi-platform Docker image,
           push to Harbor registry, update kustomization/deployment.yaml
     ↓
Flux CD detects new image tag → deploys to Kubernetes cluster
```

**Deployment is fully automated on merge to `main`.** Never run `npm run deploy` manually unless you are doing a local release outside of CI.

## Gatsby Configuration

| File | Purpose |
|------|---------|
| `gatsby-config.js` | Plugins (manifest, robots.txt, sitemap, remark, file system), site metadata |
| `gatsby-browser.js` | Imports all @fontsource font variants |
| `gatsby-node.js` | Custom webpack rule: replaces `font-display: swap` → `font-display: block` |

## What Not To Do

- Do not commit directly to `main`. Always use a branch and PR.
- Do not hardcode colours — use CSS custom properties.
- Do not add TypeScript, ESLint, or Prettier config (project is intentionally plain JS).
- Do not skip tests in CI (`--no-verify`, commenting out assertions, etc.).
- Do not push the `public/` or `.cache/` directories — they are git-ignored build artefacts.
- Do not add unnecessary comments to code. Names should be self-explanatory.
