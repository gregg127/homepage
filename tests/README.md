# Build-output tests

Integration tests that validate the artifacts under `public/` after `gatsby build`.

## Run

`npm run test` does **not** build — it tests whatever is currently in `public/`. Always build first:

```sh
npm run clean && npm run build && npm run test
```

## Suites

All in `suites/`.

| File                      | What it checks                                                                                                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accessibility.test.js`   | Runs axe-core via jsdom against each page; one test per impact level (`moderate`/`serious`/`critical`) — any violation fails                                                                          |
| `asset-integrity.test.js` | Every JS/CSS/img/icon path referenced in HTML resolves to a real, non-empty file in `public/`                                                                                                                      |
| `bundle.test.js`          | Build artifacts (`webpack.stats.json`, `chunk-map.json`, `page-data/`) exist; every page has `page-data.json`; HTML pages > 1 KB; built CSS uses `font-display: block`; reports total bundle size                 |
| `html-validity.test.js`   | Via cheerio: exactly one `<h1>` and it comes first, no heading skips a level, `<img>` alt, no duplicate ids, internal links and `#anchors` resolve, `target="_blank"` has `rel="noopener noreferrer"`, no dev hostnames |
| `manifest.test.js`        | `manifest.webmanifest` is valid JSON with required PWA fields, a valid `display`, root-relative `start_url`, and existing icon files                                                                               |
| `navigation.test.js`      | Header menu and footer links/copyright on every page (labels, hrefs, `target`/`rel`); contact page links to email, GitHub and LinkedIn                                                                             |
| `pages.test.js`           | Each page has correct `<title>`, meta description, `lang="en"`, canonical URL (none on 404), OG/Twitter tags; `og:image` exists with matching PNG dimensions and alt; titles and descriptions are unique across pages; homepage `profile:*` tags; only 404 is `noindex` |
| `privacy.test.js`         | `/privacy` renders both language versions with a working `#polityka-prywatności` anchor; raw markdown is not published                                                                                             |
| `robots-txt.test.js`      | `public/robots.txt` has `User-agent: *` + `Allow: /`, references the sitemap, and disallows AI training crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended, …)                                                     |
| `sitemap.test.js`         | `sitemap-index.xml` points only at `sitemap-0.xml`; `sitemap-0.xml` lists exactly the indexable pages from `site.js` — no more, no fewer                                                                           |
| `static-assets.test.js`   | Hardcoded list of important static assets (CV PDF, favicon, social preview image, video, icons) exist                                                                                                              |
| `structured-data.test.js` | Homepage has one JSON-LD block, valid JSON with `<` escaped, describing a schema.org `Person` with alma mater and `sameAs` social links                                                                             |
| `theme.test.js`           | Built CSS defines every `--light-color-*` and `--dark-color-*` token, so neither theme is missing a colour                                                                                                          |

## Layout

```
tests/
├── site.js     shared config
└── suites/     one *.test.js per concern
```

## Adding a page

1. Add an entry to `PAGES` in `site.js` — every suite picks it up. Indexable pages need a `pathname`; `site.js` throws on load without one.
2. If it's indexable, add its URL to `../lighthouserc.yml`.

## Debugging failures

- **`page X is missing` / `public/X is missing`** → either the build is stale (re-run `npm run build`) or the page was removed or renamed in source
- **a file that `should not exist` is in `public/`** → `gatsby build` never deletes old output; run `npm run clean` first
- **`broken internal links`** → a page links to a route that doesn't exist; check the `to=` / `href=` in source pages
- **`images missing alt`** → an `<img>` is missing the `alt` attribute; check `src/components/ui/Icon.jsx` and page sources
- **`missing assets`** → HTML references `/foo.png` but `public/foo.png` doesn't exist; either the file wasn't added to `static/` or a path is wrong
- **axe violations** → the failure message includes the rule id, target selector, and a help URL with the fix
- **`heading <hN> skips a level`** → e.g. a page jumps from `<h2>` straight to `<h4>`; insert the missing level or restructure
- **`font-display`** → `gatsby-node.js` rewrites `@fontsource` `swap` to `block`; if this fails, that webpack rule stopped matching
- **`og:image` dimensions** → `og:image:width`/`height` in `Seo` no longer match the actual PNG; update one or the other
