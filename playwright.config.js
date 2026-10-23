const fs = require("node:fs");
const { defineConfig, devices } = require("@playwright/test");
const { version } = require("@playwright/test/package.json");

const PORT = 9000;

// Screenshots are only reproducible with the browser build shipped in the image
const IMAGE_VERSION = fs
  .readFileSync(`${__dirname}/docker-compose.yml`, "utf8")
  .match(/mcr\.microsoft\.com\/playwright:v([\d.]+)-/)?.[1];
if (IMAGE_VERSION !== version) {
  throw new Error(
    `@playwright/test is ${version} but docker-compose.yml uses the ` +
      `v${IMAGE_VERSION} image; keep them on the same version`,
  );
}

module.exports = defineConfig({
  testDir: "tests/playwright",
  snapshotPathTemplate: "{testDir}/screenshots/{projectName}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
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
  webServer: {
    command: `node tests/playwright/server.js`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    env: { PORT: String(PORT) },
  },
});
