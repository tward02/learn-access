import { test, expect } from "@playwright/test";
import React from "react";

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                body {
    font-family: Arial, sans-serif;
}

.app {
    text-align: center;
    padding: 50px;
}

button {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
}

.modal-overlay {
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

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}
            </style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
const { useState, useRef, useEffect } = React;
function Modal(props) {
  const { isOpen, onClose } = props;
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus trap: When modal opens, move focus to the close button
  useEffect(function () {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Handle Escape key to close the modal and trap focus within modal
  useEffect(function () {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
      // Optional: Add custom Tab/Shift+Tab focus trapping logic here if needed.
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

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
}

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openButtonRef = useRef(null);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    // Restore focus to the button that opened the modal
    if (openButtonRef.current) {
      openButtonRef.current.focus();
    }
  }

  return (
    <div className="app">
      <button ref={openButtonRef} onClick={openModal}>
        Open Modal
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
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
