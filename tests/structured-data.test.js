const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const cheerio = require("cheerio");

const INDEX_HTML = path.join(__dirname, "..", "public", "index.html");

const EXPECTED_SAME_AS = [
  "https://github.com/gregg127",
  "https://www.linkedin.com/in/grzegorz-golebiowski",
];

describe("structured data: index.html", () => {
  let blocks;

  before(() => {
    const $ = cheerio.load(fs.readFileSync(INDEX_HTML, "utf8"));
    blocks = $('script[type="application/ld+json"]')
      .map((_, el) => $(el).html())
      .get();
  });

  it("has exactly one JSON-LD block", () => {
    assert.equal(blocks.length, 1);
  });

  it("JSON-LD is valid JSON", () => {
    assert.doesNotThrow(() => JSON.parse(blocks[0]));
  });

  it("describes a schema.org Person", () => {
    const person = JSON.parse(blocks[0]);
    assert.equal(person["@context"], "https://schema.org");
    assert.equal(person["@type"], "Person");
    assert.equal(person.name, "Grzegorz Gołębiowski");
    assert.equal(person.url, "https://golebiowski.dev/");
    assert.ok(person.jobTitle, "missing jobTitle");
    assert.ok(person.email, "missing email");
  });

  it("includes employer and alma mater", () => {
    const person = JSON.parse(blocks[0]);
    assert.equal(person.worksFor?.["@type"], "Organization");
    assert.equal(person.worksFor?.name, "e-point SA");
    assert.equal(person.alumniOf?.["@type"], "CollegeOrUniversity");
    assert.equal(
      person.alumniOf?.name,
      "Polish-Japanese Academy of Information Technology",
    );
  });

  it("links to social profiles via sameAs", () => {
    const person = JSON.parse(blocks[0]);
    assert.deepEqual(person.sameAs, EXPECTED_SAME_AS);
  });
});
