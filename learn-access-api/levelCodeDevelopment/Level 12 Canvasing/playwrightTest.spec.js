import {test, expect} from "@playwright/test";
import React, {useEffect, useRef} from "react";
import AxeBuilder from "@axe-core/playwright";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
button {
    background: black;
    color: white;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
}

.settings {
    background: none;
    border: none;
}

p {
    color: black;
}

canvas {
    width: 300px;
    height: 150px;
    border: 1px solid #ccc;
}

img {
    width: 20px;
}

            </style>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
const {useRef, useEffect} = React;

function App() {

    const chartRef = useRef(null);

    useEffect(() => {
        const canvas = chartRef.current;
        const ctx = canvas?.getContext("2d");

        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "red";
        ctx.fillRect(50, 50, 30, 100);
        ctx.fillStyle = "blue";
        ctx.fillRect(80, 60, 30, 90);
        ctx.fillStyle = "red";
        ctx.fillRect(110, 50, 30, 100);
        ctx.fillStyle = "blue";
        ctx.fillRect(140, 60, 30, 90);
        ctx.fillStyle = "red";
        ctx.fillRect(170, 50, 30, 100);
        ctx.fillStyle = "blue";
        ctx.fillRect(200, 60, 30, 90);
    }, []);

    return (
        <div className="dashboard">
            <header>
                <h1>Sales Dashboard</h1>
                <button className="settings" aria-label="Open Settings">
                    <img src="/public/settings.svg" alt="Settings" />
                </button>
            </header>

            <nav role="navigation">
                <ul>
                    <li><a href="#moreGraphs">View More Graphs</a></li>
                    <li><a href="#reportsData">View Sales Reports Data</a></li>
                </ul>
            </nav>

            <main id="main-content">
                <h2>Sales Statistics</h2>
                <p>This is a dashboard about sales stats</p>
                <canvas data-testid="canvas" ref={chartRef} id="chart" aria-label="Sales data over the past year"></canvas>
                <button aria-label="Refresh Data">Refresh</button>
            </main>

            <aside>
                <h2>Types:</h2>
                <ul>
                    <li><span role="alert" aria-label="Warning">Blue</span>: Projected sales</li>
                    <li><span role="status" aria-label="Information">Red</span>: Actual sales</li>
                </ul>
            </aside>

            <footer role="contentinfo">
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

test("Ensures there are no accessibility issues on the page and the canvas is made accessible correctly", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    const results = [];

    accessibilityScanResults.violations.forEach(violation => {
        const nodes = violation.nodes;
        nodes.forEach((node) => {
            const result = node.html + " : " + node.failureSummary + " : " + violation.description;
            results.push(result);
        })
    })

    expect(results).toEqual([]);
});
