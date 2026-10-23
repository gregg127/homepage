const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const {
  PUBLIC_DIR,
  SITE_URL,
  AUTHOR,
  PAGES,
  readPage,
  loadPage,
} = require("../site");

const pngSize = (file) => {
  const header = fs.readFileSync(file).subarray(0, 24);
  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
};

for (const {
  file,
  title,
  pathname,
  ogType = "website",
  noindex = false,
} of PAGES) {
  describe(file, () => {
    let content;

    it("exists in public directory", () => {
      const fullPath = path.join(PUBLIC_DIR, file);
      assert.ok(fs.existsSync(fullPath), `public/${file} is missing`);
      content = readPage(file);
    });

    it("has correct title", () => {
      content ??= readPage(file);
      assert.ok(
        content.includes(`>${title}</title>`),
        `Expected title "${title}" in ${file}`,
      );
    });

    it("has a non-empty meta description", () => {
      content ??= readPage(file);
      assert.match(
        content,
        /<meta name="description" content=".+?"/,
        `Missing meta description in ${file}`,
      );
    });

    it('declares lang="en"', () => {
      content ??= readPage(file);
      assert.match(content, /lang="en"/, `Missing lang="en" in ${file}`);
    });

    it(noindex ? "is marked noindex" : "is indexable", () => {
      content ??= readPage(file);
      assert.equal(
        /<meta name="robots" content="[^"]*noindex/.test(content),
        noindex,
        `Expected ${file} to be ${noindex ? "noindex" : "indexable"}`,
      );
    });

    const canonicalUrl = pathname && `${SITE_URL}${pathname}`;

    it(canonicalUrl ? "has a canonical link" : "has no canonical link", () => {
      content ??= readPage(file);
      const canonicals = [
        ...content.matchAll(/<link rel="canonical" href="([^"]*)"/g),
      ].map((m) => m[1]);
      assert.deepEqual(canonicals, canonicalUrl ? [canonicalUrl] : []);
    });

    it("has Open Graph and Twitter Card tags", () => {
      const $ = loadPage(file);
      const og = (property) =>
        $(`meta[property="og:${property}"]`).attr("content");

      assert.equal(og("title"), title);
      assert.equal(
        og("description"),
        $('meta[name="description"]').attr("content"),
      );
      assert.equal(og("url"), canonicalUrl || undefined);
      assert.equal(og("type"), ogType);
      assert.equal(og("site_name"), AUTHOR);
      assert.equal(og("locale"), "en_US");
      assert.equal(
        $('meta[name="twitter:card"]').attr("content"),
        "summary_large_image",
      );
    });

    it("og:image points to an existing image with matching dimensions", () => {
      const $ = loadPage(file);
      const og = (property) =>
        $(`meta[property="og:${property}"]`).attr("content");
      const image = og("image");

      assert.ok(
        image?.startsWith(`${SITE_URL}/`),
        `og:image must be an absolute ${SITE_URL} URL, got ${image}`,
      );
      assert.equal($('meta[name="twitter:image"]').attr("content"), image);
      assert.ok(og("image:alt"), `Missing og:image:alt in ${file}`);

      const imageFile = path.join(PUBLIC_DIR, image.slice(SITE_URL.length));
      assert.ok(fs.existsSync(imageFile), `${image} does not exist in public/`);
      assert.deepEqual(pngSize(imageFile), {
        width: Number(og("image:width")),
        height: Number(og("image:height")),
      });
    });
  });
}

describe("page metadata uniqueness", () => {
  const $$ = PAGES.map(({ file }) => loadPage(file));

  for (const [label, read] of [
    ["title", ($) => $("head > title").text()],
    ["meta description", ($) => $('meta[name="description"]').attr("content")],
  ]) {
    it(`every page has a distinct ${label}`, () => {
      const values = $$.map(read);
      const duplicates = values.filter((v, i) => values.indexOf(v) !== i);
      assert.deepEqual(duplicates, [], `duplicate ${label}: ${duplicates}`);
    });
  }
});

describe("index.html profile tags", () => {
  it("has profile:first_name and profile:last_name", () => {
    const $ = loadPage("index.html");
    const profile = (property) =>
      $(`meta[property="profile:${property}"]`).attr("content");

    assert.equal(profile("first_name"), "Grzegorz");
    assert.equal(profile("last_name"), "Gołębiowski");
  });
});
