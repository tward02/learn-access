import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const Toast = ({ message, type, onClose }) => {
    const toastRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            ref={toastRef}
            className={`toast ${type}`}
            role="status"
            aria-live={type === "error" ? "assertive" : "polite"}
            data-testid={"toast-" + type}
        >
            <p>{message}</p>
            <button onClick={onClose} aria-label="Close notification">✖</button>
        </div>
    );
};

const App = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "info") => {
        setToasts([...toasts, { id: Date.now(), message, type }]);
    };

    return (
        <div className="container">
            <h1>Accessible Toast Notifications</h1>
            <button onClick={() => showToast("Info message", "info")}>Show Info Toast</button>
            <button onClick={() => showToast("Success message", "success")}>Show Success Toast</button>
            <button onClick={() => showToast("Error message", "error")}>Show Error Toast</button>

            <div className="toast-container">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
