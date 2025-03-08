import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from "../lib/api";
import Popup from "../components/Popup";

const socket = io(API_URL, {
    transports: ["websocket"],
    forceNew: true
});

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

    const [popup, setPopup] = useState(null);

    useEffect(() => {
        socket.on("new_incident", (data) => {
            console.log("New incident reported", data);
            setPopup(data);
        });

        return () => {
            socket.off("new_incident");
        };
    }, []);

    return (
        <SocketContext.Provider value={{ popup, setPopup }}>
            {children}
        </SocketContext.Provider>
    );
};
