import { test, expect } from '@playwright/test';
import React from "react";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes
const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>

            </style>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                function App() {
                    return <h1 style={{color: "#00f"}}>I love WCAG!</h1>
                }
                ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test('Expect h1 element to be blue rgb(0, 0, 255)', async ({ page }) => {

    await page.setContent(getPlaywrightRender());

    await page.waitForSelector('h1');

    const element = await page.locator('h1');
    await expect(element).toHaveCSS('color', 'rgb(0, 0, 255)');
    const classCount = await element.evaluate(el => el.classList.length);
    expect(classCount).toBeLessThanOrEqual(1);
    const color = await element.evaluate(el => getComputedStyle(el).color);

    expect(color).toBe('rgb(0, 0, 255)');
});
