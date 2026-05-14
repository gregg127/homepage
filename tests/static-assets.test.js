const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

const ASSETS = [
  "favicon.svg",
  "Grzegorz-Golebiowski-Java-Tech-Lead-CV.pdf",
  "jin_yang_handshake.mp4",
  "icons/java-svgrepo-com.svg",
  "icons/python-svgrepo-com.svg",
  "icons/clojure-svgrepo-com.svg",
  "icons/spring-svgrepo-com.svg",
  "icons/postgresql-svgrepo-com.svg",
  "icons/kafka-svgrepo-com.svg",
  "icons/docker-svgrepo-com.svg",
  "icons/kubernetes-svgrepo-com.svg",
  "icons/openshift-svgrepo-com.svg",
  "icons/jenkins-svgrepo-com.svg",
  "icons/grafana-svgrepo-com.svg",
  "icons/javascript-svgrepo-com.svg",
  "icons/typescript-svgrepo-com.svg",
  "icons/react-svgrepo-com.svg",
  "icons/linux-svgrepo-com.svg",
  "icons/apple-svgrepo-com.svg",
  "icons/sun-svgrepo-com.svg",
  "icons/moon-svgrepo-com.svg",
];

describe("static assets", () => {
  for (const asset of ASSETS) {
    it(`${asset} exists`, () => {
      assert.ok(
        fs.existsSync(path.join(PUBLIC_DIR, asset)),
        `public/${asset} is missing`,
      );
    });
  }
});
