import { test, expect } from "@playwright/test";

//IMPORTANT - Actual tests are stored and retrieved from database - this is just here for testing and development purposes

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.dropdownButton {
    padding: 12px 20px;
    font-size: 20px;
    cursor: pointer;
    background-color: blue;
    color: white;
    border: 1px solid black;
}

.dropdownButton:hover {
    background-color: lightblue;
}

.dropdownBox {
    position: relative;
}

.dropdown {
    list-style: none;
    padding: 0;
    margin: 10px 0 0;
    background: white;
    border: 1px solid grey;
    border-radius: 6px;
    position: absolute;
    min-width: 120px;
}

.dropdown li {
    padding: 10px;
}

.dropdown li a {
    text-decoration: none;
    color: black;
}

.dropdown li:hover {
    background-color: lightgrey;
}
            </style>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
            <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                       const { useRef, useState, useEffect } = React;

function App() {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const firstItem = menuRef.current?.querySelector("a");
            firstItem?.focus();
        }
    }, [isOpen]);

    const handleKeyDown = (event) => {
        if (!isOpen) return;

        const menuItems = menuRef.current ? Array.from(menuRef.current.querySelectorAll("a")) : [];
        const currentIndex = menuItems.indexOf(document.activeElement);

        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                const nextIndex = (currentIndex + 1) % menuItems.length;
                menuItems[nextIndex]?.focus();
                break;
            case "ArrowUp":
                event.preventDefault();
                const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
                menuItems[prevIndex]?.focus();
                break;
            case "Escape":
                setIsOpen(false);
                buttonRef.current?.focus();
                break;
            default:
                break;
        }
    };

    const items = ["Option 1", "Option 2", "Option 3"];

    return (
        <div className="container">
            <button
                ref={buttonRef}
                className="dropdownButton"
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                Dropdown
            </button>
            {isOpen && (
                <ul ref={menuRef} className="dropdown" onKeyDown={handleKeyDown} tabIndex={-1}>
                    {items.map((item, index) => (
                        <li role="menuitem" key={index}>
                            <a aria-label={item} href={"#option" + index}>{item}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
                     ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
            </script>
        </body>
</html>
`

test("Dropdown menu should be fully keyboard navigable", async ({ page }) => {
    await page.setContent(getPlaywrightRender())

    const menuButton = page.getByText("Dropdown");

    await menuButton.focus();
    await page.keyboard.press("Enter");

    const menuItems = await page.locator("ul li a");
    await expect(menuItems).toHaveCount(3);

    await menuItems.nth(0).focus();
    await expect(menuItems.nth(0)).toBeFocused();
    await expect(menuItems.nth(0)).toHaveText("Option 1");

    await page.keyboard.press("ArrowDown");
    await expect(menuItems.nth(1)).toBeFocused();
    await expect(menuItems.nth(1)).toHaveText("Option 2");

    await page.keyboard.press("ArrowDown");
    await expect(menuItems.nth(2)).toBeFocused();
    await expect(menuItems.nth(2)).toHaveText("Option 3");

    await page.keyboard.press("ArrowUp");
    await expect(menuItems.nth(1)).toBeFocused();
    await expect(menuItems.nth(1)).toHaveText("Option 2");

    await page.keyboard.press("Escape");
    await expect(menuButton).toBeFocused();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await menuButton.focus();
    await page.keyboard.press("Space");
});
