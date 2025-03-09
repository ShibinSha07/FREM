import React, { useState } from 'react'
import { API_URL } from '../lib/api';
import axios from 'axios'
import AllotFiremanModal from './AllotFiremanModal';

const IncidentModal = ({ incident, onClose }) => {

    const [showFiremanModal, setShowFiremanModal] = useState(false)

    if (!incident) return null;

    const handleUpdateStatus = async () => {
        try {
            const response = await axios.put(`${API_URL}/incidents/${incident.id}/status`, {
                status: "finished"
            });

            if (response.status === 200) {
                alert('incident marked as finished!')
                onClose();
            }
        } catch (error) {
            console.error("error updating status:", error)
        }
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                    <h2 className="text-xl font-bold mb-4 text-center">Incident Details</h2>
                    <p className='mb-2'><strong>Location: </strong>{incident.place}</p>
                    <p className='mb-2'><strong>Coordinates: </strong>{incident.coordinates}</p>
                    <p className='mb-6'><strong>Note: </strong>{incident.note}</p>

                    <div className="flex justify-between gap-[10%] mt-12">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex-1"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex-1"
                            onClick={() => setShowFiremanModal(true)}
                        >
                            Allot Fireman
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex-1"
                            onClick={handleUpdateStatus}
                        >
                            Finished
                        </button>
                    </div>
                </div>
            </div>

            {showFiremanModal && (
                <AllotFiremanModal
                    incident={incident}
                    onClose={() => setShowFiremanModal(false)}
                />
            )}
        </>
    )
}

export default IncidentModal