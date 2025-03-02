import React from "react";
import "./styles.css";

export default function App() {
    return (
        <div>
            <div className="headerContent">
                <h1>Website Title</h1>
            </div>
            <div className="navigationContent">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div className="mainContent">
                <div>
                    <h2>Welcome</h2>
                    <p>This is the main content area.</p>
                </div>
            </div>
            <div className="footerContent">
                <p>© 2024 Company Name</p>
            </div>
        </div>
    );
}
