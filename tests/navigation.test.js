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

const FOOTER_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/gregg127",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/grzegorz-golebiowski",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    label: "CV",
    href: "/Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf",
    target: undefined,
    rel: undefined,
  },
  { label: "Privacy Policy", href: "/privacy", target: undefined, rel: undefined },
];

const linksIn = ($, selector) =>
  $(selector)
    .map((_, el) => ({
      label: $(el).text().trim(),
      href: $(el).attr("href"),
      target: $(el).attr("target"),
      rel: $(el).attr("rel"),
    }))
    .get();

describe("footer", () => {
  for (const file of PAGES) {
    it(`${file} renders the copyright and every footer link`, () => {
      const $ = cheerio.load(
        fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8"),
      );

      assert.match(
        $("footer span").text(),
        /^© \d{4} Grzegorz Gołębiowski$/,
      );
      assert.deepEqual(linksIn($, "footer a"), FOOTER_LINKS);
    });
  }
});

describe("contact page", () => {
  it("links to email, GitHub and LinkedIn", () => {
    const $ = cheerio.load(
      fs.readFileSync(path.join(PUBLIC_DIR, "contact/index.html"), "utf8"),
    );

    assert.deepEqual(
      linksIn($, "main a").map(({ label, href }) => ({ label, href })),
      [
        {
          label: "grzegorz.golebiowski127@gmail.com",
          href: "mailto:grzegorz.golebiowski127@gmail.com",
        },
        { label: "GitHub", href: "https://github.com/gregg127" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/grzegorz-golebiowski",
        },
      ],
    );
  });
});
