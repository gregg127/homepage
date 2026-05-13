const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SITEMAP_INDEX = path.join(PUBLIC_DIR, 'sitemap-index.xml');
const SITEMAP_0 = path.join(PUBLIC_DIR, 'sitemap-0.xml');
const SITE_URL = 'https://golebiowski.dev';
const EXPECTED_PAGES = ['/', '/about/', '/contact/', '/resume/'];

describe('sitemap-index.xml', () => {
  it('exists in public directory', () => {
    assert.ok(fs.existsSync(SITEMAP_INDEX), 'public/sitemap-index.xml is missing');
  });

  it('has sitemapindex as root element', () => {
    const content = fs.readFileSync(SITEMAP_INDEX, 'utf8');
    assert.ok(content.includes('<sitemapindex'), 'Missing <sitemapindex> element');
    assert.ok(content.includes('</sitemapindex>'), 'Missing </sitemapindex> closing tag');
  });

  it('references sitemap-0.xml', () => {
    const content = fs.readFileSync(SITEMAP_INDEX, 'utf8');
    assert.ok(content.includes('sitemap-0.xml'), 'sitemap-index.xml does not reference sitemap-0.xml');
  });

  it('uses the correct site URL', () => {
    const content = fs.readFileSync(SITEMAP_INDEX, 'utf8');
    assert.ok(content.includes(SITE_URL), `sitemap-index.xml does not contain ${SITE_URL}`);
  });
});

describe('sitemap-0.xml', () => {
  it('exists in public directory', () => {
    assert.ok(fs.existsSync(SITEMAP_0), 'public/sitemap-0.xml is missing');
  });

  it('has urlset as root element', () => {
    const content = fs.readFileSync(SITEMAP_0, 'utf8');
    assert.ok(content.includes('<urlset'), 'Missing <urlset> element');
    assert.ok(content.includes('</urlset>'), 'Missing </urlset> closing tag');
  });

  it('contains all expected pages', () => {
    const content = fs.readFileSync(SITEMAP_0, 'utf8');
    for (const page of EXPECTED_PAGES) {
      assert.ok(
        content.includes(`${SITE_URL}${page}`),
        `sitemap-0.xml is missing page: ${page}`,
      );
    }
  });

  it('has no 404 page', () => {
    const content = fs.readFileSync(SITEMAP_0, 'utf8');
    assert.ok(!content.includes('/404'), 'sitemap-0.xml should not include the 404 page');
  });
});
