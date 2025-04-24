import {test, expect} from "@playwright/test";
import React from "react";
import AxeBuilder from "@axe-core/playwright";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
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

.mainContent {
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
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                    function App() {
    return (
        <div>
            <header className="header">
                <h1>Website Name</h1>
            </header>

            <nav aria-label="Main Navigation">
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
                     ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Ensures there are no accessibility issues on the page", async ({page}) => {
    await page.setContent(getPlaywrightRender());

    const accessibilityScanResults = await new AxeBuilder({page}).analyze();

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
