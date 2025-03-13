import React, { useState } from 'react'
import logo from '../assets/fire_logo.png'
import profile from '../assets/icon_profile.png'
import Sidebar from './Sidebar';
import { CgMenu } from 'react-icons/cg';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='flex justify-between border-b border-orange-400  items-center p-4 mb-4'>
                <div className='flex items-center space-x-4'>
                    <CgMenu   
                        className='text-2xl font-bold'
                        onClick={() => setIsOpen(true)}
                    />
                    <img src={logo} alt="logo" className='w-10 h-10' />
                </div>
                <p className='text-3xl font-bold text-orange-600'>Fire and Rescue Emergency Management</p>
                <img src={profile} alt='profile' className='w-8 h-8' />
            </div>

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}

export default Navbar