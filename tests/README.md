# Tests

Integration tests that validate the artifacts under `public/` after `gatsby build`:

- **build-output suites** (`suites/`) — `node --test` checks on the generated HTML, CSS and static files
- **screenshot tests** (`playwright/`) — Playwright renders each page in Chromium, inside Docker, and compares it with a committed reference

## Run

None of the test scripts build — they test whatever is currently in `public/`. Always build first:

```sh
npm run clean && npm run build && npm run test
```

| Script                      | Runs                                                       |
| --------------------------- | ---------------------------------------------------------- |
| `npm run test`              | both of the below                                          |
| `npm run testOutput`        | build-output suites                                        |
| `npm run testPlaywright`    | screenshot tests, in Docker                                |
| `npm run updateScreenshots` | builds, then overwrites every reference screenshot — never fails on a diff |

The screenshot scripts need Docker; the first run pulls the Playwright image (~2 GB). To pass extra Playwright arguments, use `npm run playwright -- <args>`, e.g. `npm run playwright -- test -g about`.

## Suites

All in `suites/`.

| File                      | What it checks                                                                                                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accessibility.test.js`   | Runs axe-core via jsdom against each page; one test per impact level (`moderate`/`serious`/`critical`) — any violation fails                                                                          |
| `asset-integrity.test.js` | Every JS/CSS/img/icon path referenced in HTML resolves to a real, non-empty file in `public/`                                                                                                                      |
| `bundle.test.js`          | Build artifacts (`webpack.stats.json`, `chunk-map.json`, `page-data/`) exist; every page has `page-data.json`; HTML pages > 1 KB; `index.html` < 80 KB; each page inlines only the used font faces, each with a `latin-ext` subset; built CSS uses `font-display: block`; reports total bundle size                 |
| `html-validity.test.js`   | Via cheerio: exactly one `<h1>` and it comes first, no heading skips a level, `<img>` alt (empty only for labelled icons), no duplicate ids, internal links and `#anchors` resolve, `target="_blank"` has `rel="noopener noreferrer"`, no dev hostnames |
| `manifest.test.js`        | `manifest.webmanifest` is valid JSON with required PWA fields, a valid `display`, root-relative `start_url`, and existing icon files                                                                               |
| `navigation.test.js`      | Header menu and footer links/copyright on every page (labels, hrefs, `target`/`rel`); contact page links to email, GitHub and LinkedIn                                                                             |
| `pages.test.js`           | Each page has correct `<title>`, meta description, `lang="en"`, canonical URL (none on 404), OG/Twitter tags; `og:image` exists with matching PNG dimensions and alt; titles and descriptions are unique across pages; homepage `profile:*` tags; only 404 is `noindex` |
| `privacy.test.js`         | `/privacy` renders both language versions with a working `#polityka-prywatności` anchor; raw markdown is not published                                                                                             |
| `robots-txt.test.js`      | `public/robots.txt` has `User-agent: *` + `Allow: /`, references the sitemap, and disallows AI training crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended, …)                                                     |
| `sitemap.test.js`         | `sitemap-index.xml` points only at `sitemap-0.xml`; `sitemap-0.xml` lists exactly the indexable pages from `site.js` — no more, no fewer                                                                           |
| `static-assets.test.js`   | Hardcoded list of important static assets (CV PDF, favicon, social preview image, video, icons) exist                                                                                                              |
| `structured-data.test.js` | Homepage has one JSON-LD block, valid JSON with `<` escaped, describing a schema.org `Person` with alma mater and `sameAs` social links                                                                             |
| `theme.test.js`           | Built CSS defines every `--light-color-*` and `--dark-color-*` token, so neither theme is missing a colour                                                                                                          |

## Screenshot tests

`playwright/screenshots.spec.js` serves `public/` with `playwright/server.js` (port 9000) and takes a full-page screenshot of every page in `PAGES`, in the light and dark theme, in two projects: `desktop` (Desktop Chrome, 1280×720) and `mobile` (Pixel 7). References live in `playwright/screenshots/<project>/<page>-<theme>.png`.

To make the same pixels on every machine:

- `npm run playwright` runs Playwright in the `playwright` service of `../docker-compose.yml`: the official `mcr.microsoft.com/playwright` image, forced to `linux/amd64`, with the repo mounted and run as your user so written files aren't owned by root. CI runs the exact same command. Running `npx playwright test` on the host works, but text renders slightly differently and the comparison fails
- the image tag and `@playwright/test` (pinned exactly in `package.json`) must be the same version — `../playwright.config.js` throws if they differ, so bump both together and regenerate the references
- `server.js` uses only Node built-ins, so it doesn't load the host's Gatsby native modules, which may be built for another OS or CPU
- `../playwright.config.js` fixes the locale, time zone, colour scheme and reduced motion, and passes Chromium flags that force the sRGB colour profile and grayscale, unhinted text

Each test also:

- sets the theme through `localStorage` before load and waits for `ThemeButton`, which only renders after hydration
- waits for `document.fonts.ready`
- pins the clock, because the footer renders the current year
- masks the homepage `<video>` (magenta box in the references)

Comparison uses Playwright's defaults — even a changed digit fails it. After a deliberate visual change, run `npm run updateScreenshots` and review the changed PNGs in the diff before committing them.

## Layout

```
tests/
├── site.js         shared config
├── suites/         one *.test.js per concern
└── playwright/
    ├── screenshots.spec.js
    ├── server.js       static server for public/
    └── screenshots/    reference PNGs, per project
```

## Adding a page

1. Add an entry to `PAGES` in `site.js` — every suite picks it up. Indexable pages need a `pathname`; `site.js` throws on load without one.
2. If it's indexable, add its URL to `../lighthouserc.yml`.
3. Run `npm run updateScreenshots` to create its reference screenshots.

## Debugging failures

- **`toHaveScreenshot` failed** → Playwright writes the expected, actual and diff images to `../test-results/`; in CI the job log shows only how many pixels differ, so reproduce locally with `npm run testPlaywright` to see them. If the change was intended, run `npm run updateScreenshots`; if not, fix the regression
- **`A snapshot doesn't exist`** → a new page or project has no reference yet; run `npm run updateScreenshots`

- **`page X is missing` / `public/X is missing`** → either the build is stale (re-run `npm run build`) or the page was removed or renamed in source
- **a file that `should not exist` is in `public/`** → `gatsby build` never deletes old output; run `npm run clean` first
- **`broken internal links`** → a page links to a route that doesn't exist; check the `to=` / `href=` in source pages
- **`images missing alt`** → an `<img>` is missing the `alt` attribute; check page sources
- **`decorative images without a label`** → an `<img alt="">` has no visible text beside it, so it conveys nothing to screen readers; give it a real `alt`
- **`icons with redundant alt text`** → `Icon.jsx` must keep `alt=""` because its visible label already names the icon
- **`missing assets`** → HTML references `/foo.png` but `public/foo.png` doesn't exist; either the file wasn't added to `static/` or a path is wrong
- **axe violations** → the failure message includes the rule id, target selector, and a help URL with the fix
- **`heading <hN> skips a level`** → e.g. a page jumps from `<h2>` straight to `<h4>`; insert the missing level or restructure
- **`font budget` / `inlines only the font faces in use`** → `gatsby-browser.js` imports a font weight or style the site doesn't use (small files are inlined as base64 into every page); if a new weight is genuinely needed, add it to `EXPECTED_FONT_FACES` in `bundle.test.js`
- **`font-display`** → `gatsby-node.js` rewrites `@fontsource` `swap` to `block`; if this fails, that webpack rule stopped matching
- **`og:image` dimensions** → `og:image:width`/`height` in `Seo` no longer match the actual PNG; update one or the other
