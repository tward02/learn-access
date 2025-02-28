import { test, expect } from "@playwright/test";
import React from "react";


const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

.skip-link {
    position: absolute;
    top: -40px;
    left: 10px;
    background: black;
    color: white;
    padding: 8px;
    z-index: 100;
    text-decoration: none;
}

.skip-link:focus {
    top: 10px;
}

.navbar {
    background-color: #333;
    padding: 10px;
}

.navbar ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 20px;
}

.navbar a {
    color: white;
    text-decoration: none;
}

main {
    padding: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

            </style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
            const {useRef} = React;
                function App() {
                    
                    const mainHeadingRef = useRef(null);
                    
                    function handleSkipClick(event) {
    event.preventDefault(); // Prevent default anchor behavior
    mainHeadingRef.current?.focus();
  }
                    
    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li><button onClick={handleSkipClick}>
                Skip to Content
            </button></li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <main>
                <h1>Welcome to Our Site</h1>
                <label htmlFor="main-input">Here is some content you can skip to.</label>
                <input ref={mainHeadingRef} title="main-input" id="main-input" name="main-input"></input>
            </main>
        </div>
    )
}
                ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Skip link should be first item tabbed to on page and keyboard navigable", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    await page.keyboard.press("Tab");

    const skipLink = page.getByText("Skip to Content");
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    await page.keyboard.press("Enter");

    const mainContent = page.getByTitle("main-input")
    await expect(mainContent).toBeFocused();
});

test("Pressing the skip link should focus on the input field", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    const skipLink = page.getByText("Skip to Content");

    await skipLink.click();

    const mainContent = page.getByTitle("main-input")
    await expect(mainContent).toBeFocused();
});
