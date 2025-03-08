import React from 'react'
import { Link } from 'react-router-dom'
import { CgMathPlus } from "react-icons/cg";

const Vehicle = () => {
    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold text-center'>Vehicle</h1>
            <Link to='/add-vehicle'>
                <CgMathPlus className="text-3xl cursor-pointer bg-green-500 rounded-md p-1"/>
            </Link>
        </div>
    )
}

export default Vehicle
