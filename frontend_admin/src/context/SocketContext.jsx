import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from "../../../api";

const socket = io("http://127.0.0.1:3001");

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

    const [incidents, setIncidents] = useState([])
    const [popup, setPopup] = useState(null)

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await fetch(`${API_URL}/calls`)
                const data = await response.json();
                setIncidents(data)
            } catch (error) {
                console.error("error in fetching the incidents", error)
            }
        }

        fetchIncidents();
    }, [])

    useEffect(() => {
        socket.on("new_call", (data) => {
            console.log('new incident recieved', data)
            setIncidents((prev) => [...prev, data]);
            setPopup(data);
        })

        return () => {
            socket.off("new_call");
        };
    }, [])

    // useEffect(() => {
    //     const dummyData = {
    //         id: "123",
    //         title: "Fire Alert",
    //         location: "Main Street, NY",
    //         severity: "High",
    //         description: "A fire has broken out in a residential building.",
    //     };
    //     setPopup(dummyData);
    // }, []);


    return (
        <SocketContext.Provider value={{ incidents, popup, setPopup }}>
            {children}
        </SocketContext.Provider>
    );
}