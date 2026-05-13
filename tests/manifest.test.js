const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MANIFEST_PATH = path.join(PUBLIC_DIR, 'manifest.webmanifest');
const VALID_DISPLAY = ['fullscreen', 'standalone', 'minimal-ui', 'browser'];

describe('manifest.webmanifest', () => {
  let manifest;

  before(() => {
    assert.ok(fs.existsSync(MANIFEST_PATH), 'public/manifest.webmanifest is missing');
    const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
    manifest = JSON.parse(raw);
  });

  it('has required PWA fields', () => {
    for (const field of ['name', 'short_name', 'start_url', 'display', 'icons']) {
      assert.ok(manifest[field], `missing required manifest field: ${field}`);
    }
  });

  it('uses a valid display mode', () => {
    assert.ok(
      VALID_DISPLAY.includes(manifest.display),
      `display "${manifest.display}" is not one of ${VALID_DISPLAY.join('|')}`,
    );
  });

  it('start_url is absolute or root-relative', () => {
    assert.match(manifest.start_url, /^(https?:\/\/|\/)/, 'start_url must be absolute or root-relative');
  });

  it('declares at least one icon', () => {
    assert.ok(Array.isArray(manifest.icons), 'icons must be an array');
    assert.ok(manifest.icons.length > 0, 'icons array is empty');
  });

  it('every icon entry has src, sizes, and type', () => {
    const incomplete = manifest.icons.filter((icon) => !icon.src || !icon.sizes || !icon.type);
    assert.deepEqual(incomplete, [], `icons missing required fields: ${JSON.stringify(incomplete)}`);
  });

  it('every icon file exists in public/', () => {
    const missing = manifest.icons
      .map(({ src }) => src.split('?')[0].replace(/^\/+/, ''))
      .filter((p) => !fs.existsSync(path.join(PUBLIC_DIR, p)));
    assert.deepEqual(missing, [], `missing icon files: ${missing.join(', ')}`);
  });
});
