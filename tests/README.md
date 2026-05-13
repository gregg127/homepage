# Build-output tests

Integration tests that validate the artifacts under `public/` after `gatsby build`. Uses Node's built-in test runner (`node --test`) — no Jest/Vitest.

## Run

```sh
npm test  # runs `gatsby build` then the tests
```

## Suites

| File                      | What it checks                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `robots-txt.test.js`      | `public/robots.txt` exists, has `User-agent: *`, `Allow: /`, references the sitemap                                             |
| `sitemap.test.js`         | `sitemap-index.xml` and `sitemap-0.xml` are well-formed and contain all 4 pages, exclude `/404`                                 |
| `pages.test.js`           | Each built HTML page has the correct `<title>`, a non-empty `<meta name="description">`, and `lang="en"`                        |
| `html-validity.test.js`   | DOM-level checks via cheerio: heading hierarchy, every `<img>` has alt, internal links resolve, no localhost in production HTML |
| `asset-integrity.test.js` | Every JS/CSS/img/icon path referenced in HTML resolves to a real, non-empty file in `public/`                                   |
| `manifest.test.js`        | `manifest.webmanifest` is valid JSON with required PWA fields and existing icon files                                           |
| `static-assets.test.js`   | Hardcoded list of important static assets (CV PDF, favicon, video, technology icons) exist                                      |
| `bundle.test.js`          | Build artifacts (`webpack.stats.json`, `chunk-map.json`, `page-data/`) exist; HTML pages > 1 KB; reports total bundle size      |
| `accessibility.test.js`   | Runs axe-core via jsdom against each page; one test per impact level (`moderate`/`serious`/`critical`) — any violation fails    |

## Debugging failures

- **`page X is missing` / `public/X is missing`** → `npm test` rebuilds first, so this usually means the page was removed or renamed in source
- **`broken internal links`** → a page links to a route that doesn't exist; check the `to=` / `href=` in source pages
- **`images missing alt`** → an `<img>` is missing the `alt` attribute; check `src/components/ui/Icon.jsx` and page sources
- **`missing assets`** → HTML references `/foo.png` but `public/foo.png` doesn't exist; either the file wasn't added to `static/` or a path is wrong
- **axe violations** → the failure message includes the rule id, target selector, and a help URL with the fix
- **`heading <hN> skips a level`** → e.g. a page jumps from `<h2>` straight to `<h4>`; insert the missing level or restructure
