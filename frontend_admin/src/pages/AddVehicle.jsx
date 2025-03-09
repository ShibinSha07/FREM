import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../lib/api';

const AddVehicle = () => {
    const [formData, setFormData] = useState({
        numberplate: '',
        model: '',
        yom: '',
        status: 'available',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/vehicle/`, formData);
            if (response.status === 201) {
                setFormData({ numberplate: '', model: '', yom: '', status: 'available' });
            } else {
                console.error('Failed to add vehicle');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='p-6'>
            <p className='text-2xl font-bold text-center mb-4'>Add New Vehicle</p>

            <form onSubmit={handleSubmit} className='mx-auto bg-white p-6 shadow-lg rounded-lg space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className='block font-semibold mb-1'>Number Plate</label>
                        <input
                            type='text'
                            name='numberplate'
                            value={formData.numberplate}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter number plate'
                        />
                    </div>
                    
                    <div>
                        <label className='block font-semibold mb-1'>Model</label>
                        <input
                            type='text'
                            name='model'
                            value={formData.model}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter vehicle model'
                        />
                    </div>
                    
                    <div>
                        <label className='block font-semibold mb-1'>Year of Manufacture</label>
                        <input
                            type='number'
                            name='yom'
                            value={formData.yom}
                            onChange={handleChange}
                            required
                            className='w-full p-2 border border-gray-300 rounded'
                            placeholder='Enter year of manufacture'
                        />
                    </div>
                    
                    <div>
                        <label className='block font-semibold mb-1'>Status</label>
                        <select
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded'
                        >
                            <option value='available'>Available</option>
                            <option value='in-use'>In Use</option>
                            <option value='maintenance'>Maintenance</option>
                        </select>
                    </div>
                </div>

                <div className='w-96 bg-orange-500 mx-auto text-center text-white font-semibold p-2 rounded hover:bg-orange-600'>
                    <button type='submit' className='w-full'>Add Vehicle</button>
                </div>
            </form>
        </div>
    );
};

export default AddVehicle;
