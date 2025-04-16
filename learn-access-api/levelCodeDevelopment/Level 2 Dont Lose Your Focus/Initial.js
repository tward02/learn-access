import { useState, useRef } from "react";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes
//inspired and adapted from https://legacy.reactjs.org/docs/accessibility.html

export default function App() {
    const [modalOpen, setModalOpen] = useState(false);

    function handleModalOpen() {
        setModalOpen(true);
    }

    function handleModalClose() {
        setModalOpen(false);
    }

    return (
        <div className="container">
            <button className={"modalButton"} onClick={handleModalOpen}>
                Open Modal
            </button>
            {modalOpen && <div className="modalBackground" role="dialog" aria-modal="true">
                <div className="modal">
                    <h2>Accessible Modal</h2>
                    <p>Press Escape to close or use Tab to navigate.</p>
                    <button className={"modalButton"} onClick={handleModalClose}>Close Modal</button>
                </div>
            </div>}
        </div>
    );
}
