import "./styles.css";
import React, {useEffect, useRef} from "react";

export default function App() {

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
