import "./styles.css";
import React, {useRef, useEffect} from 'react';

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes
//canvas from https://www.w3schools.com/graphics/canvas_rectangles.asp

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
                <h2>Sales Dashboard</h2>
                <button className="settings"><img src="/public/settings.svg" /></button>
            </header>

            <div>
                <ul>
                    <li><a href="#analytics">View More Graphs</a></li>
                    <li><a href="#reports">View Sales Reports Data</a></li>
                </ul>
            </div>

            <div>
                <h3>Sales Statistics</h3>
                <p>This is a dashboard about sales stats</p>
                <canvas data-testid="canvas" ref={chartRef} id="chart"></canvas>
                <button>Refresh</button>
            </div>

            <section>
                <h4>Types:</h4>
                <ul>
                    <li><span>Blue</span>: Projected sales</li>
                    <li><span>Red</span>: Actual sales</li>
                </ul>
            </section>

            <div>Made by someone in React</div>
        </div>
    );
}
