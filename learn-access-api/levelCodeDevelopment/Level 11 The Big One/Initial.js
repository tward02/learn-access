import React from "react";
import "./styles.css";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes

export default function App() {
    return (
        <div>
            <div className="header">Website Name</div>
            <div className={"navbar"}>
                <ul>
                    <li><span>Home</span></li>
                    <li><span>About</span></li>
                    <li><span>Contact</span></li>
                </ul>
            </div>
            <div className="mainContent">
                <h3>Welcome</h3>
                <p>This is some main content the webpage displays...</p>
                <img src="/public/cat.svg"/>
                <button onClick="alert('Clicked!')">Cat Button</button>
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
            <p className={"footer"}>Made by someone in React</p>
        </div>
    );
}
