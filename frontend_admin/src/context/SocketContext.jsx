import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from '../lib/api';
import axios from 'axios'


const socket = io(API_URL);

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

    const [incidents, setIncidents] = useState([])
    const [popup, setPopup] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchIncidents = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/incidents/`)
            setIncidents(response.data)
        } catch (error) {
            console.error("error in fetching the incidents", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
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
        <SocketContext.Provider value={{ incidents, popup, setPopup, loading, fetchIncidents  }}>
            {children}
        </SocketContext.Provider>
    );
}