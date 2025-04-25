import React, {useState} from "react";
import './styles.css';

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes
//Inspired by my own login and registration forms created in the Next App and the tutorial form Next.js https://nextjs.org/docs/app/building-your-application/authentication

export default function App() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log(email + " : " + password)
    }

    return (
        <div className="container">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="formGroup">
                    <label>Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="formGroup">
                    <label>Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
