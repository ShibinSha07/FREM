import React from 'react'
import { useState, useEffect } from 'react'
import io from "socket.io-client";
import Modal from "react-modal"

const socket = io('http://127.0.0.1:3001')

const Home = () => {

    const [incidents, setIncidents] = useState([])
    const [popup, setPopup] = useState(null)


    useEffect(() => {
        socket.on("new_incident", (data) => {
            console.log("new incident recieved", data)
            setIncidents((prev) => [...prev, data])
            setPopup(data);
        })

        return () => {
            socket.off("new_incident")
        }
    }, [])

    return (
        <div>
            <h1 className='text-2xl'>Admin Dashboard</h1>

            <Modal
                isOpen={!!popup}
                onRequestClose={() => setPopup(null)}
                style={{
                    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                    content: { width: "400px", margin: "auto", padding: "20px", borderRadius: "10px" }
                }}
            >
                <h2>Emergency Alert</h2>

                {popup && (
                    <>
                        <p>{popup.location}</p>
                        <p>{popup.vehicle_id}</p>
                        <button onClick={() => setPopup(null)}>Close</button>
                    </>
                )}
            </Modal>

            <h2>Incidents List</h2>
            <ul>
                {incidents.map((incident, index) => (
                    <li key={index}>
                        <strong>Location:</strong> {incident.location} |
                        <strong>Status:</strong> {incident.status} |
                        <strong>Vehicle ID:</strong> {incident.vehicle_id}
                    </li>
                ))}
            </ul>

        </div>
    )
}

Modal.setAppElement("#root");

export default Home
