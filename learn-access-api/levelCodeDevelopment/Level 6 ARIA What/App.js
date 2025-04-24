import React from "react";
import "./styles.css";

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself

export default function App() {
    return (
        <div>
            <nav className="navbar" role="navigation">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <header className="title" role="banner">
                <h1>Website Banner</h1>
            </header>
            <main className="container" role="main">
                <section>
                    <h2>Welcome</h2>
                    <p>This is some main content the webpage displays...</p>
                </section>
                <section>
                    <p>This is some more content that is different from the stuff above.</p>
                </section>
            </main>
            <footer className="footer" role="contentinfo">
                <p>Made by someone in React</p>
            </footer>
        </div>
    );
}
