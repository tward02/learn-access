import { test, expect } from "@playwright/test";
import React, {useState} from "react";

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

.app {
    max-width: 400px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.error {
    color: red;
    margin-bottom: 10px;
    font-weight: bold;
}
            </style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
            const {useState} = React;
                function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function validateEmail(emailValue) {
        // A basic email validation regex for demonstration.
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return emailRegex.test(emailValue);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Simple form validation logic.
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (password.trim() === "") {
            setError("Password cannot be empty.");
            return;
        }

        // If validation passes, clear the error.
        setError("");
        // TODO: Proceed with form submission (e.g., call an API)
        console.log("Form submitted:", { email, password });
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-describedby="emailHelp"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && (
                <div role="alert" className="error">
                    {error}
                </div>
            )}
            <button type="submit">Login</button>
        </form>
    );
}

function App() {
    return (
        <div className="app">
            <h1>Accessible Login Form</h1>
            <LoginForm />
        </div>
    );
}
                ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Login form displays labels correctly associated with inputs", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    // Check that the email input has an accessible name "Email:" and is linked to the label.
    const emailInput = page.getByRole("textbox", { name: "Email:" });
    await expect(emailInput).toBeVisible();

    // Check that the password input has an accessible name "Password:".
    const passwordInput = page.getByRole("textbox", { name: "Password:" }).or(page.getByLabel("Password:"));
    await expect(passwordInput).toBeVisible();

    // Optionally, check the label text directly.
    const emailLabel = await page.locator('label[for="email"]');
    await expect(emailLabel).toHaveText("Email:");
    const passwordLabel = await page.locator('label[for="password"]');
    await expect(passwordLabel).toHaveText("Password:");
});

test("Login form displays error for invalid email", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    // Enter invalid email and a valid password
    await page.fill('input[name="email"]', "invalidEmail");
    await page.fill('input[name="password"]', "mypassword");
    await page.click("button[type='submit']");

    // Check error message is visible
    const error = page.locator('[role="alert"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(/please enter a valid email address/i);
});

test("Login form displays error for empty password", async ({ page }) => {
    await page.setContent(getPlaywrightRender());

    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "");
    await page.click("button[type='submit']");

    const error = page.locator('[role="alert"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(/password cannot be empty/i);
});
