import { test, expect } from "@playwright/test";
import React, {useState} from "react";
import AxeBuilder from '@axe-core/playwright';

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
body {
    font-family: Arial, sans-serif;
}

.app {
    text-align: center;
    padding: 50px;
}

.appContrast {
    background-color: green;
    padding: 50px;
    text-align: center;
}

/* High Contrast Mode */
.high-contrast {
    background-color: black;
    color: yellow;
}

.toggle-contrast {
    margin-top: 20px;
    background-color: blue;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}

.title {
    color: black;
}

.contrastTitle {
    color: white;
}

            </style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
            const { useState} = React;
                function App() {
    const [highContrast, setHighContrast] = useState(false);

    function toggleContrast() {
        setHighContrast(!highContrast);
    }

    return (
        <div className={highContrast ? "appContrast" : "app"}>
            <h1 className={highContrast ? "contrastTitle" : "title"}>Color Contrast Challenge</h1>
            <button
                className={highContrast ? "high-contrast" : "toggle-contrast"}
                onClick={toggleContrast}
                aria-label="Toggle high contrast mode"
            >Toggle High Contrast</button>
        </div>
    );
}

                ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Initial UI should have no colour contrast issues", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    const filtered = accessibilityScanResults.violations.filter((item) => item.id === "color-contrast")

    expect(filtered).toEqual([]);
});

test("Button should toggle high contrast mode, which should be different from the original UI", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    await page.screenshot({ path: "screenshots/default-state.png" });

    const button = page.getByText("Toggle High Contrast");
    const title = await page.getByText("Color Contrast Challenge");

    const titleColour = await title.evaluate(el => getComputedStyle(el).color);
    const buttonBackground = await button.evaluate(el => getComputedStyle(el).backgroundColor);
    const buttonColour = await button.evaluate(el => getComputedStyle(el).color);

    await button.click();

    await page.screenshot({ path: "screenshots/high-contrast.png" });

    const newTitleColour = await title.evaluate(el => getComputedStyle(el).color);
    const newButtonBackground = await button.evaluate(el => getComputedStyle(el).backgroundColor);
    const newButtonColour = await button.evaluate(el => getComputedStyle(el).color);

    expect(await page.locator("button").screenshot()).not.toEqual("screenshots/default-state.png");
    expect(titleColour).not.toEqual(newTitleColour);
    expect(buttonBackground).not.toEqual(newButtonBackground);
    expect(buttonColour).not.toEqual(newButtonColour);
});

test("High contrast mode should also meet the accessibility requirements", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    await page.getByText("Toggle High Contrast").click();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    const filtered = accessibilityScanResults.violations.filter((item) => item.id === "color-contrast")

    expect(filtered).toEqual([]);
});
