const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");

const {
  SITE_URL,
  AUTHOR,
  GITHUB_URL,
  LINKEDIN_URL,
  loadPage,
} = require("../site");

describe("structured data: index.html", () => {
  let blocks;

  before(() => {
    const $ = loadPage("index.html");
    blocks = $('script[type="application/ld+json"]')
      .map((_, el) => $(el).html())
      .get();
  });

  it("has exactly one JSON-LD block", () => {
    assert.equal(blocks.length, 1);
  });

  it("escapes < so the script element cannot be closed early", () => {
    assert.ok(!blocks[0].includes("<"), "JSON-LD contains a raw <");
  });

  it("JSON-LD is valid JSON", () => {
    assert.doesNotThrow(() => JSON.parse(blocks[0]));
  });

  it("describes a schema.org Person", () => {
    const person = JSON.parse(blocks[0]);
    assert.equal(person["@context"], "https://schema.org");
    assert.equal(person["@type"], "Person");
    assert.equal(person.name, AUTHOR);
    assert.equal(person.url, `${SITE_URL}/`);
    assert.ok(person.jobTitle, "missing jobTitle");
    assert.ok(person.email, "missing email");
  });

  it("includes alma mater", () => {
    const person = JSON.parse(blocks[0]);
    assert.equal(person.alumniOf?.["@type"], "CollegeOrUniversity");
    assert.equal(
      person.alumniOf?.name,
      "Polish-Japanese Academy of Information Technology",
    );
  });

  it("links to social profiles via sameAs", () => {
    const person = JSON.parse(blocks[0]);
    assert.deepEqual(person.sameAs, [GITHUB_URL, LINKEDIN_URL]);
  });
});
