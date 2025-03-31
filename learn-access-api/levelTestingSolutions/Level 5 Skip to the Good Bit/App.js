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
                    <li><button onClick={handleSkipClick}>
                        Skip to Content
                    </button></li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <main>
                <h1>Welcome to Our Site</h1>
                <label htmlFor="main-input">Here is some content you can skip to.</label>
                <input ref={mainHeadingRef} title="main-input" id="main-input" name="main-input"></input>
            </main>
        </div>
    )
}

export default App;
