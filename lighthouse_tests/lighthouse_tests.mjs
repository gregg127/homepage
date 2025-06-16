import fs from 'fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import path from 'path';
import { execSync } from 'child_process';

// Helper function to sanitize the URL for the file name
function sanitizeUrl(url) {
    return url.replace(/[:\/]/g, '_');
}

// Helper function to generate a timestamp in YYYY-MM-DD-HH-MM-SS format
function generateTimestamp() {
    const date = new Date();
    return date.toISOString().replace(/T/, '-').replace(/:/g, '-').split('.')[0];
}

// Helper function to ensure the directory exists
function ensureDirectoryExistence(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Helper function to create the file path with sanitized URL, tag, and timestamp
function createFilePath(url, tagDir, tag) {
    const sanitizedUrl = sanitizeUrl(url);
    const timestamp = generateTimestamp();
    return path.join(tagDir, `${sanitizedUrl}-${tag}-${timestamp}.html`);
}

// Function to get the latest tag for the current commit
function getTag() {
    try {
        // Get the latest tag on the current commit
        const tag = execSync('git describe --tags --abbrev=0').toString().trim();
        return tag;
    } catch (error) {
        console.error("Error getting the tag from Git:", error);
        return "no-tag"; // Fallback if no tag is found
    }
}

// Function to run Lighthouse and save the result
async function runLighthouse(url, tagDir, tag) {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = { 
        logLevel: 'info', 
        output: 'html', 
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], 
        port: chrome.port 
    };

    const runnerResult = await lighthouse(url, options);
    const filePath = createFilePath(url, tagDir, tag);

    // Write the report to the file
    fs.writeFileSync(filePath, runnerResult.report);
    await chrome.kill();
}

// Main function to execute Lighthouse tests for all URLs
async function runLighthouseTests() {
    const host = "https://golebiowski.dev";
    const paths = ["/", "/about/", "/resume/", "/contact/"];
    const urls = paths.map(path => `${host}${path}`);
    
    // Get the current tag from the latest commit
    const tag = getTag();

    // Use the tag as the directory name
    const tagDir = path.join(path.resolve(), 'lighthouse_tests', 'results', tag);
    
    // Ensure the tag directory exists
    ensureDirectoryExistence(tagDir);

    for (const url of urls) {
        console.log(`Running Lighthouse for ${url}`);
        await runLighthouse(url, tagDir, tag);
    }
}

// Run the Lighthouse tests
runLighthouseTests().catch(console.error);