const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROBOTS_TXT = path.join(__dirname, '..', 'public', 'robots.txt');

describe('robots.txt', () => {
  it('exists in public directory', () => {
    assert.ok(fs.existsSync(ROBOTS_TXT), 'public/robots.txt is missing');
  });

  it('contains a User-agent directive', () => {
    const content = fs.readFileSync(ROBOTS_TXT, 'utf8');
    assert.match(content, /^User-agent:/m);
  });

  it('allows all crawlers', () => {
    const content = fs.readFileSync(ROBOTS_TXT, 'utf8');
    assert.match(content, /^User-agent: \*$/m);
    assert.match(content, /^Allow: \/$/m);
  });

  it('references the sitemap', () => {
    const content = fs.readFileSync(ROBOTS_TXT, 'utf8');
    assert.match(content, /^Sitemap: https:\/\/golebiowski\.dev\/sitemap-index\.xml$/m);
  });
});
