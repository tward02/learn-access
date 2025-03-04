import { test, expect } from "@playwright/test";

const getPlaywrightRender = () => `
<html lang="en">
        <head>
            <title>test</title>
            <style>
                body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.navbar {
    position: relative;
    background: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-button {
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background 0.3s ease;
}

.menu-button:hover {
    background-color: #0056b3;
}

.dropdown {
    list-style: none;
    padding: 0;
    margin: 10px 0 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    position: absolute;
    width: 150px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown li {
    padding: 10px;
    transition: background 0.2s ease;
}

.dropdown li a {
    text-decoration: none;
    color: black;
    display: block;
}

.dropdown li:hover {
    background-color: #f0f0f0;
}
            </style>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.22.5/babel.min.js"></script>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                       const { useRef, useState, useEffect } = React;

const DropDown = ({ items }) => {
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

    return (
        <>
            <button
                ref={buttonRef}
                className="menu-button"
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                ☰ Menu
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
        </>
    );
};

function App() {
    const items = ["Option 1", "Option 2", "Option 3"];

    return (
        <div className="container">
            <nav role="navigation" className="navbar">
                <DropDown items={items} />
            </nav>
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

    const menuButton = page.getByText("☰ Menu");

    await menuButton.focus();
    await page.keyboard.press("Enter");

    const menuItems = await page.locator("ul li a");
    await expect(menuItems).toHaveCount(3);

    await menuItems.nth(0).focus();
    await expect(menuItems.nth(0)).toBeFocused();
    await expect(menuItems.nth(0)).toHaveText(/Option 1/);

    await page.keyboard.press("ArrowDown");
    await expect(menuItems.nth(1)).toBeFocused();
    await expect(menuItems.nth(1)).toHaveText(/Option 2/);

    await page.keyboard.press("ArrowDown");
    await expect(menuItems.nth(2)).toBeFocused();
    await expect(menuItems.nth(2)).toHaveText(/Option 3/);

    await page.keyboard.press("ArrowUp");
    await expect(menuItems.nth(1)).toBeFocused();
    await expect(menuItems.nth(1)).toHaveText(/Option 2/);

    await page.keyboard.press("Escape");
    await expect(menuButton).toBeFocused();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await menuButton.focus();
    await page.keyboard.press("Space");

    const newMenuItems = await page.locator("ul li a");
    await expect(newMenuItems).toHaveCount(3);
});
