import React, { useState, useEffect } from "react";
import "./styles.css";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return <div className={`toast ${type}`} data-testid={"toast-" + type}>{message}</div>;
};

export default function App() {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "info") => {
        setToasts([...toasts, { id: Date.now(), message, type }]);
    };

    return (
        <div className="container">
            <h1>Toast Notifications</h1>
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
