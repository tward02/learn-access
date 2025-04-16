import React from "react";
import {useState, useRef, useEffect} from "react";
import "./styles.css";

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself
//inspired and adapted from https://legacy.reactjs.org/docs/accessibility.html

export default function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const openButtonRef = useRef(null);
    const closeButtonRef = useRef(null);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        openButtonRef.current.focus();
    };

    useEffect(() => {
        if (modalOpen) {
            closeButtonRef.current.focus();
        }
    }, [modalOpen]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                handleModalClose();
            }
        };

        if (modalOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [modalOpen, handleModalClose]);

    return (
        <div className="container">
            <button ref={openButtonRef} className={"modalButton"} onClick={handleModalOpen}>
                Open Modal
            </button>
            {modalOpen && <div className="modalBackground" role="dialog" aria-modal="true">
                <div className="modal">
                    <h2>Accessible Modal</h2>
                    <p>Press Escape to close or use Tab to navigate.</p>
                    <button ref={closeButtonRef} className={"modalButton"} onClick={handleModalClose}>Close Modal
                    </button>
                </div>
            </div>}
        </div>
    );
};
