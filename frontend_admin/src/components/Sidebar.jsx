import React from 'react'
import { CgClose } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import imageSrc from '../assets/gov_logobg.png'

const Sidebar = () => {

    const menuItems = [
        { item: "Home", path: "/" },
        { item: "Fireman", path: "/fireman" },
        { item: "Fire Vehicle", path: "/vehicle" },
        { item: "Record", path: "/record" }
    ]

    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-orange-200 shadow-lg transform transition-transform duration-300 ease-in-out`}
        >
            <div className="flex justify-center p-8">
                <img src={imageSrc} alt="Description" className="w-48" />
            </div>

            <div className='flex justify-center'>
                <ul className="space-y-4">
                    {menuItems.map((menuItem, index) => (
                        <li key={index} className="cursor-pointer hover:font-semibold">
                            <Link to={menuItem.path} onClick={() => setIsOpen(false)}>
                                {menuItem.item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
