import React, {useState} from "react";
import "./styles.css";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes
//Idea and some code adapted from https://kaderbiral26.medium.com/building-a-custom-dropdown-component-in-react-step-by-step-e12f4330fb58, Title: Building a Custom Dropdown Component in React, Author: Kader Biral, Organisation: Medium, Accessed 04/03/2025

export default function App() {

    const [isOpen, setIsOpen] = useState(false);

    const items = ["Option 1", "Option 2", "Option 3"];

    return (
        <div className="container">
            <main className={"dropdownBox"}>
                <button className="dropdownButton" onClick={() => setIsOpen(!isOpen)}>Dropdown</button>
                {isOpen && <ul className="dropdown">
                    {items.map((item, index) => (
                        <li key={index}><a href={"#option" + index}>{item}</a></li>
                    ))}
                </ul>}
            </main>
        </div>
    );
}
