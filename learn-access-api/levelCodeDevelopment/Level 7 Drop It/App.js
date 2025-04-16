import React, {useRef, useState, useEffect} from "react";
import "./styles.css";

//IMPORTANT - this is just a model solution for testing purposes, this code doesn't actually run and isn't used the application itself

export default function App() {

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
