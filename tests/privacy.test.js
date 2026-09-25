const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const cheerio = require("cheerio");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

describe("privacy policy", () => {
  const $ = cheerio.load(
    fs.readFileSync(path.join(PUBLIC_DIR, "privacy", "index.html"), "utf8"),
  );

  it("raw markdown is not published", () => {
    assert.ok(
      !fs.existsSync(path.join(PUBLIC_DIR, "privacy-policy.md")),
      "public/privacy-policy.md should not exist",
    );
  });

  it("renders the English and Polish policy", () => {
    const headings = $("h2")
      .map((_, el) => $(el).text().trim())
      .get();
    assert.ok(headings.includes("1. Data Controller"), headings.join(", "));
    assert.ok(headings.includes("Polityka prywatności"), headings.join(", "));
  });

  it("language link points at the Polish section anchor", () => {
    const href = $('a[href^="#polityka"]').attr("href");
    assert.ok(href, "missing link to #polityka-prywatności");
    const id = decodeURIComponent(href.slice(1));
    assert.equal(id, "polityka-prywatności");
    assert.equal($(`[id="${id}"]`).length, 1, `no element with id="${id}"`);
  });
});
