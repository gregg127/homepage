const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROBOTS_TXT = path.join(__dirname, '..', 'public', 'robots.txt');

const AI_BOTS_DISALLOWED = [
  'GPTBot',
  'ClaudeBot',
  'CCBot',
  'Google-Extended',
  'PerplexityBot',
  'Grok',
  'Bytespider',
  'Amazonbot',
  'Meta-ExternalAgent',
];

describe('robots.txt', () => {
  let content;

  before(() => {
    assert.ok(fs.existsSync(ROBOTS_TXT), 'public/robots.txt is missing');
    content = fs.readFileSync(ROBOTS_TXT, 'utf8');
  });

  it('allows all general crawlers', () => {
    assert.match(content, /^User-agent: \*$/m);
    assert.match(content, /^Allow: \/$/m);
  });

  it('references the sitemap', () => {
    assert.match(content, /^Sitemap: https:\/\/golebiowski\.dev\/sitemap-index\.xml$/m);
  });

  for (const bot of AI_BOTS_DISALLOWED) {
    it(`disallows ${bot}`, () => {
      const re = new RegExp(`^User-agent: ${bot}\\s*\\nDisallow: /`, 'm');
      assert.match(content, re, `Expected "User-agent: ${bot}" followed by "Disallow: /"`);
    });
  }
});
