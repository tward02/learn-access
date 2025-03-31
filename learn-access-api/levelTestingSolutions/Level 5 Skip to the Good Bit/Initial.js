import React from "react";
import "./styles.css";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes

export default function App() {

    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <main>
                <h1>Welcome to Our Site</h1>
                <label htmlFor="main-input">Here is some content you can skip to.</label>
                <input title="main-input" id="main-input" name="main-input" placeholder="skip to this input"></input>
            </main>
        </div>
    )
}
