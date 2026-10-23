const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const { PUBLIC_DIR, SITE_URL, INDEXED_PATHNAMES } = require("../site");

const SITEMAP_INDEX = path.join(PUBLIC_DIR, "sitemap-index.xml");
const SITEMAP_0 = path.join(PUBLIC_DIR, "sitemap-0.xml");

describe("sitemap-index.xml", () => {
  it("exists in public directory", () => {
    assert.ok(
      fs.existsSync(SITEMAP_INDEX),
      "public/sitemap-index.xml is missing",
    );
  });

  it("has sitemapindex as root element", () => {
    const content = fs.readFileSync(SITEMAP_INDEX, "utf8");
    assert.ok(
      content.includes("<sitemapindex"),
      "Missing <sitemapindex> element",
    );
    assert.ok(
      content.includes("</sitemapindex>"),
      "Missing </sitemapindex> closing tag",
    );
  });

  it("references only sitemap-0.xml on the site URL", () => {
    const content = fs.readFileSync(SITEMAP_INDEX, "utf8");
    const locs = [...content.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
    assert.deepEqual(locs, [`${SITE_URL}/sitemap-0.xml`]);
  });
});

describe("sitemap-0.xml", () => {
  it("exists in public directory", () => {
    assert.ok(fs.existsSync(SITEMAP_0), "public/sitemap-0.xml is missing");
  });

  it("has urlset as root element", () => {
    const content = fs.readFileSync(SITEMAP_0, "utf8");
    assert.ok(content.includes("<urlset"), "Missing <urlset> element");
    assert.ok(content.includes("</urlset>"), "Missing </urlset> closing tag");
  });

  it("lists exactly the expected pages", () => {
    const content = fs.readFileSync(SITEMAP_0, "utf8");
    const locs = [...content.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
    assert.deepEqual(
      locs.sort(),
      INDEXED_PATHNAMES.map((page) => `${SITE_URL}${page}`).sort(),
    );
  });

  it("has no 404 page", () => {
    const content = fs.readFileSync(SITEMAP_0, "utf8");
    assert.ok(
      !content.includes("/404"),
      "sitemap-0.xml should not include the 404 page",
    );
  });
});
