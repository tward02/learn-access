import React, { useState, useEffect } from "react";
import "./styles.css";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes
//adapted from https://blog.logrocket.com/how-to-create-custom-toast-component-react/, Title: How to create a custom toast component with React, Author: Uzochukwu Eddie Odozi, Accessed 10/03/2025

const ToastMessage = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return <div className={`toast ${type}`} data-testid={"toast-" + type}>{message}</div>;
};

export default function App() {
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
