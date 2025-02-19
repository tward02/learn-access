import { test, expect } from '@playwright/test';
import React from "react";

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                h1 {
                    color: blue;
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
                    return <h1>I love WCAG!</h1>
                }
                ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test('Expect h1 element to be blue and it to be the only styling effecting the element', async ({ page }) => {

    await page.setContent(getPlaywrightRender());

    await page.waitForSelector('h1');

    const element = await page.locator('h1');
    await expect(element).toHaveCSS('color', 'rgb(0, 0, 255)');
    const classCount = await element.evaluate(el => el.classList.length);
    expect(classCount).toBeLessThanOrEqual(1);

    const onlyInlineColorApplied = await element.evaluate(el => {
        return el.style.length === 1 && el.style.color === 'blue';
    });

    const onlyClassColorApplied = await element.evaluate(el => {
        if (el.style.length > 0) return false;

        const className = el.classList[0];
        if (!className) return false;

        for (const sheet of document.styleSheets) {
            for (const rule of sheet.cssRules) {
                if (rule.selectorText === `.${className}`) {
                    return rule.style.length === 1 && rule.style.color === 'blue';
                }
            }
        }
        return false;
    });

    const onlyElementSelectorApplied = await element.evaluate(el => {
        if (el.style.length > 0 || el.classList.length > 0) return false;

        for (const sheet of document.styleSheets) {
            for (const rule of sheet.cssRules) {
                if (rule.selectorText === 'h1') {
                    return rule.style.length === 1 && rule.style.color === 'blue';
                }
            }
        }
        return false;
    });

    expect(onlyInlineColorApplied || onlyClassColorApplied || onlyElementSelectorApplied).toBe(true);
});
