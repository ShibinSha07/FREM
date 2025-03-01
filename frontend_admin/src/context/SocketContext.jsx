import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://127.0.0.1:3001");

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

    const [incidents, setIncidents] = useState([])
    const [popup, setPopup] = useState(null)

    useEffect(() => {
        socket.on("new_incident", (data) => {
            console.log('new incident recieved', data)
            setIncidents((prev) => [...prev, data]);
            setPopup(data);
        })

        return () => {
            socket.off("new_incident");
        };
    }, [])

    return (
        <SocketContext.Provider value={{ incidents, popup, setPopup }}>
            {children}
        </SocketContext.Provider>
    );
}