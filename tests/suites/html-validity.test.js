const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const cheerio = require("cheerio");

const { PUBLIC_DIR, PAGE_FILES, readPage } = require("../site");

const FORBIDDEN_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"];

const resolveInternalRef = (href) => {
  const cleaned = href.split("?")[0].split("#")[0];
  if (!cleaned || cleaned === "/") return path.join(PUBLIC_DIR, "index.html");
  const trimmed = cleaned.replace(/^\/+/, "").replace(/\/+$/, "");
  const direct = path.join(PUBLIC_DIR, trimmed);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;
  return path.join(PUBLIC_DIR, trimmed, "index.html");
};

for (const file of PAGE_FILES) {
  describe(`html validity: ${file}`, () => {
    const html = readPage(file);
    const $ = cheerio.load(html);

    it("parses as HTML with <html> and <body>", () => {
      assert.equal($("html").length, 1, "expected exactly one <html> element");
      assert.equal($("body").length, 1, "expected exactly one <body> element");
    });

    it("has exactly one <h1>", () => {
      assert.equal($("h1").length, 1, `found ${$("h1").length} <h1> elements`);
    });

    it("<h1> is the first heading on the page", () => {
      assert.equal($("h1, h2, h3, h4, h5, h6").first().prop("tagName"), "H1");
    });

    it("heading hierarchy does not skip levels", () => {
      const levels = $("h1, h2, h3, h4, h5, h6")
        .map((_, el) => Number(el.tagName.slice(1)))
        .get();
      for (let i = 1; i < levels.length; i++) {
        assert.ok(
          levels[i] <= levels[i - 1] + 1,
          `heading <h${levels[i]}> skips a level (previous was h${levels[i - 1]})`,
        );
      }
    });

    it("has no duplicate id attributes", () => {
      const ids = $("[id]")
        .map((_, el) => $(el).attr("id"))
        .get();
      const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
      assert.deepEqual(duplicates, [], `duplicate ids: ${duplicates.join(", ")}`);
    });

    it("same-page anchors point at an existing id", () => {
      const broken = $('a[href^="#"]')
        .map((_, el) => $(el).attr("href"))
        .get()
        .filter((href) => href.length > 1)
        .filter(
          (href) => $(`[id="${decodeURIComponent(href.slice(1))}"]`).length === 0,
        );
      assert.deepEqual(broken, [], `broken anchors: ${broken.join(", ")}`);
    });

    it('target="_blank" links have rel="noopener noreferrer"', () => {
      const unsafe = $('a[target="_blank"]')
        .filter((_, el) => {
          const rel = ($(el).attr("rel") || "").split(/\s+/);
          return !rel.includes("noopener") || !rel.includes("noreferrer");
        })
        .map((_, el) => $(el).attr("href"))
        .get();
      assert.deepEqual(unsafe, [], `unsafe target="_blank": ${unsafe.join(", ")}`);
    });

    it("every <img> has an alt attribute", () => {
      const missing = $("img")
        .filter((_, el) => $(el).attr("alt") === undefined)
        .map((_, el) => $(el).attr("src") || "(no src)")
        .get();
      assert.deepEqual(missing, [], `images missing alt: ${missing.join(", ")}`);
    });

    it("every <img> with an empty alt has a visible text label", () => {
      const unlabelled = $("img")
        .filter(
          (_, el) =>
            $(el).attr("alt").trim() === "" && $(el).parent().text().trim() === "",
        )
        .map((_, el) => $(el).attr("src") || "(no src)")
        .get();
      assert.deepEqual(
        unlabelled,
        [],
        `decorative images without a label: ${unlabelled.join(", ")}`,
      );
    });

    it("labelled tech icons use an empty alt so labels aren't read twice", () => {
      const redundant = $("img.icon")
        .filter((_, el) => $(el).attr("alt") !== "")
        .map((_, el) => $(el).attr("src"))
        .get();
      assert.deepEqual(
        redundant,
        [],
        `icons with redundant alt text: ${redundant.join(", ")}`,
      );
    });

    it("internal links resolve to a built file", () => {
      const broken = [];
      $("a[href]").each((_, el) => {
        const href = $(el).attr("href");
        if (
          !href ||
          href.startsWith("#") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:")
        )
          return;
        if (/^https?:\/\//.test(href)) return;
        if (!href.startsWith("/")) return;
        const target = resolveInternalRef(href);
        if (!fs.existsSync(target)) broken.push(href);
      });
      assert.deepEqual(
        broken,
        [],
        `broken internal links: ${broken.join(", ")}`,
      );
    });

    it("contains no development-only hostnames", () => {
      for (const host of FORBIDDEN_HOSTS) {
        assert.ok(
          !html.includes(host),
          `HTML contains forbidden host: ${host}`,
        );
      }
    });
  });
}
