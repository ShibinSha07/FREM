import React, { useState } from 'react'
import logo from '../assets/fire_logo.png'
import profile from '../assets/icon_profile.png'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='flex justify-between border-b border-orange-400 items-center p-4 mb-4'>
                <div className='flex items-center space-x-4'>
                    <AiOutlineMenu
                        className='text-2xl font-bold'
                        onClick={() => setIsOpen(true)}
                    />
                    <img src={logo} alt="logo" className='w-10 h-10' />
                </div>
                <p className='text-2xl font-bold'>Fire and Rescue Emergency Management</p>
                <img src={profile} alt='profile' className='w-8 h-8' />
            </div>

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >
                <div className="flex justify-between items-center p-4">
                    <p className="text-xl font-bold">Menu</p>
                    <AiOutlineClose
                        className="text-2xl cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    />
                </div>
                <ul className="p-4 space-y-4">
                    <li className="cursor-pointer hover:font-semibold">Home</li>
                    <li className="cursor-pointer hover:font-semibold">Contact</li>
                    <li className="cursor-pointer hover:font-semibold">About</li>
                </ul>
            </div>
{/*     
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={() => setIsOpen(false)}
                />
            )} */}
        </>
    )
}

export default Navbar
