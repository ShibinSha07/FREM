import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from '../lib/api';
import axios from 'axios'

const socket = io("http://127.0.0.1:3001");

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

    const [incidents, setIncidents] = useState([])
    const [popup, setPopup] = useState(null)

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await axios.get(`${API_URL}/incidents`)
                setIncidents(response.data)
            } catch (error) {
                console.error("error in fetching the incidents", error)
            }
        }

        fetchIncidents();
    }, [])

    useEffect(() => {
        socket.on("new_call", (data) => {
            setPopup(data);
        })

        return () => {
            socket.off("new_call");
        };
    }, [])

    return (
        <SocketContext.Provider value={{ incidents, popup, setPopup }}>
            {children}
        </SocketContext.Provider>
    );
}