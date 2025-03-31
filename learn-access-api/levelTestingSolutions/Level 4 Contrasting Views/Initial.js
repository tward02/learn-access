import React from "react";
import "./initial.css";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes

export default function App() {
    return (
        <div className="app">
            <h1 className="title">Color Contrast Challenge</h1>
            <button className="custom-button">{"Toggle High Contrast"}</button>
        </div>
    );
}
