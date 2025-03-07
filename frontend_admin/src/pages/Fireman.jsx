import React from 'react'
import { Link } from 'react-router-dom'
import { CgMathPlus } from "react-icons/cg";

const Fireman = () => {
    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold text-center'>Fireman</h1>
            <Link to='/add-fireman'>
                <CgMathPlus className="text-3xl cursor-pointer bg-green-500 rounded-md p-1"/>
            </Link>
        </div>
    )
}

export default Fireman
