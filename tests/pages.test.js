const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const PAGES = [
  { file: 'index.html',         title: 'Grzegorz Gołębiowski - personal website' },
  { file: 'about/index.html',   title: 'About' },
  { file: 'resume/index.html',  title: 'Resume' },
  { file: 'contact/index.html', title: 'Contact' },
  { file: '404.html',           title: 'Not Found' },
];

for (const { file, title } of PAGES) {
  describe(file, () => {
    let content;

    it('exists in public directory', () => {
      const fullPath = path.join(PUBLIC_DIR, file);
      assert.ok(fs.existsSync(fullPath), `public/${file} is missing`);
      content = fs.readFileSync(fullPath, 'utf8');
    });

    it('has correct title', () => {
      content ??= fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf8');
      assert.ok(content.includes(`>${title}</title>`), `Expected title "${title}" in ${file}`);
    });

    it('has a non-empty meta description', () => {
      content ??= fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf8');
      assert.match(content, /<meta name="description" content=".+?"/, `Missing meta description in ${file}`);
    });

    it('declares lang="en"', () => {
      content ??= fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf8');
      assert.match(content, /lang="en"/, `Missing lang="en" in ${file}`);
    });
  });
}
