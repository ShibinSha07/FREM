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
                    content: { width: "400px", margin: "auto", padding: "20px", borderRadius: "10px" }
                }}
            >
                <h2>🚨 Emergency Alert</h2>

                {popup && (
                    <>
                        <p>{popup.location}</p>
                        <p>{popup.vehicle_id}</p>
                        <button onClick={() => setPopup(null)}>Close</button>
                    </>
                )}
            </Modal>
        </div>
    )
}

Modal.setAppElement("#root");

export default Popup
