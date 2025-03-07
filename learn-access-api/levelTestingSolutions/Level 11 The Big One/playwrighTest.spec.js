import {test, expect} from "@playwright/test";
import React from "react";
import AxeBuilder from "@axe-core/playwright";

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    color: #222;
}

.header {
    background-color: #0055aa;
    color: white;
    padding: 10px;
    text-align: center;
}

nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 10px;
}

nav a {
    text-decoration: none;
    color: #0055aa;
    font-weight: bold;
}

.main-content {
    padding: 20px;
}

button {
    background-color: #0055aa;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
}

.footer {
    text-align: center;
    padding: 10px;
    background-color: #222;
    color: white;
}

            </style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                    function App() {
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
                <img src="/public/cat.svg" alt="A cute rabbit yawning" />

                <button onClick={() => alert("Clicked!")}>Click Me</button>
            

            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />

                <button type="submit">Submit</button>
            </form>
            </main>
            

            <footer className="footer">
                <p>© 2025 My Website</p>
            </footer>
        </div>
    );
}

                     ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Ensures there are no accessibility issues on the page", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    const results = [];

    accessibilityScanResults.violations.forEach(violation => {
        const nodes = violation.nodes;
        nodes.forEach((node) => {
            const result = node.html + " : " + node.failureSummary + " : " + violation.description;
            results.push(result);
        })
    })

    expect(results).toEqual([]);
});
