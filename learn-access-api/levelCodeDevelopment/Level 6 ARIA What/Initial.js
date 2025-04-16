import React from "react";
import "./styles.css";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes

export default function App() {
    return (
        <div>
            <div className="navbar">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div className="title">
                <h1>Website Banner</h1>
            </div>
            <div className="container">
                <div>
                    <h2>Welcome</h2>
                    <p>This is some main content the webpage displays...</p>
                </div>
                <div>
                    <p>This is some more content that is different from the stuff above.</p>
                </div>
            </div>
            <div className="footer">
                <p>Made by someone in React</p>
            </div>
        </div>
    );
}
