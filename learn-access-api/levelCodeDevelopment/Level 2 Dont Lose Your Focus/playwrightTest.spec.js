import { test, expect } from "@playwright/test";
import React, {useEffect, useRef, useState} from "react";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
.container {
    text-align: center;
    padding: 50px;
}

.modalButton {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
}

.modalBackground {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
}
            </style>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
const { useState, useRef, useEffect } = React;
function App() {
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
                    <button ref={closeButtonRef} className={"modalButton"} onClick={handleModalClose}>Close Modal</button>
                </div>
            </div>}
        </div>
    );
};
                ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("User can open and close modal with Tab and Enter correctly", async ({ page }) => {

    await page.setContent(getPlaywrightRender());

    const openButton = page.getByText("Open Modal");
    await page.keyboard.press("Tab");
    await expect(openButton).toBeFocused();
    await page.keyboard.press("Enter");

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press("Enter");

    await expect(modal).not.toBeVisible();

    await expect(openButton).toBeFocused();
});

test("User can open and close modal with Tab and Enter and Escape correctly", async ({ page }) => {

    await page.setContent(getPlaywrightRender());

    const openButton = page.getByText("Open Modal");
    await page.keyboard.press("Tab");
    await expect(openButton).toBeFocused();
    await page.keyboard.press("Enter");

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(modal).not.toBeVisible();

    await expect(openButton).toBeFocused();
});
