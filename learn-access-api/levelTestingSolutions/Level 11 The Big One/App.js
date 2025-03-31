import React from "react";
import "./styles.css";

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself

export default function App() {
    return (
        <div>
            <header className="header">
                <h1>Welcome to the Site</h1>
            </header>

            <nav aria-label="Main Navigation">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            <main className="main-content">
                <h1>Main Heading</h1>
                <p>Here is some important text.</p>
                <img src="/public/cat.svg" alt="A cute rabbit yawning"/>

                <button onClick={() => alert("Clicked!")}>Click Me</button>


                <form>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name"/>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email"/>

                    <button type="submit">Submit</button>
                </form>
            </main>
            <footer className="footer">
                <p>© 2025 My Website</p>
            </footer>
        </div>
    );
}
