const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const PAGES = [
  'index.html',
  'about/index.html',
  'resume/index.html',
  'contact/index.html',
  '404.html',
];

const FORBIDDEN_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0'];

const resolveInternalRef = (href) => {
  const cleaned = href.split('?')[0].split('#')[0];
  if (!cleaned || cleaned === '/') return path.join(PUBLIC_DIR, 'index.html');
  const trimmed = cleaned.replace(/^\/+/, '').replace(/\/+$/, '');
  const direct = path.join(PUBLIC_DIR, trimmed);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;
  return path.join(PUBLIC_DIR, trimmed, 'index.html');
};

for (const file of PAGES) {
  describe(`html validity: ${file}`, () => {
    const html = fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf8');
    const $ = cheerio.load(html);

    it('parses as HTML with <html> and <body>', () => {
      assert.equal($('html').length, 1, 'expected exactly one <html> element');
      assert.equal($('body').length, 1, 'expected exactly one <body> element');
    });

    it('has at most one <h1>', () => {
      assert.ok($('h1').length <= 1, `found ${$('h1').length} <h1> elements`);
    });

    it('heading hierarchy does not skip levels', () => {
      const levels = $('h1, h2, h3, h4, h5, h6')
        .map((_, el) => Number(el.tagName.slice(1)))
        .get();
      let maxSeen = 0;
      for (const level of levels) {
        assert.ok(
          level <= maxSeen + 1 || maxSeen === 0,
          `heading <h${level}> skips a level (previous deepest was h${maxSeen})`,
        );
        if (level > maxSeen) maxSeen = level;
      }
    });

    it('every <img> has a non-empty alt attribute', () => {
      const missing = [];
      $('img').each((_, el) => {
        const alt = $(el).attr('alt');
        if (alt === undefined || alt.trim() === '') {
          missing.push($(el).attr('src') || '(no src)');
        }
      });
      assert.equal(missing.length, 0, `images missing alt: ${missing.join(', ')}`);
    });

    it('internal links resolve to a built file', () => {
      const broken = [];
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        if (/^https?:\/\//.test(href)) return;
        if (!href.startsWith('/')) return;
        const target = resolveInternalRef(href);
        if (!fs.existsSync(target)) broken.push(href);
      });
      assert.deepEqual(broken, [], `broken internal links: ${broken.join(', ')}`);
    });

    it('contains no development-only hostnames', () => {
      for (const host of FORBIDDEN_HOSTS) {
        assert.ok(!html.includes(host), `HTML contains forbidden host: ${host}`);
      }
    });
  });
}
