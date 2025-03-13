import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import axios from 'axios';
import { API_URL } from '../lib/api';

const Vehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get(`${API_URL}/vehicles/`);
                setVehicles(response.data);
            } catch (error) {
                console.error("Error fetching vehicles", error);
            }
        };
        fetchVehicles();
    }, []);

    const updateStatus = async (vid, newStatus) => {
        try {
            await axios.put(`${API_URL}/vehicles/${vid}`, { status: newStatus });
            setVehicles(prevVehicles =>
                prevVehicles.map(vehicle =>
                    vehicle.vid === vid ? { ...vehicle, status: newStatus } : vehicle
                )
            );
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    const filteredVehicles = vehicles.filter(vehicle =>
        statusFilter === "All" ? true : vehicle.status === statusFilter
    );

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold text-center'>Vehicles</h1>

            <div className='flex items-center justify-between mb-4'>
                <select
                    className='w-48 border border-gray-500 p-2 rounded-md'
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Available">Available</option>
                    <option value="Maintenance">Maintenance</option>
                </select>

                <Link to='/add-vehicle' className='bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600'>
                    Add Vehicle
                </Link>
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full border-collapse text-center border border-gray-300'>
                    <thead>
                        <tr className='bg-gray-300 border-b border-gray-300'>
                            <th className='px-4 py-4'>Number Plate</th>
                            <th className='px-4 py-4'>Model</th>
                            <th className='px-4 py-4'>Year of Manufacturing</th>
                            <th className='px-4 py-4'>Status</th>
                            <th className='px-4 py-4'>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.length > 0 ? (
                            filteredVehicles.map(vehicle => (
                                <tr key={vehicle.vid} className='border-b border-gray-300 hover:bg-gray-200'>
                                    <td className='px-4 py-4'>{vehicle.number_plate}</td>
                                    <td className='px-4 py-4'>{vehicle.model}</td>
                                    <td className='px-4 py-4'>{vehicle.yom}</td>
                                    <td className={`px-4 py-4 font-bold ${
                                        vehicle.status === "Available" ? "text-green-500" : "text-red-600"
                                    }`}>
                                        {vehicle.status}
                                    </td>
                                    <td className='px-4 py-4 flex justify-center items-center'>
                                        {vehicle.status === "Maintenance" ? (
                                            <CgMathPlus
                                                className='text-green-500 text-2xl cursor-pointer bg-gray-300 rounded-sm'
                                                onClick={() => updateStatus(vehicle.vid, "Available")}
                                            />
                                        ) : (
                                            <CgMathMinus
                                                className='text-red-500 text-2xl cursor-pointer bg-gray-300 rounded-sm'
                                                onClick={() => updateStatus(vehicle.vid, "Maintenance")}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='5' className='text-center py-4'>No vehicles found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Vehicle;