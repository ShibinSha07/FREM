import React from 'react'
import Modal from "react-modal"
import { useSocket } from '../context/SocketContext'

const Popup = () => {

    const { popup, setPopup } = useSocket();

    return (
        <div>
            <Modal
                isOpen={!!popup}
                onRequestClose={() => setPopup(null)}
                style={{
                    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                    content: { width: "400px", height: "400px", margin: "auto", padding: "20px", borderRadius: "10px",display: "flex", flexDirection: "column", justifyContent: "space-between" }
                }}
            >
                <h2 className='text-2xl font-bold text-center'>🚨 Emergency Alert</h2>

                {popup && (
                    <>
                        <p>{popup.location}</p>
                        <p>{popup.vehicle_id}</p>
                        <div className='flex justify-between mt-auto'>
                            <button className='bg-green-500 text-white p-2 rounded-md'>Accept</button>
                            <button className='bg-red-500 p-2 rounded-md text-white' onClick={() => setPopup(null)}>Close</button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    )
}

Modal.setAppElement("#root");

export default Popup
