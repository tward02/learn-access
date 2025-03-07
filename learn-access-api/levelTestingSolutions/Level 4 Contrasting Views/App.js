import React, { useState } from "react";
import "./styles.css";

function App() {
    const [highContrast, setHighContrast] = useState(false);

    function toggleContrast() {
        setHighContrast(!highContrast);
    }

    return (
        <div className={highContrast ? "appContrast" : "app"}>
            <h1>Color Contrast Challenge</h1>
            <button
                className={highContrast ? "high-contrast" : "toggle-contrast"}
                onClick={toggleContrast}
                aria-label="Toggle high contrast mode"
            >
                Toggle High Contrast
            </button>
        </div>
    );
}

export default App;
