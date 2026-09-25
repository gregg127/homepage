const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

const SITE_URL = "https://golebiowski.dev";

const PAGES = [
  {
    file: "index.html",
    title: "Grzegorz Gołębiowski - Principal Engineer, Tech Lead",
    pathname: "/",
  },
  { file: "about/index.html", title: "About", pathname: "/about/" },
  { file: "contact/index.html", title: "Contact", pathname: "/contact/" },
  { file: "404.html", title: "Not Found", noindex: true },
  {
    file: "privacy/index.html",
    title: "Privacy Policy",
    pathname: "/privacy/",
  },
];

for (const { file, title, pathname, noindex = false } of PAGES) {
  describe(file, () => {
    let content;

    it("exists in public directory", () => {
      const fullPath = path.join(PUBLIC_DIR, file);
      assert.ok(fs.existsSync(fullPath), `public/${file} is missing`);
      content = fs.readFileSync(fullPath, "utf8");
    });

    it("has correct title", () => {
      content ??= fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8");
      assert.ok(
        content.includes(`>${title}</title>`),
        `Expected title "${title}" in ${file}`,
      );
    });

    it("has a non-empty meta description", () => {
      content ??= fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8");
      assert.match(
        content,
        /<meta name="description" content=".+?"/,
        `Missing meta description in ${file}`,
      );
    });

    it('declares lang="en"', () => {
      content ??= fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8");
      assert.match(content, /lang="en"/, `Missing lang="en" in ${file}`);
    });

    it(noindex ? "is marked noindex" : "is indexable", () => {
      content ??= fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8");
      assert.equal(
        /<meta name="robots" content="[^"]*noindex/.test(content),
        noindex,
        `Expected ${file} to be ${noindex ? "noindex" : "indexable"}`,
      );
    });

    const canonicalUrl = pathname && `${SITE_URL}${pathname}`;

    it(canonicalUrl ? "has a canonical link" : "has no canonical link", () => {
      content ??= fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8");
      const canonicals = [
        ...content.matchAll(/<link rel="canonical" href="([^"]*)"/g),
      ].map((m) => m[1]);
      assert.deepEqual(canonicals, canonicalUrl ? [canonicalUrl] : []);
    });
  });
}
