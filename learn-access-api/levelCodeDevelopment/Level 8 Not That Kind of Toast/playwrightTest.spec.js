import {test, expect} from "@playwright/test";
import React, {useEffect, useRef, useState} from "react";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
               .container {
    text-align: center;

}

button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 20px;
    border-radius: 10px;
    color: white;
    background-color: blue;
}

.messageDisplay {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 50px;
}

.toast {
    padding: 15px;
    border-radius: 10px;
    color: white;
    font-size: 18px;
    display: flex;
    align-items: center;
    min-width: 250px;
    max-width: 350px;
}

.toast:focus {
    outline: 2px solid grey;
}

.info {
    background-color: blue;
}

.success {
    background-color: green;
}

.error {
    background-color: red;
}

.toast button {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    margin-left: 15px;
}


            </style>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                     const { useState, useEffect, useRef } = React;

const ToastMessage = ({ message, type, onClose }) => {
    const toastRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            ref={toastRef}
            className={"toast " + type}
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

                     ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Can use keyboard to dismiss toast", async ({page}) => {
    await page.setContent(getPlaywrightRender());

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    const toast = await page.getByTestId('toast-info');
    expect(toast).toBeVisible();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    expect(toast).not.toBeVisible();

    await page.keyboard.press("Enter");
});

test("Toasts should be the correct colours", async ({page}) => {
    await page.setContent(getPlaywrightRender());

    const info = await page.getByText("Show Info Message");
    await info.click();

    const infoToast = await page.waitForSelector('[data-testid="toast-info"]');
    const infoColor = await infoToast.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(infoColor).toBe("rgb(0, 0, 255)");

    const success = await page.getByText("Show Success Message");
    await success.click();

    const successToast = await page.waitForSelector('[data-testid="toast-success"]');
    const successColor = await successToast.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(successColor).toBe("rgb(0, 128, 0)");

    const error = await page.getByText("Show Error Message");
    await error.click();

    const errorToast = await page.waitForSelector('[data-testid="toast-error"]');
    const errorColor = await errorToast.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(errorColor).toBe("rgb(255, 0, 0)");
});

