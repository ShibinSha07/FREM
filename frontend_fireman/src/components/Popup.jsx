import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const Popup = () => {

    const [popupVisible, setPopupVisible] = useState(false)

    useEffect(() => {
        const socket = io();
        socket.on('', (data) => {
            console.log(data.message);
            setPopupVisible(true)
        });

        return () => {
            socket.disconnect();
        }
    }, [])

  return (
    <div>
      {popupVisible && (
        <div>
            <p>New incidents </p>
            <button onClick={() => setPopupVisible(false)}>Close</button>
            <button>Verify</button>
        </div>
      )}
    </div>
  )
}

export default Popup
