// Serves public/ with Node built-ins only, so it runs inside the Playwright
// container regardless of which OS the host's node_modules were installed on
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { PUBLIC_DIR } = require("../site.js");

const PORT = Number(process.env.PORT ?? 9000);

const CONTENT_TYPES = {
  ".css": "text/css",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript",
  ".json": "application/json",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".webmanifest": "application/manifest+json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
};

const resolveFile = (urlPath) => {
  const file = path.join(PUBLIC_DIR, decodeURIComponent(urlPath));
  if (!file.startsWith(PUBLIC_DIR)) return null;
  const stat = fs.statSync(file, { throwIfNoEntry: false });
  if (stat?.isFile()) return file;
  if (stat?.isDirectory()) return resolveFile(path.join(urlPath, "index.html"));
  return null;
};

const send = (res, status, file) => {
  res.writeHead(status, {
    "Content-Type":
      CONTENT_TYPES[path.extname(file)] ?? "application/octet-stream",
  });
  fs.createReadStream(file).pipe(res);
};

http
  .createServer((req, res) => {
    const file = resolveFile(new URL(req.url, "http://localhost").pathname);
    if (file) send(res, 200, file);
    else send(res, 404, path.join(PUBLIC_DIR, "404.html"));
  })
  .listen(PORT, () => console.log(`Serving ${PUBLIC_DIR} on port ${PORT}`));
