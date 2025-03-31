import React from "react";
import "./styles.css";

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself

function App() {
    return (
        <div>
            <header className="headerContent" role="banner">
                <h1>Website Title</h1>
            </header>
            <nav className="navigationContent" role="navigation">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <main className="mainContent" role="main">
                <section>
                    <h2>Welcome</h2>
                    <p>This is the main content area.</p>
                </section>
            </main>
            <footer className="footerContent" role="contentinfo">
                <p>© 2024 Company Name</p>
            </footer>
        </div>
    );
}

export default App;
