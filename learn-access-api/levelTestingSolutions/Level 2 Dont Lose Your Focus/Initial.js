import { useState, useRef } from "react";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes

function Modal(props) {
    const { isOpen, onClose } = props;
    // TODO: Add focus management logic when the modal is open

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-content">
                <h2>Accessible Modal</h2>
                <p>Press Escape to close or use Tab to navigate.</p>
                <button onClick={onClose}>Close Modal</button>
            </div>
        </div>
    );
}

export default function App() {
    const [isModalOpen, setModalOpen] = useState(false);

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        // TODO: Restore focus to the opening button after closing the modal
    }

    //TODO manage keyboard navigation

    return (
        <div className="app">
            <button onClick={openModal}>
                Open Modal
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}
