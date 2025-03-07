import React, { useState } from "react";
import "./styles.css";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function validateEmail(emailValue) {
        // A basic email validation regex for demonstration.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Simple form validation logic.
        if (!validateEmail(email)) {
            setError("Invalid Email");
            return;
        }
        if (password.trim() === "") {
            setError("Invalid Password");
            return;
        }

        // If validation passes, clear the error.
        setError("");
        // Proceed with form submission (e.g., call an API)
        console.log("Form submitted:", { email, password });
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                {/* The input id matches the label's htmlFor */}
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
                {/* The input id matches the label's htmlFor */}
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

export default App;
