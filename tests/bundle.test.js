const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MIN_HTML_SIZE = 1024;

const PAGES = [
  'index.html',
  'about/index.html',
  'resume/index.html',
  'contact/index.html',
  '404.html',
];

const dirSize = (dir) => {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) total += dirSize(full);
    else if (entry.isFile()) total += fs.statSync(full).size;
  }
  return total;
};

describe('build artifacts', () => {
  it('webpack.stats.json exists', () => {
    assert.ok(fs.existsSync(path.join(PUBLIC_DIR, 'webpack.stats.json')));
  });

  it('chunk-map.json exists', () => {
    assert.ok(fs.existsSync(path.join(PUBLIC_DIR, 'chunk-map.json')));
  });

  it('page-data/app-data.json exists', () => {
    assert.ok(fs.existsSync(path.join(PUBLIC_DIR, 'page-data', 'app-data.json')));
  });

  it('every page has a corresponding page-data.json', () => {
    const routes = ['index', '404', 'about', 'contact', 'resume'];
    const missing = routes.filter(
      (r) => !fs.existsSync(path.join(PUBLIC_DIR, 'page-data', r, 'page-data.json')),
    );
    assert.deepEqual(missing, [], `missing page-data: ${missing.join(', ')}`);
  });
});

describe('built pages', () => {
  for (const file of PAGES) {
    it(`${file} is larger than ${MIN_HTML_SIZE} bytes`, () => {
      const full = path.join(PUBLIC_DIR, file);
      const size = fs.statSync(full).size;
      assert.ok(size > MIN_HTML_SIZE, `${file} is suspiciously small: ${size} bytes`);
    });
  }
});

describe('total bundle size', () => {
  it('reports public/ size', () => {
    const bytes = dirSize(PUBLIC_DIR);
    const mb = (bytes / 1024 / 1024).toFixed(2);
    console.log(`    public/ total size: ${mb} MB`);
    assert.ok(bytes > 0);
  });
});
