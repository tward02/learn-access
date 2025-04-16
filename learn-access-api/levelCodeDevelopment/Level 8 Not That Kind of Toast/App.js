import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself

const ToastMessage = ({ message, type, onClose }) => {
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
        setToasts([...toasts, { id: Math.random().toString(16).slice(2), message, type }]);
    };

    return (
        <div className="container">
            <h1>Toast Notifications</h1>
            <button onClick={() => showToast("Info message", "info")}>Show Info Message</button>
            <button onClick={() => showToast("Success message", "success")}>Show Success Message</button>
            <button onClick={() => showToast("Error message", "error")}>Show Error Message</button>

            <div className="messageDisplay">
                {toasts.map((toast) => (
                    <ToastMessage
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
