import React from 'react'
import Modal from "react-modal"
import { useSocket } from '../context/SocketContext'

const Popup = () => {

    const { popup, setPopup, incidents } = useSocket();
    console.log(popup)

    return (
        <div>
            <Modal
                isOpen={!!popup}
                onRequestClose={() => setPopup(null)}
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
                            />
                            <button className='bg-green-500 text-white p-2 rounded-md'>Accept</button>
                        </div>

                        <h2 className='text-xl font-bold mb-2'>Active Incidents</h2>

                        <div className="overflow-x-auto mb-4">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        {/* <th className="border border-gray-300 px-4 py-2">ID</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Location</th>
                                        <th className="border border-gray-300 px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incidents.length > 0 ? (
                                        incidents.map((incident) => (
                                            <tr key={incident.incident_id} className="text-center">
                                                {/* <td className="border border-gray-300 px-4 py-2">{incident.id}</td> */}
                                                <td className="border border-gray-300 px-4 py-2">{incident.location}</td>
                                                <td className="border border-gray-300 px-4 py-2">{incident.status}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4">No incidents reported</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <button className='bg-red-500 p-2 rounded-md text-white m-auto w-40' onClick={() => setPopup(null)}>Close</button>
                    </>
                )}



            </Modal>
        </div>
    )
}

Modal.setAppElement("#root");

export default Popup
