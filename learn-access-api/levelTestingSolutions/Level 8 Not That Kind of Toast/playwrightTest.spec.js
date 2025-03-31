import {test, expect} from "@playwright/test";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                .container {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
}

button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
}

.toast-container {
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
    border-radius: 5px;
    color: white;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 250px;
    max-width: 350px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    outline: none;
}

.toast:focus {
    outline: 2px solid #ffffff;
}

.info {
    background-color: #007bff;
}

.success {
    background-color: #28a745;
}

.error {
    background-color: #dc3545;
}

.toast button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
}


            </style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                     const { useState, useEffect, useRef } = React;

const Toast = ({ message, type, onClose }) => {
    const toastRef = useRef(null);

    useEffect(() => {
        toastRef.current?.focus();
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
        setToasts([...toasts, { id: Date.now(), message, type }]);
    };

    return (
        <div className="container">
            <h1>Accessible Toast Notifications</h1>
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
                     ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Can use keyboard to dismiss toast", async ({page}) => {
    await page.setContent(getPlaywrightRender());

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    const toast = await page.getByText("Info message");
    expect(toast).toBeVisible();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    expect(toast).not.toBeVisible();

    await page.keyboard.press("Enter");
});

test("Toasts should be the correct colours", async ({page}) => {
    await page.setContent(getPlaywrightRender());

    await page.click('text="Show Info Toast"');
    const infoToast = await page.waitForSelector('[data-testid="toast-info"]');
    const infoColor = await infoToast.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(infoColor).toBe("rgb(0, 123, 255)");

    await page.click('text="Show Success Toast"');
    const successToast = await page.waitForSelector('[data-testid="toast-success"]');
    const successColor = await successToast.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(successColor).toBe("rgb(40, 167, 69)");

    await page.click('text="Show Error Toast"');
    const errorToast = await page.waitForSelector('[data-testid="toast-error"]');
    const errorColor = await errorToast.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(errorColor).toBe("rgb(220, 53, 69)");
});

