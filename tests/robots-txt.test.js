const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROBOTS_TXT = path.join(__dirname, "..", "public", "robots.txt");

const AI_BOTS_DISALLOWED = [
  "GPTBot",
  "ClaudeBot",
  "CCBot",
  "Google-Extended",
  "PerplexityBot",
  "Grok",
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent",
];

const LLMS_ALLOWED_PATHS = [
  "/llms.txt",
  "/",
  "/about/",
  "/resume/",
  "/contact/",
  "/privacy/",
];

describe("robots.txt", () => {
  let content;

  before(() => {
    assert.ok(fs.existsSync(ROBOTS_TXT), "public/robots.txt is missing");
    content = fs.readFileSync(ROBOTS_TXT, "utf8");
  });

  it("allows all general crawlers", () => {
    assert.match(content, /^User-agent: \*$/m);
    assert.match(content, /^Allow: \/$/m);
  });

  it("references the sitemap", () => {
    assert.match(
      content,
      /^Sitemap: https:\/\/golebiowski\.dev\/sitemap-index\.xml$/m,
    );
  });

  for (const bot of AI_BOTS_DISALLOWED) {
    it(`disallows ${bot} from crawling the full site`, () => {
      const botSection = content.match(
        new RegExp(`User-agent: ${bot}[\\s\\S]*?(?=\\n\\n|$)`),
      )?.[0];
      assert.ok(botSection, `No section found for ${bot}`);
      assert.match(botSection, /^Disallow: \/$/m);
    });

    for (const allowedPath of LLMS_ALLOWED_PATHS) {
      const escapedPath = allowedPath.replace(/\./g, "\\.").replace(/\//g, "\\/");
      it(`allows ${bot} to access ${allowedPath}`, () => {
        const botSection = content.match(
          new RegExp(`User-agent: ${bot}[\\s\\S]*?(?=\\n\\n|$)`),
        )?.[0];
        assert.ok(botSection, `No section found for ${bot}`);
        assert.match(
          botSection,
          new RegExp(`^Allow: ${escapedPath}$`, "m"),
          `Expected "${bot}" block to allow ${allowedPath}`,
        );
      });
    }
  }
});
