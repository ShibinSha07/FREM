import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../lib/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Record = () => {
    const [date, setDate] = useState(new Date());
    const [incidents, setIncidents] = useState([]);
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await axios.get(`${API_URL}/incidents`, {
                    params: { date: date.toISOString().split('T')[0] }
                });
                setIncidents(response.data);
                calculateStatistics(response.data);
            } catch (error) {
                console.error("Error fetching incidents:", error);
            }
        };

        fetchIncidents();
    }, [date]);

    const calculateStatistics = (incidents) => {
        const totalIncidents = incidents.length;
        const finishedIncidents = incidents.filter(incident => incident.status === 'finished').length;
        const pendingIncidents = totalIncidents - finishedIncidents;

        setStatistics({
            total: totalIncidents,
            finished: finishedIncidents,
            pending: pendingIncidents
        });
    };

    return (
        <div className='p-6'>
            <h1 className='text-xl font-bold mb-4'>Incident Records</h1>
            <div className='mb-4'>
                <Calendar onChange={setDate} value={date} />
            </div>

            <div className='border border-gray-300 rounded-md p-4 mb-4'>
                <h2 className='text-lg font-bold mb-2'>Statistics</h2>
                <p><strong>Total Incidents: </strong>{statistics.total}</p>
                <p><strong>Finished Incidents: </strong>{statistics.finished}</p>
                <p><strong>Pending Incidents: </strong>{statistics.pending}</p>
            </div>

            <div className='border border-gray-300 rounded-md p-4'>
                <h2 className='text-lg font-bold mb-2'>Incidents on {date.toDateString()}</h2>
                {incidents.length > 0 ? (
                    incidents.map((incident) => (
                        <div key={incident.id} className='border border-gray-300 rounded-md p-4 mb-2'>
                            <p><strong>Location: </strong>{incident.place}</p>
                            <p><strong>Coordinates: </strong>{incident.coordinates}</p>
                            <p><strong>Note: </strong>{incident.note}</p>
                            <p><strong>Status: </strong>{incident.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No incidents found for this date.</p>
                )}
            </div>
        </div>
    );
};

export default Record;