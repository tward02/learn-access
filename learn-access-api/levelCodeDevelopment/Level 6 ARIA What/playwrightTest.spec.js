import {test, expect} from "@playwright/test";
import {injectAxe, checkA11y} from "axe-playwright";
import React from "react";
import fs from "fs-extra";
import pixelmatch from "pixelmatch";
import {PNG} from "pngjs";
import path from "path";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                .navbar {
    background-color: #333;
    padding: 10px;
}

.navbar ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 20px;
}

.navbar a {
    color: white;
    text-decoration: none;
}

.container {
    padding: 20px;
}

.title {
    background: lightblue;
    padding: 0 0 0 20px;
    display: flex;
}

.footer {
    border-top: 1px solid grey;
}

            </style>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                       function App() {
    return (
        <div>
            <nav className="navbar" role="navigation">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <header className="title" role="banner">
                <h1>Website Banner</h1>
            </header>
            <main className="container" role="main">
                <section>
                    <h2>Welcome</h2>
                    <p>This is some main content the webpage displays...</p>
                </section>
                <section>
                    <p>This is some more content that is different from the stuff above.</p>
                </section>
            </main>
            <footer className="footer" role="contentinfo">
                <p>Made by someone in React</p>
            </footer>
        </div>
    );
}
                     ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Page has no accessibility issues due to roles", async ({page}) => {
    await page.setContent(getPlaywrightRender());

    await injectAxe(page);
    await checkA11y(page, null, {runOnly: ["wcag2a", "wcag2aa"]});
});


test("Ensure page layout does not change visually", async ({page}) => {
    //Adapted from https://shiv-jirwankar.medium.com/visual-ui-testing-using-pixelmatch-library-and-playwright-1ead6d615a43
    await page.setContent(getPlaywrightRender());

    const screenshotPath = "screenshots/Level6Page.png";
    const tempScreenshotPath = path.join(__dirname, "temp.png");

    await page.screenshot({path: tempScreenshotPath});

    if (!fs.existsSync(screenshotPath)) {
        throw new Error(`Baseline screenshot not found: ${screenshotPath}`);
    }

    const expectedImage = PNG.sync.read(fs.readFileSync(screenshotPath));
    const actualImage = PNG.sync.read(fs.readFileSync(tempScreenshotPath));

    expect(expectedImage.width).toBe(actualImage.width);
    expect(expectedImage.height).toBe(actualImage.height);

    const diff = new PNG({width: expectedImage.width, height: expectedImage.height});
    const pixelDiff = pixelmatch(
        expectedImage.data,
        actualImage.data,
        diff.data,
        expectedImage.width,
        expectedImage.height,
        {threshold: 0.1}
    );

    expect(pixelDiff).toBe(0);
});
