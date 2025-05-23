import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../lib/api';

const AllotFiremanModal = ({ incident, onClose }) => {

    const [firemen, setFiremen] = useState([]);
    const [selectedFiremen, setSelectedFiremen] = useState([]);
    const [allottedFiremen, setAllottedFiremen] = useState([])

    useEffect(() => {
        const fetchFiremenData  = async () => {
            try {
                const [unallottedResponse, allottedResponse] = await Promise.all([
                    axios.get(`${API_URL}/fireman/unallotted`),
                    axios.get(`${API_URL}/allocation/${incident.id}`)
                ]);

                setFiremen(unallottedResponse.data);
                setAllottedFiremen(allottedResponse.data);
            } catch (error) {
                console.error("Error fetching firemen:", error);
            }
        };

        fetchFiremenData();
    }, [incident.id]);

    const handleCheckboxChange = (fid) => {
        setSelectedFiremen((prevSelected) =>
            prevSelected.includes(fid)
                ? prevSelected.filter(id => id !== fid)
                : [...prevSelected, fid]
        );
    };

    const handleAllot = async () => {
        if (selectedFiremen.length === 0) {
            alert("Please select at least one fireman!");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/allocation/`, {
                firemen: selectedFiremen,
                incident_id: incident.id
            });

            if (response.status === 200) {
                alert("Firemen successfully allotted!");
                onClose();
            }
        } catch (error) {
            console.error("Error allotting firemen:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                <h2 className="text-xl font-bold mb-4 text-center">Allot Fireman to Incident</h2>

                <div className="max-h-100 overflow-y-auto rounded mb-10">
                    {firemen.length > 0 ? (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-red-200 border-2 border-red-200">
                                    <th className="border border-red-200 p-2">FID</th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Rank</th>
                                    <th className="border p-2">Allot</th>
                                </tr>
                            </thead>
                            <tbody>
                                {firemen.map(fireman => (
                                    <tr key={fireman.fid} className="text-center border-2 border-red-200">
                                        <td className="border p-2">{fireman.fid}</td>
                                        <td className="border p-2">{fireman.name}</td>
                                        <td className="border p-2">{fireman.rank}</td>
                                        <td className="border p-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedFiremen.includes(fireman.fid)}
                                                onChange={() => handleCheckboxChange(fireman.fid)}
                                                className="w-4 h-4"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-center">All firemen are on busy. No firemen left!</p>
                    )}
                </div>

                <h2 className="text-xl font-bold mb-4 text-center">Alloted Firemen</h2>

                <div className="max-h-100 overflow-y-auto rounded mb-8">
                    {allottedFiremen?.allocated_firemen?.length > 0 ? (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-red-200 border-2 border-red-200">
                                    <th className="border p-2">FID</th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Rank</th>
                                    {/* <th className="border p-2">Allot</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {allottedFiremen.allocated_firemen.map(fireman => (
                                    <tr key={fireman.fid} className="text-center border-2 border-red-200">
                                        <td className="border p-2">{fireman.fid}</td>
                                        <td className="border p-2">{fireman.name}</td>
                                        <td className="border p-2">{fireman.rank}</td>
                                        {/* <td className="border p-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedFiremen.includes(fireman.fid)}
                                                onChange={() => handleCheckboxChange(fireman.fid)}
                                                className="w-4 h-4"
                                            />
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-center">No firemen allotted yet</p>
                    )}
                </div>

                <div className="flex justify-between gap-4 mt-6">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex-1"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex-1"
                        onClick={handleAllot}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AllotFiremanModal