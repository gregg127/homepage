const { test, expect } = require("@playwright/test");
const { PAGES } = require("../site.js");

const THEMES = ["light", "dark"];
// The footer renders the current year; pin it so references don't expire every January
const FIXED_TIME = new Date("2026-06-01T12:00:00Z");

for (const { file, pathname } of PAGES) {
  const name = file.replace(/(\/index)?\.html$/, "");

  for (const theme of THEMES) {
    test(`${name} in ${theme} theme`, async ({ page }) => {
      await page.clock.setFixedTime(FIXED_TIME);
      await page.addInitScript((value) => {
        window.localStorage.setItem("theme", value);
      }, theme);
      await page.goto(pathname ?? `/${file}`);

      // ThemeButton renders only after hydration, once the stored theme is applied
      const otherTheme = theme === "light" ? "dark" : "light";
      await expect(
        page.getByRole("button", { name: `switch to ${otherTheme} theme` }),
      ).toBeVisible();
      await page.evaluate(() => document.fonts.ready);

      await expect(page).toHaveScreenshot(`${name}-${theme}.png`, {
        fullPage: true,
        mask: [page.locator("video")],
      });
    });
  }
}
