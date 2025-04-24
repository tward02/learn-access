import React from "react";
import "./styles.css";

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself

export default function App() {
    return (
        <div>
            <header className="header">
                <h1>Website Name</h1>
            </header>

            <nav className={"navbar"} aria-label="Main Navigation">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            <main className="mainContent">
                <h1>Welcome</h1>
                <p>This is some main content the webpage displays...</p>
                <img src="/public/cat.svg" alt="A cat meow"/>

                <button onClick={() => console.log("Meow")}>Cat Button</button>


                <form>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name"/>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email"/>

                    <button type="submit">Submit</button>
                </form>
            </main>
            <footer className="footer">
                <p className={"footer"}>Made by someone in React</p>
            </footer>
        </div>
    );
}
