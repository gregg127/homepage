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

const isExternal = (url) => /^(https?:)?\/\//.test(url) || url.startsWith('data:') || url.startsWith('mailto:');

const localPath = (url) => {
  const cleaned = url.split('?')[0].split('#')[0];
  if (!cleaned.startsWith('/')) return null;
  return path.join(PUBLIC_DIR, cleaned.replace(/^\/+/, ''));
};

const collectRefs = ($) => {
  const refs = [];
  $('script[src]').each((_, el) => refs.push({ kind: 'script', url: $(el).attr('src') }));
  $('link[href]').each((_, el) => refs.push({ kind: 'link', url: $(el).attr('href') }));
  $('img[src]').each((_, el) => refs.push({ kind: 'img', url: $(el).attr('src') }));
  $('source[src]').each((_, el) => refs.push({ kind: 'source', url: $(el).attr('src') }));
  $('video[src]').each((_, el) => refs.push({ kind: 'video', url: $(el).attr('src') }));
  return refs;
};

for (const file of PAGES) {
  describe(`asset integrity: ${file}`, () => {
    const html = fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf8');
    const $ = cheerio.load(html);
    const refs = collectRefs($);
    const localRefs = refs.filter((r) => r.url && !isExternal(r.url) && r.url.startsWith('/'));

    it('references at least one local asset', () => {
      assert.ok(localRefs.length > 0, `no local asset references found in ${file}`);
    });

    it('every referenced local asset exists', () => {
      const missing = [];
      for (const { kind, url } of localRefs) {
        const target = localPath(url);
        if (target && !fs.existsSync(target)) {
          missing.push(`${kind} -> ${url}`);
        }
      }
      assert.deepEqual(missing, [], `missing assets:\n  ${missing.join('\n  ')}`);
    });

    it('no referenced asset has zero size', () => {
      const empty = [];
      for (const { kind, url } of localRefs) {
        const target = localPath(url);
        if (target && fs.existsSync(target) && fs.statSync(target).size === 0) {
          empty.push(`${kind} -> ${url}`);
        }
      }
      assert.deepEqual(empty, [], `zero-size assets:\n  ${empty.join('\n  ')}`);
    });
  });
}
