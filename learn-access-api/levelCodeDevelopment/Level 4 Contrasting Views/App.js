import React, {useState} from "react";
import "./styles.css";

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself

function App() {
    const [highContrast, setHighContrast] = useState(false);

    function toggleContrast() {
        setHighContrast(!highContrast);
    }

    return (
        <div className={highContrast ? "appContrast" : "container"}>
            <h1 className={highContrast ? "contrastTitle" : "title"}>Color Contrast Challenge</h1>
            <button
                className={highContrast ? "highContrast" : "toggleButton"}
                onClick={toggleContrast}
                aria-label="Toggle high contrast mode"
            >Toggle High Contrast
            </button>
        </div>
    );
}

export default App;
