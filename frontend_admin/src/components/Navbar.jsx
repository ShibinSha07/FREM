import React from 'react';
import logo from '../assets/fire_logo.png';
import profile from '../assets/icon_profile.png';

const Navbar = () => {

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white shadow-md">

                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <img src={logo} alt="Emergency Services Logo" className="w-10 h-10" />
                                <span className="ml-3 text-xl font-bold text-orange-600 md:block">
                                    FREM
                                </span>
                            </div>
                        </div>

                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 hidden md:block">
                            Fire and Rescue Emergency Management
                        </h1>

                        <div className="hidden md:flex items-center space-x-6">
                            <div className="relative">
                                <img
                                    src={profile}
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full border-2 border-orange-400 cursor-pointer hover:border-orange-600 transition"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </nav>


        </>
    );
};

export default Navbar;