import React from 'react'
import { CgClose } from 'react-icons/cg'
import { Link } from 'react-router-dom'

const Sidebar = ({ isOpen, setIsOpen }) => {

    const menuItems = [
        { item: "Home", path: "/" },
        { item: "Fireman", path: "/fireman" },
        { item: "Fire Vehicle", path: "/vehicle" }
    ]

    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out`}
        >
            <div className="flex justify-between items-center p-4">
                <p className="text-xl font-bold">Menu</p>
                <CgClose
                    className="text-2xl cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />
            </div>

            <ul className="p-4 space-y-4">
                {menuItems.map((menuItem, index) => (
                    <li key={index} className="cursor-pointer hover:font-semibold">
                        <Link to={menuItem.path} onClick={() => setIsOpen(false)}>
                            {menuItem.item}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
