import React, { useState } from 'react';
import logo from '../assets/fire_logo.png';
import profile from '../assets/icon_profile.png';
import { CgMenu } from 'react-icons/cg';
import { IoMdClose } from 'react-icons/io';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and title - desktop */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img src={logo} alt="Emergency Services Logo" className="w-10 h-10" />
                <span className="ml-3 text-xl font-semibold text-orange-600 hidden md:block">
                  Fire & Rescue
                </span>
              </div>
            </div>

            {/* Center title - desktop */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 hidden md:block">
              Emergency Management <span className="text-orange-600">System</span>
            </h1>

            {/* Desktop navigation links */}
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