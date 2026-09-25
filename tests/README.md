# Build-output tests

Integration tests that validate the artifacts under `public/` after `gatsby build`. Uses Node's built-in test runner (`node --test`) — no Jest/Vitest.

## Run

```sh
npm run build
npm run test
```

## Suites

| File                      | What it checks                                                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `robots-txt.test.js`      | `public/robots.txt` exists, has `User-agent: *`, `Allow: /`, references the sitemap                                                                             |
| `sitemap.test.js`         | `sitemap-index.xml` and `sitemap-0.xml` are well-formed and contain all 4 pages, exclude `/404`                                                                 |
| `pages.test.js`           | Each page has correct `<title>`, meta description, `lang="en"`, canonical URL, OG/Twitter tags and `og:image`; homepage `profile:*` tags; only 404 is `noindex` |
| `html-validity.test.js`   | Via cheerio: exactly one `<h1>`, heading hierarchy, `<img>` alt, internal links resolve, no localhost in production HTML                                        |
| `asset-integrity.test.js` | Every JS/CSS/img/icon path referenced in HTML resolves to a real, non-empty file in `public/`                                                                   |
| `manifest.test.js`        | `manifest.webmanifest` is valid JSON with required PWA fields and existing icon files                                                                           |
| `static-assets.test.js`   | Hardcoded list of important static assets (CV PDF, favicon, social preview image, video, icons) exist                                                           |
| `bundle.test.js`          | Build artifacts (`webpack.stats.json`, `chunk-map.json`, `page-data/`) exist; HTML pages > 1 KB; reports total bundle size                                      |
| `accessibility.test.js`   | Runs axe-core via jsdom against each page; one test per impact level (`moderate`/`serious`/`critical`) — any violation fails                                    |
| `navigation.test.js`      | Header menu and footer links/copyright on every page (labels, hrefs, `target`/`rel`); contact page links                                                        |
| `structured-data.test.js` | Homepage JSON-LD is valid JSON with `<` escaped, describing a schema.org `Person` with alma mater and `sameAs` social links                                     |
| `privacy.test.js`         | `/privacy` renders both language versions with a working `#polityka-prywatności` anchor; raw markdown is not published                                          |

## Debugging failures

- **`page X is missing` / `public/X is missing`** → `npm test` rebuilds first, so this usually means the page was removed or renamed in source
- **`broken internal links`** → a page links to a route that doesn't exist; check the `to=` / `href=` in source pages
- **`images missing alt`** → an `<img>` is missing the `alt` attribute; check `src/components/ui/Icon.jsx` and page sources
- **`missing assets`** → HTML references `/foo.png` but `public/foo.png` doesn't exist; either the file wasn't added to `static/` or a path is wrong
- **axe violations** → the failure message includes the rule id, target selector, and a help URL with the fix
- **`heading <hN> skips a level`** → e.g. a page jumps from `<h2>` straight to `<h4>`; insert the missing level or restructure
