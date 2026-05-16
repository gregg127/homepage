const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROBOTS_TXT = path.join(__dirname, "..", "public", "robots.txt");

describe("robots.txt", () => {
  let content;

  before(() => {
    assert.ok(fs.existsSync(ROBOTS_TXT), "public/robots.txt is missing");
    content = fs.readFileSync(ROBOTS_TXT, "utf8");
  });

  it("allows all crawlers", () => {
    assert.match(content, /^User-agent: \*$/m);
    assert.match(content, /^Allow: \/$/m);
  });

  it("has no Disallow directives", () => {
    assert.doesNotMatch(content, /^Disallow:/m);
  });

  it("references the sitemap", () => {
    assert.match(
      content,
      /^Sitemap: https:\/\/golebiowski\.dev\/sitemap-index\.xml$/m,
    );
  });
});
