const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const {
  AUTHOR,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  CV_PATH,
  PAGE_FILES,
  loadPage,
} = require("../site");

const MENU_ITEMS = [
  { label: "HOME", href: "/", target: undefined, rel: undefined },
  { label: "ABOUT", href: "/about/", target: undefined, rel: undefined },
  { label: "CONTACT", href: "/contact/", target: undefined, rel: undefined },
  {
    label: "CV",
    href: CV_PATH,
    target: undefined,
    rel: "noopener noreferrer",
  },
];

describe("navigation", () => {
  for (const file of PAGE_FILES) {
    it(`${file} renders every menu item as expected`, () => {
      const $ = loadPage(file);
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
    href: GITHUB_URL,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    label: "CV",
    href: CV_PATH,
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
  for (const file of PAGE_FILES) {
    it(`${file} renders the copyright and every footer link`, () => {
      const $ = loadPage(file);

      assert.match(
        $("footer span").text(),
        new RegExp(`^© \\d{4} ${AUTHOR}$`),
      );
      assert.deepEqual(linksIn($, "footer a"), FOOTER_LINKS);
    });
  }
});

describe("contact page", () => {
  it("links to email, GitHub and LinkedIn", () => {
    const $ = loadPage("contact/index.html");

    assert.deepEqual(
      linksIn($, "main a").map(({ label, href }) => ({ label, href })),
      [
        { label: EMAIL, href: `mailto:${EMAIL}` },
        { label: "GitHub", href: GITHUB_URL },
        { label: "LinkedIn", href: LINKEDIN_URL },
      ],
    );
  });
});
