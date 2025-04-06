import React, { useState } from 'react'
import { useSocket } from '../context/SocketContext'
import IncidentModal from '../components/IncidentModal';

const Home = () => {

    const { incidents, loading } = useSocket();
    const [selectedIncident, setSelectedIncident] = useState(null)

    const acitveIncidents = incidents.filter(incident => incident.status === "pending")

    return (
        <div className='mt-4 ml-4'>

            <div className='bg-slate-300 w-[60%] m-auto p-8 rounded-3xl text-center mb-4'>
                <h1 className='text-xl font-bold mb-4'>Our Vision</h1>
                <p className='font-semibold mb-2'>• To ensure community safety by creating basic awareness regarding fire safety, life safety and Disaster Management among the people and thereby mitigate the fire loss and improve effective and timely rescue and life saving activities.</p>
                <p className='font-semibold'>• Minimize the response time in urban and rural areas by increasing the number of Fire & Rescue Stations and mobility profile of the Department.</p>
            </div>

            <div className='border border-gray-300 rounded-md p-4 mb-12'>
                <h1 className='text-xl font-bold mb-4'>Active incidents</h1>

                {loading ? (
                    <div className='flex justify-center items-center h-[60vh]'>
                        <p className='text-xl font-semibold'>Loading incidents...</p>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-2 gap-8'>
                        {acitveIncidents.length > 0 ? (
                            acitveIncidents.map((incident) => (
                                <div
                                    key={incident.id}
                                    className='border border-gray-300 rounded-md p-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:border-orange-500 hover:scale-[1.02] hover:bg-orange-50'
                                    onClick={() => setSelectedIncident(incident)}
                                >
                                    <p><strong>Location: </strong>{incident.place}</p>
                                    <p><strong>Note: </strong>{incident.note}</p>
                                    <p><strong>Date: </strong>{new Date(incident.timestamp).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No active incidents..</p>
                        )}
                    </div>
                )}

            </div>

            <IncidentModal
                incident={selectedIncident}
                onClose={() => setSelectedIncident(null)}
            />
        </div>
    )
}

export default Home