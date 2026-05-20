const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const MIN_HTML_SIZE = 1024;

const PAGES = [
  "index.html",
  "about/index.html",
  "contact/index.html",
  "404.html",
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

describe("build artifacts", () => {
  it("webpack.stats.json exists", () => {
    assert.ok(fs.existsSync(path.join(PUBLIC_DIR, "webpack.stats.json")));
  });

  it("chunk-map.json exists", () => {
    assert.ok(fs.existsSync(path.join(PUBLIC_DIR, "chunk-map.json")));
  });

  it("page-data/app-data.json exists", () => {
    assert.ok(
      fs.existsSync(path.join(PUBLIC_DIR, "page-data", "app-data.json")),
    );
  });

  it("every page has a corresponding page-data.json", () => {
    const routes = ["index", "404", "about", "contact"];
    const missing = routes.filter(
      (r) =>
        !fs.existsSync(path.join(PUBLIC_DIR, "page-data", r, "page-data.json")),
    );
    assert.deepEqual(missing, [], `missing page-data: ${missing.join(", ")}`);
  });
});

describe("built pages", () => {
  for (const file of PAGES) {
    it(`${file} is larger than ${MIN_HTML_SIZE} bytes`, () => {
      const full = path.join(PUBLIC_DIR, file);
      const size = fs.statSync(full).size;
      assert.ok(
        size > MIN_HTML_SIZE,
        `${file} is suspiciously small: ${size} bytes`,
      );
    });
  }
});

describe("font-display", () => {
  it("built CSS uses font-display: block (not swap) for all @font-face rules", () => {
    const indexHtml = fs.readFileSync(
      path.join(PUBLIC_DIR, "index.html"),
      "utf8",
    );
    const cssRefs = [
      ...indexHtml.matchAll(/href="(\/styles\.[^"]+\.css)"/g),
    ].map((m) => m[1]);
    assert.ok(cssRefs.length > 0, "no styles.*.css link found in index.html");
    const cssContent = cssRefs
      .map((ref) =>
        fs.readFileSync(path.join(PUBLIC_DIR, ref.replace(/^\//, "")), "utf8"),
      )
      .join("");
    assert.ok(
      !cssContent.includes("font-display:swap") &&
        !cssContent.includes("font-display: swap"),
      "found font-display: swap in built CSS — webpack rule may not be applying",
    );
    assert.ok(
      cssContent.includes("font-display:block") ||
        cssContent.includes("font-display: block"),
      "font-display: block not found in built CSS",
    );
  });
});

describe("total bundle size", () => {
  it("reports public/ size", () => {
    const bytes = dirSize(PUBLIC_DIR);
    const mb = (bytes / 1024 / 1024).toFixed(2);
    console.log(`    public/ total size: ${mb} MB`);
    assert.ok(bytes > 0);
  });
});
