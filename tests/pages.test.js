const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const cheerio = require("cheerio");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

const SITE_URL = "https://golebiowski.dev";

const pngSize = (file) => {
  const header = fs.readFileSync(file).subarray(0, 24);
  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
};

const PAGES = [
  {
    file: "index.html",
    title: "Grzegorz Gołębiowski - Principal Engineer, Tech Lead",
    pathname: "/",
    ogType: "profile",
  },
  {
    file: "about/index.html",
    title: "About · Grzegorz Gołębiowski",
    pathname: "/about/",
  },
  {
    file: "contact/index.html",
    title: "Contact · Grzegorz Gołębiowski",
    pathname: "/contact/",
  },
  { file: "404.html", title: "Not Found · Grzegorz Gołębiowski", noindex: true },
  {
    file: "privacy/index.html",
    title: "Privacy Policy · Grzegorz Gołębiowski",
    pathname: "/privacy/",
  },
];

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

    it("has Open Graph and Twitter Card tags", () => {
      content ??= fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8");
      const $ = cheerio.load(content);
      const og = (property) =>
        $(`meta[property="og:${property}"]`).attr("content");

      assert.equal(og("title"), title);
      assert.equal(
        og("description"),
        $('meta[name="description"]').attr("content"),
      );
      assert.equal(og("url"), canonicalUrl || undefined);
      assert.equal(og("type"), ogType);
      assert.equal(og("site_name"), "Grzegorz Gołębiowski");
      assert.equal(og("locale"), "en_US");
      assert.equal(
        $('meta[name="twitter:card"]').attr("content"),
        "summary_large_image",
      );
    });

    it("og:image points to an existing image with matching dimensions", () => {
      content ??= fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8");
      const $ = cheerio.load(content);
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

describe("index.html profile tags", () => {
  it("has profile:first_name and profile:last_name", () => {
    const $ = cheerio.load(
      fs.readFileSync(path.join(PUBLIC_DIR, "index.html"), "utf8"),
    );
    const profile = (property) =>
      $(`meta[property="profile:${property}"]`).attr("content");

    assert.equal(profile("first_name"), "Grzegorz");
    assert.equal(profile("last_name"), "Gołębiowski");
  });
});
