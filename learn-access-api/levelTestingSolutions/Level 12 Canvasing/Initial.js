import "./styles.css";
import React, {useRef, useEffect} from 'react';

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
                <h2>Dashboard</h2>
                <button><img src="/public/settings.svg" /></button>
            </header>

            <div>
                <ul>
                    <li><a href="#analytics">View Analytics</a></li>
                    <li><a href="#reports">Download Reports</a></li>
                </ul>
            </div>

            <div>
                <h3>Statistics</h3>
                <p>This is a dashboard about the stats!</p>
                <canvas data-testid="canvas" ref={chartRef} id="chart"></canvas>
                <button>🔄</button>
            </div>

            <aside>
                <h4>Notifications</h4>
                <ul>
                    <li><span>⚠</span> Alert: System Update Required</li>
                    <li><span>ℹ</span> Info: New Report Available</li>
                </ul>
            </aside>

            <div>© 2025 Dashboard</div>
        </div>
    );
}
