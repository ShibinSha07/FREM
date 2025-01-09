import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>this is home screen</h1>
            <Link to='/about'>
                <button >
                    about
                </button>
            </Link>

            <Link to='/contact'>
                <button className='text-2xl'>
                    contact
                </button>
            </Link>
        </div>
    )
}

export default Home
