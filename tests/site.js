const fs = require("node:fs");
const path = require("node:path");
const cheerio = require("cheerio");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const SITE_URL = "https://golebiowski.dev";

const AUTHOR = "Grzegorz Gołębiowski";
const EMAIL = "grzegorz.golebiowski127@gmail.com";
const GITHUB_URL = "https://github.com/gregg127";
const LINKEDIN_URL = "https://www.linkedin.com/in/grzegorz-golebiowski";
const CV_PATH = "/Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf";

const PAGES = [
  {
    file: "index.html",
    title: `${AUTHOR} - Principal Engineer, Tech Lead`,
    pathname: "/",
    ogType: "profile",
  },
  {
    file: "about/index.html",
    title: `About · ${AUTHOR}`,
    pathname: "/about/",
  },
  {
    file: "contact/index.html",
    title: `Contact · ${AUTHOR}`,
    pathname: "/contact/",
  },
  { file: "404.html", title: `Not Found · ${AUTHOR}`, noindex: true },
  {
    file: "privacy/index.html",
    title: `Privacy Policy · ${AUTHOR}`,
    pathname: "/privacy/",
  },
];

const PAGE_FILES = PAGES.map(({ file }) => file);

for (const { file, pathname, noindex } of PAGES) {
  if (!noindex && !pathname) {
    throw new Error(`PAGES entry ${file} is indexable but has no pathname`);
  }
}

const INDEXED_PATHNAMES = PAGES.filter(({ noindex }) => !noindex).map(
  ({ pathname }) => pathname,
);

const memoize = (fn) => {
  const cache = new Map();
  return (key) => {
    if (!cache.has(key)) cache.set(key, fn(key));
    return cache.get(key);
  };
};

const readPage = memoize((file) =>
  fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8"),
);

// Shared across tests in a file — callers must not mutate the returned DOM.
const loadPage = memoize((file) => cheerio.load(readPage(file)));

module.exports = {
  PUBLIC_DIR,
  SITE_URL,
  AUTHOR,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  CV_PATH,
  PAGES,
  PAGE_FILES,
  INDEXED_PATHNAMES,
  readPage,
  loadPage,
};
