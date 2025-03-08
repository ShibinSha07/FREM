import React, { useState } from 'react'
import Modal from "react-modal"
import { useSocket } from '../context/SocketContext'
import axios from 'axios';
import { API_URL } from '../../../api';

const Popup = () => {

    const { popup, setPopup, incidents } = useSocket();
    const [note, setNote] = useState("");

    const acitveIncidents = incidents.filter(incident => incident.status === "pending")

    const handleAccept = async () => {
        try {
            const response = await axios.post(`${API_URL}/incidents/`, {
                place: popup.place,
                coordinates: popup.coordinates,
                status: "pending",
                note: note
            })

            console.log("Response:", response.data);
            setPopup(null)

            setTimeout(() => {
                alert("New incident reported");
            }, 100);

        } catch (error) {
            console.error("error in creating the incident", error)
        }
    }

    return (
        <div>
            <Modal
                isOpen={!!popup}
                onRequestClose={() => setPopup(null)}
                shouldCloseOnOverlayClick={false}
                style={{
                    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                    content: { width: "600px", height: "650px", margin: "auto", padding: "20px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }
                }}
            >
                <h2 className='text-2xl font-bold text-center mb-4'>🚨 Emergency Alert</h2>

                {popup && (
                    <>
                        <div className='flex flex-col space-y-4 mb-8'>
                            <p><strong>Location: </strong>{popup.place}</p>
                            <p><strong>Coordinates: </strong>{popup.coordinates}</p>
                            <textarea
                                rows={3}
                                cols={50}
                                placeholder="Type your message here..."
                                className="border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <button
                                className='bg-green-500 text-white p-2 rounded-md'
                                onClick={() => handleAccept()}
                            >
                                Accept
                            </button>
                        </div>

                        <h2 className='text-xl font-bold mb-4'>Active Incidents</h2>

                        <div className="overflow-x-auto mb-4">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">Location</th>
                                        <th className="border border-gray-300 px-4 py-2">Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {acitveIncidents.length > 0 ? (
                                        acitveIncidents.map((incident) => (
                                            <tr key={incident.id} className="text-center">
                                                <td className="border border-gray-300 px-4 py-2">{incident.place}</td>
                                                <td className="border border-gray-300 px-4 py-2">{incident.note}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4">No active incidents</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <button className='bg-red-500 p-2 rounded-md text-white mx-auto w-40' onClick={() => setPopup(null)}>Close</button>
                    </>
                )}

            </Modal>
        </div>
    )
}

Modal.setAppElement("#root");

export default Popup
