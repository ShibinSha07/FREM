import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../lib/api';

const AddFireman = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fid: '',
        name: '',
        contact: '',
        rank: '',
        status: 'Off-Duty',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/fireman/`, formData)
            if (response.status === 201) {
                setFormData({ fid: '', name: '', contact: '', rank: '', status: 'Off-Duty' });
                alert('Fireman Successfully Added!');
                navigate(-1)
            } else {
                console.error('Failed to add fireman');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='p-6'>
            <p className='text-2xl font-bold text-center mb-4'>Add New Fireman</p>

            <form onSubmit={handleSubmit} className='mx-auto bg-white p-6 shadow-lg rounded-lg space-y-4'>
                <div className='grid grid-cols-3 gap-4'>
                    <div>
                        <label className='block font-semibold mb-1'>Fireman ID</label>
                        <input
                            type='text'
                            name='fid'
                            value={formData.fid}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter fireman ID'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Name</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter fireman name'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Age</label>
                        <input
                            type='number'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter age'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Address</label>
                        <input
                            type='text'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter address'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>State</label>
                        <input
                            type='text'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter State'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>District</label>
                        <input
                            type='text'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter district'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Contact</label>
                        <input
                            type='tel'
                            name='contact'
                            value={formData.contact}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter contact number'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Email</label>
                        <input
                            type='text'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter email'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Blood Group</label>
                        <input
                            type='text'
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter Blood group'
                        />
                    </div>

                    <div>
                        <label className='block font-semibold mb-1'>Rank</label>
                        <input
                            type='text'
                            name='rank'
                            value={formData.rank}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter Blood group'
                        />
                    </div>
                </div>

                <div className='flex justify-around'>
                    <button type='button' onClick={() => navigate(-1)} className='w-96 bg-gray-400 text-white font-semibold p-2 rounded hover:bg-gray-500'>
                        Cancel
                    </button>
                    <button type='submit' className='w-96 bg-orange-500 text-white font-semibold p-2 rounded hover:bg-orange-600'>
                        Add Fireman
                    </button>
                </div>
            </form>

        </div>
    );
};

export default AddFireman;
