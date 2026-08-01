const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const cheerio = require("cheerio");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

const PAGES = [
  "index.html",
  "about/index.html",
  "contact/index.html",
  "404.html",
  "privacy/index.html",
];

const MENU_ITEMS = [
  { label: "HOME", href: "/", target: undefined, rel: undefined },
  { label: "ABOUT", href: "/about/", target: undefined, rel: undefined },
  { label: "CONTACT", href: "/contact/", target: undefined, rel: undefined },
  {
    label: "CV",
    href: "/Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

describe("navigation", () => {
  for (const file of PAGES) {
    it(`${file} renders every menu item as expected`, () => {
      const $ = cheerio.load(
        fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8"),
      );
      const links = $("nav a")
        .map((_, el) => ({
          label: $(el).text().trim(),
          href: $(el).attr("href"),
          target: $(el).attr("target"),
          rel: $(el).attr("rel"),
        }))
        .get();

      assert.deepEqual(links, MENU_ITEMS);
    });
  }
});
