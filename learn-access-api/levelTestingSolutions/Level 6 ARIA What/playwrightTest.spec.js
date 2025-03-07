import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";
import React from "react";
import fs from "fs-extra";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import path from "path";

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                body, h1, h2, p, ul, li, a {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

body {
    background-color: #f4f4f4;
    color: #333;
    line-height: 1.6;
    padding: 20px;
}

.headerContent, .navigationContent, .mainContent, .footerContent {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.headerContent {
    background: #0044cc;
    color: white;
    text-align: center;
    padding: 20px;
    font-size: 1.5rem;
    font-weight: bold;
}

.navigationContent {
    background: #eaeaea;
    padding: 15px;
    text-align: center;
    margin-top: 10px;
}

.navigationContent ul {
    list-style: none;
}

.navigationContent ul li {
    display: inline;
    margin: 0 15px;
}

.navigationContent ul li a {
    text-decoration: none;
    color: #0044cc;
    font-weight: bold;
}

.navigationContent ul li a:hover,
.navigationContent ul li a:focus {
    text-decoration: underline;
}

.mainContent {
    padding: 25px;
    background: white;
    margin-top: 10px;
}

h2 {
    color: #0044cc;
}

.footerContent {
    background: #222;
    color: white;
    text-align: center;
    padding: 15px;
    margin-top: 10px;
}

a, button {
    transition: outline 0.2s ease-in-out;
}

a:focus, button:focus {
    outline: 3px solid #ffcc00;
    background: #fffbcc;
}

            </style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                       function App() {
    return (
        <div>
            <header className="headerContent" role="banner">
                <h1>Website Title</h1>
            </header>
            <nav className="navigationContent" role="navigation">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <main className="mainContent" role="main">
                <section>
                    <h2>Welcome</h2>
                    <p>This is the main content area.</p>
                </section>
            </main>
            <footer className="footerContent" role="contentinfo">
                <p>© 2024 Company Name</p>
            </footer>
        </div>
    );
}
                     ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Page has no accessibility issues due to roles", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    await injectAxe(page);
    await checkA11y(page, null, { runOnly: ["wcag2a", "wcag2aa"] });
});


test("Ensure page layout does not change visually", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    const screenshotPath = "screenshots/Level6Page.png";
    const tempScreenshotPath = path.join(__dirname , "temp-layout.png");

    await page.screenshot({ path: tempScreenshotPath });

    if (!fs.existsSync(screenshotPath)) {
        throw new Error(`Baseline screenshot not found: ${screenshotPath}`);
    }

    const baselineImage = PNG.sync.read(fs.readFileSync(screenshotPath));
    const newImage = PNG.sync.read(fs.readFileSync(tempScreenshotPath));

    expect(baselineImage.width).toBe(newImage.width);
    expect(baselineImage.height).toBe(newImage.height);

    const diff = new PNG({ width: baselineImage.width, height: baselineImage.height });
    const pixelDiff = pixelmatch(
        baselineImage.data,
        newImage.data,
        diff.data,
        baselineImage.width,
        baselineImage.height,
        { threshold: 0.1 }
    );

    expect(pixelDiff).toBe(0);
});
