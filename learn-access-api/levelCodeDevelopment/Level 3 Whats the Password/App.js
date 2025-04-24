import React, {useState} from "react";
import "./styles.css";

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function validateEmail(emailValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!validateEmail(email)) {
            setError("Invalid Email");
            return;
        }
        if (password.trim() === "") {
            setError("Invalid Password");
            return;
        }

        setError("");
        console.log("Form submitted:", {email, password});
    }

    return (
        <div className="container">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="formGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="formGroup">
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
        </div>
    );
}

export default App;
