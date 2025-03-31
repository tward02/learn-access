import React from "react";
import "./styles.css";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes

export default function App() {
    return (
        <div>
            <div className="header">Welcome to the Site</div>
            <nav>
                <ul>
                    <li><span>Home</span></li>
                    <li><span>About</span></li>
                    <li><span>Contact</span></li>
                </ul>
            </nav>
            <div className="main-content">
                <h3>Main Heading</h3>
                <p>Here is some important text.</p>
                <img src="/public/cat.svg"/>
                <button onClick="alert('Clicked!')">Click Me</button>
            </div>
            <form>
                <div>
                    <p>Name:</p>
                    <input type="text" placeholder="Name"/>
                    <p>Email:</p>
                    <input type="email"/>
                    <button>Submit</button>
                </div>
            </form>
            <div className="footer">© 2025 My Website</div>
        </div>
    );
}
