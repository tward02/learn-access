import "./styles.css";
import React, {useEffect, useRef} from "react";

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself

export default function App() {

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
