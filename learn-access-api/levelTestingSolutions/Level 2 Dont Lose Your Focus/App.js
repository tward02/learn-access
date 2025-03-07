import React from "react";
import { useState, useRef, useEffect } from "react";
import "./styles.css";

const Modal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);

    // Focus trap: Moves focus inside modal when opened
    useEffect(() => {
        if (isOpen) {
            closeButtonRef.current.focus();
        }
    }, [isOpen]);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-content" ref={modalRef}>
                <h2>Accessible Modal</h2>
                <p>Press Escape to close or use Tab to navigate.</p>
                <button ref={closeButtonRef} onClick={onClose}>
                    Close Modal
                </button>
            </div>
        </div>
    );
};

const App = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openButtonRef = useRef(null);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        openButtonRef.current.focus(); // Restore focus
    };

    return (
        <div className="app">
            <button ref={openButtonRef} onClick={openModal}>
                Open Modal
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default App;
