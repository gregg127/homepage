const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const LLMS_TXT = path.join(__dirname, "..", "public", "llms.txt");

const EXPECTED_PAGES = [
  "https://golebiowski.dev/",
  "https://golebiowski.dev/about/",
  "https://golebiowski.dev/resume/",
  "https://golebiowski.dev/contact/",
  "https://golebiowski.dev/privacy/",
];

describe("llms.txt", () => {
  let content;

  before(() => {
    assert.ok(fs.existsSync(LLMS_TXT), "public/llms.txt is missing");
    content = fs.readFileSync(LLMS_TXT, "utf8");
  });

  it("has an h1 title", () => {
    assert.match(content, /^# .+$/m);
  });

  it("has a blockquote description", () => {
    assert.match(content, /^> .+$/m);
  });

  it("has a pages section", () => {
    assert.match(content, /^## Pages$/m);
  });

  for (const url of EXPECTED_PAGES) {
    it(`links to ${url}`, () => {
      assert.ok(
        content.includes(url),
        `Expected llms.txt to contain a link to ${url}`,
      );
    });
  }
});
