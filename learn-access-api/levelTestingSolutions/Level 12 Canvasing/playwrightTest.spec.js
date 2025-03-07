import {test, expect} from "@playwright/test";
import React, {useEffect, useRef} from "react";
import AxeBuilder from "@axe-core/playwright";

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                body {
    font-family: Arial, sans-serif;
}

button {
    background: #007BFF;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
}

p {
    color: black;
}

canvas {
    width: 300px;
    height: 150px;
    border: 1px solid #ccc;
}

.skip-link {
    position: absolute;
    top: -40px;
    left: 10px;
    background: #000;
    color: white;
    padding: 5px;
}

.skip-link:focus {
    top: 10px;
}

img {
    width: 20px;
}



            </style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
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
        ctx.fillRect(50, 50, 100, 100);

        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(200, 100, 50, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "green";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(50, 200);
        ctx.lineTo(250, 200);
        ctx.stroke();
    }, []);

    return (
        <div className="dashboard">
            <header>
                <h1>Dashboard</h1>
                <button aria-label="Open Settings">
                    <img src="/public/settings.svg" alt="Settings" />
                </button>
            </header>

            <nav role="navigation">
                <ul>
                    <li><a href="#analytics">View Analytics</a></li>
                    <li><a href="#reports">Download Reports</a></li>
                </ul>
            </nav>

            <main id="main-content">
                <h2>Statistics</h2>
                <p>This is a dashboard about the stats!</p>
                <canvas data-testid="canvas" ref={chartRef} id="chart" aria-label="Sales data over the past year"></canvas>
                <button aria-label="Refresh Data">🔄</button>
            </main>

            <aside>
                <h2>Notifications</h2>
                <ul>
                    <li><span role="alert" aria-label="Warning">⚠</span>Alert: System Update Required</li>
                    <li><span role="status" aria-label="Information">ℹ</span>Info: New Report Available</li>
                </ul>
            </aside>

            <footer role="contentinfo">
                <p>© 2025 Dashboard</p>
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