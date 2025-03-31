import {useState} from "react";

//IMPORTANT - Actual initial level code is stored in the database, this is just here for testing and development purposes

const DropDown = ({items}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>☰ Menu</button>
            {isOpen && <ul className="dropdown">
                {items.map((item, index) => (
                    <li key={index}><a href={"#option" + index}>{item}</a></li>
                ))}
            </ul>}
        </>
    )
}

export default function App() {

    const items = ["Option 1", "Option 2", "Option 3"];

    return (
        <div className="container">
            <nav className="navbar">
                <DropDown items={items}/>
            </nav>
        </div>
    );
}
