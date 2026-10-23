const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { JSDOM, VirtualConsole } = require("jsdom");
const axeSource = fs.readFileSync(require.resolve("axe-core"), "utf8");

const silentConsole = new VirtualConsole();
silentConsole.on("jsdomError", () => {});

const { PAGE_FILES, readPage } = require("../site");

const IMPACT_LEVELS = ["moderate", "serious", "critical"];

const runAxe = async (html) => {
  const dom = new JSDOM(html, {
    runScripts: "outside-only",
    pretendToBeVisual: true,
    virtualConsole: silentConsole,
  });
  const { window } = dom;
  window.eval(axeSource);
  const results = await window.axe.run(window.document, {
    resultTypes: ["violations"],
  });
  dom.window.close();
  return results.violations;
};

const formatViolations = (violations) =>
  violations
    .map((v) => {
      const targets = v.nodes.map((n) => n.target.join(" ")).join("; ");
      return `  [${v.impact}] ${v.id}: ${v.help}\n    targets: ${targets}\n    help: ${v.helpUrl}`;
    })
    .join("\n");

for (const file of PAGE_FILES) {
  describe(`accessibility: ${file}`, () => {
    let allViolations;

    before(async () => {
      allViolations = await runAxe(readPage(file));
    });

    for (const impact of IMPACT_LEVELS) {
      it(`has no ${impact} axe violations`, () => {
        const matched = allViolations.filter((v) => v.impact === impact);
        assert.equal(
          matched.length,
          0,
          `${matched.length} ${impact} violation(s) in ${file}:\n${formatViolations(matched)}`,
        );
      });
    }
  });
}
