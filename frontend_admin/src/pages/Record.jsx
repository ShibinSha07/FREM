import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../lib/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Record = () => {
    const [date, setDate] = useState(null);
    const [incidents, setIncidents] = useState([]);
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const params = date ? { date: date.toLocaleDateString('en-CA') } : {};
                const response = await axios.get(`${API_URL}/incidents/`, { params });
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

    const handleDownloadPDF = async (incidentId) => {
        try {
            const response = await axios.get(`${API_URL}/incidents/download/${incidentId}`, {
                responseType: 'blob', 
            });

            const url = window.URL.createObjectURL(response.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = `incident_${incidentId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error("PDF download failed:", error);
        }
    };

    return (
        <div className='p-6'>

            <div className='flex justify-between gap-4'>

                <div className='w-full  rounded-md p-4 mb-4'>
                    <h1 className='text-2xl font-bold mb-4'>Incident Records</h1>
                    <h2 className='text-lg font-bold mb-2'>Statistics</h2>
                    <p><strong>Total Incidents: </strong>{statistics.total}</p>
                    <p><strong>Finished Incidents: </strong>{statistics.finished}</p>
                    <p><strong>Pending Incidents: </strong>{statistics.pending}</p>
                </div>

                <div className='w-full md:w-1/2 mb-4 flex flex-col items-end gap-2'>
                    <Calendar onChange={setDate} value={date || new Date()} />
                    {date && (
                        <button
                            onClick={() => setDate(null)}
                            className='text-sm text-blue-600 underline'
                        >
                            Show All Incidents
                        </button>
                    )}
                </div>

            </div>

            <div className='border border-gray-300 rounded-md p-4'>
                <h2 className='text-lg font-bold mb-2'>
                    {date ? `Incidents on ${date.toDateString()}` : 'All Incidents'}
                </h2>

                {incidents.length > 0 ? (
                    incidents.map((incident) => (
                        <div
                            id={`incident-${incident.id}`}
                            key={incident.id}
                            className='border border-gray-300 rounded-md p-4 mb-2 relative'
                        >
                            <p><strong>Location: </strong>{incident.place}</p>
                            <p><strong>Coordinates: </strong>{incident.coordinates}</p>
                            <p><strong>Note: </strong>{incident.note}</p>
                            <p><strong>Status: </strong>{incident.status}</p>
                            <p><strong>Date: </strong>{new Date(incident.timestamp).toLocaleString()}</p>
                            <button
                                onClick={() => handleDownloadPDF(incident.id)}
                                className='mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
                            >
                                Download as PDF
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No incidents found {date ? 'in this date.' : 'yet.'}</p>
                )}
            </div>
        </div>
    );
};

export default Record;