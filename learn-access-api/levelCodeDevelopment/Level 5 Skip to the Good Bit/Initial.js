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
            <main className={"container"}>
                <h1 className={"title"}>Welcome to a Website</h1>
                <p>Here is some not very relevant information</p>
                <label className={"inputLabel"} htmlFor="mainInput">Input Data Here:</label>
                <input id="mainInput" placeholder="skip to this input"></input>
            </main>
        </div>
    )
}
