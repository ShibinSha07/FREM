import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { API_URL } from '../lib/api';
import axios from 'axios'

const Fireman = () => {

    const [fireman, setFireman] = useState([])
    const [statusFilter, setStatusFilter] = useState("All")

    useEffect(() => {
        const fetchFireman = async () => {
            try {
                const response = await axios.get(`${API_URL}/fireman`)
                setFireman(response.data);
            } catch (error) {
                console.error("error in fetching fireman", error)
            }
        }

        fetchFireman();
    }, [])

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`${API_URL}/fireman/${id}`, { status: newStatus })
            setFireman(prevFireman =>
                prevFireman.map(f =>
                    f.id === id ? { ...f, status: newStatus } : f
                )
            )
        } catch (error) {
            console.error("Error updating status", error)
        }
    }

    const filteredFireman = fireman.filter(fireman =>
        statusFilter === "All" ? true : fireman.status === statusFilter
    )
    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold text-center'>Fireman</h1>

            <div className="flex items-center justify-between mb-4">
                <select
                    className="w-48 border border-gray-500 p-2 rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="On-Duty">On-Duty</option>
                    <option value="Off-Duty">Off-Duty</option>
                </select>

                <Link to='/add-fireman' className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600">
                    Add Fireman
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center border border-gray-300">
                    <thead>
                        <tr className="bg-gray-300 border-b border-gray-300">
                            <th className="px-4 py-4">FID</th>
                            <th className="px-4 py-4">Name</th>
                            <th className="px-4 py-4">Contact</th>
                            <th className="px-4 py-4">Status</th>
                            <th className="px-4 py-4">Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFireman.length > 0 ? (
                            filteredFireman.map(fireman => (
                                <tr key={fireman.id} className="border-b border-gray-300 hover:bg-gray-200">
                                    <td className="px-4 py-4">{fireman.fid}</td>
                                    <td className="px-4 py-4">{fireman.name}</td>
                                    <td className="px-4 py-4">{fireman.contact}</td>
                                    <td className={`px-4 py-4 ${fireman.status === "On-Duty" ? "text-green-500 font-bold" : "text-red-600 font-bold"}`}>
                                        {fireman.status}
                                    </td>
                                    <td className="px-4 py-4 flex justify-center items-center">
                                        {fireman.status === "Off-Duty" ? (
                                            <CgMathPlus
                                                className="text-green-500 text-2xl cursor-pointer bg-gray-300"
                                                onClick={() => updateStatus(fireman.id, "On-Duty")}
                                            />
                                        ) : (
                                            <CgMathMinus
                                                className="text-red-500 text-2xl cursor-pointer bg-gray-300 "
                                                onClick={() => updateStatus(fireman.id, "Off-Duty")}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No firemen found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Fireman
