import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        // TODO: Validate the form fields. If invalid, set an error message.
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {/* TODO: Associate each input with a label */}
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

