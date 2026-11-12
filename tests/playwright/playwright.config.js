const fs = require("node:fs");
const { defineConfig, devices } = require("@playwright/test");
const { version } = require("@playwright/test/package.json");

const IMAGE_VERSION = fs
  .readFileSync(`${__dirname}/Dockerfile`, "utf8")
  .match(/mcr\.microsoft\.com\/playwright:v([\d.]+)-/)?.[1];
if (IMAGE_VERSION !== version) {
  throw new Error(
    `@playwright/test is ${version} but tests/playwright/Dockerfile uses the ` +
      `v${IMAGE_VERSION} image; keep them on the same version`,
  );
}

module.exports = defineConfig({
  testDir: ".",
  outputDir: "../../test-results/playwright",
  snapshotPathTemplate: "{testDir}/screenshots/{projectName}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://homepage",
    locale: "en-US",
    timezoneId: "UTC",
    colorScheme: "light",
    reducedMotion: "reduce",
    launchOptions: {
      args: [
        "--force-color-profile=srgb",
        "--font-render-hinting=none",
        "--disable-lcd-text",
      ],
    },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
