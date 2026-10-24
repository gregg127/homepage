FROM mcr.microsoft.com/playwright:v1.64.1-noble
WORKDIR /app
COPY playwright/package.json playwright/package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY site.js ./tests/
COPY playwright/Dockerfile playwright/playwright.config.js playwright/screenshots.spec.js ./tests/playwright/
WORKDIR /app/tests/playwright
