import React, { useRef, useState, useEffect } from "react";
import "./styles.css";

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

export default function App() {
    const items = ["Option 1", "Option 2", "Option 3"];

    return (
        <div className="container">
            <nav role="navigation" className="navbar">
                <DropDown items={items} />
            </nav>
        </div>
    );
}
