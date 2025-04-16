import "./styles.css";

import React, {useRef} from 'react'

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself

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
                    <li>
                        <button onClick={handleSkipClick}>
                            Skip to Content
                        </button>
                    </li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <main>
                <h1 className={"title"}>Welcome to a Website</h1>
                <p>Here is some not very relevant information</p>
                <label className={"inputLabel"} htmlFor="mainInput">Input Data Here:</label>
                <input ref={mainHeadingRef} id="mainInput" placeholder="skip to this input"></input>
            </main>
        </div>
    )
}

export default App;
