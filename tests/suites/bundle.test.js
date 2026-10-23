const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const { PUBLIC_DIR, PAGE_FILES, readPage } = require("../site");
const MIN_HTML_SIZE = 1024;

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
    const routes = PAGE_FILES.map((file) => file.replace(/(\/index)?\.html$/, ""));
    const missing = routes.filter(
      (r) =>
        !fs.existsSync(path.join(PUBLIC_DIR, "page-data", r, "page-data.json")),
    );
    assert.deepEqual(missing, [], `missing page-data: ${missing.join(", ")}`);
  });
});

describe("built pages", () => {
  for (const file of PAGE_FILES) {
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

const INDEX_HTML_BUDGET = 80 * 1024;
const LATIN_EXT_RANGE = "u+0100-02ba";
const EXPECTED_FONT_FACES = [
  "Lato normal 300",
  "Lato italic 300",
  "Lato normal 400",
  "Courier Prime normal 400",
];

const fontFaces = (html) =>
  [...html.matchAll(/@font-face\{([^}]*)\}/g)].map(([, body]) => {
    const prop = (name) =>
      body.match(new RegExp(`${name}:([^;]+)`))?.[1].replace(/["']/g, "");
    return {
      face: `${prop("font-family")} ${prop("font-style")} ${prop("font-weight")}`,
      unicodeRange: prop("unicode-range")?.toLowerCase() ?? "",
    };
  });

describe("font budget", () => {
  it(`index.html is under ${INDEX_HTML_BUDGET / 1024} KB`, () => {
    const size = fs.statSync(path.join(PUBLIC_DIR, "index.html")).size;
    assert.ok(
      size < INDEX_HTML_BUDGET,
      `index.html is ${size} bytes — check for unused inlined @font-face rules`,
    );
  });

  for (const file of PAGE_FILES) {
    it(`${file} inlines only the font faces in use`, () => {
      const faces = [...new Set(fontFaces(readPage(file)).map((f) => f.face))];
      assert.deepEqual(faces.sort(), [...EXPECTED_FONT_FACES].sort());
    });
  }

  it("every font face has a latin-ext subset for Polish characters", () => {
    const faces = fontFaces(readPage("index.html"));
    for (const expected of EXPECTED_FONT_FACES) {
      assert.ok(
        faces.some(
          ({ face, unicodeRange }) =>
            face === expected && unicodeRange.includes(LATIN_EXT_RANGE),
        ),
        `${expected} has no latin-ext @font-face rule`,
      );
    }
  });
});

describe("font-display", () => {
  it("built CSS uses font-display: block (not swap) for all @font-face rules", () => {
    const indexHtml = readPage("index.html");
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
