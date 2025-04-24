import { test, expect } from "@playwright/test";
import React, {useRef} from "react";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
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

.title {
    border-bottom: 1px solid grey;
}


.container {
    padding: 20px;
}

.inputLabel {
    display: block;
    margin-bottom: 5px;
}

            </style>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
            const {useRef} = React;
                function App() {

    const mainHeadingRef = useRef(null);

    function handleSkipClick(event) {
        event.preventDefault();
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
                <h1 className={"title"}>Welcome to Our Site</h1>
                <p>Here is some not very relevant information</p>
                <label className={"inputLabel"} htmlFor="mainInput">Input Data Here:</label>
                <input ref={mainHeadingRef} id="mainInput" placeholder="skip to this input"></input>
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

    const skipButton = page.getByText("Skip to Content");
    await expect(skipButton).toBeFocused();
    await expect(skipButton).toBeVisible();

    await page.keyboard.press("Enter");

    const mainInput = page.getByPlaceholder("skip to this input")
    await expect(mainInput).toBeFocused();
});

test("Pressing the skip link should focus on the input field", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    const skipButton = page.getByText("Skip to Content");

    await skipButton.click();

    const mainInput = page.getByPlaceholder("skip to this input")
    await expect(mainInput).toBeFocused();
});
