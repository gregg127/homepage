const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");

const { readPage } = require("../site");

const COLOR_TOKENS = [
  "color-text",
  "color-text-muted",
  "color-text-link-hover",
  "color-background",
  "color-secondary",
];

const definedTokens = (html, variant) =>
  [...html.matchAll(new RegExp(`--${variant}-(color-[a-z-]+)\\s*:`, "g"))]
    .map((m) => m[1])
    .filter((token, i, all) => all.indexOf(token) === i)
    .sort();

describe("theme colours", () => {
  let html;

  before(() => {
    html = readPage("index.html");
  });

  for (const variant of ["light", "dark"]) {
    it(`defines every --${variant}-* colour token`, () => {
      assert.deepEqual(definedTokens(html, variant), [...COLOR_TOKENS].sort());
    });
  }
});
