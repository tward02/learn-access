import express from "express";
import puppeteer from "puppeteer";
import { exec } from "child_process";
import util from "util";
import fs from "fs/promises";

const execPromise = util.promisify(exec);
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        }
        next();
    });
}

async function fetchTestFromDB(testId) {
    return `test("renders greeting text", async () => {
        const { page, browser } = await renderPage(
            \`export default function App() { return <h1 class="greeting">Hello world</h1>; } ReactDOM.createRoot(document.getElementById('root')).render(<App />);\`,
            \`.greeting { color: red; }\`
        );
        const text = await page.evaluate(() => document.querySelector(".greeting")?.textContent);
        expect(text).toBe("Hello world");
        await browser.close();
    });`;
}

app.post("/learn-access/test", async (req, res) => {
    try {
        const { testId } = req.body;
        const testCode = await fetchTestFromDB(testId);
        const testFilePath = "./tempTest.test.js";
        await fs.writeFile(testFilePath, `
            const { renderPage } = require("./testRunner");
            const { test, expect } = require("@jest/globals");
            
            ${testCode}
        `);
        const { stdout, stderr } = await execPromise(`npx jest ${testFilePath} --json`);
        await fs.unlink(testFilePath);
        return res.json({ success: true, results: JSON.parse(stdout), error: stderr });
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
});

app.listen(4000, () => console.log("Jest Test Runner running on port 4000"));

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        }
        next();
    });
}

