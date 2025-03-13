import React, { useState } from 'react'
import { useSocket } from '../context/SocketContext'
import IncidentModal from '../components/IncidentModal';
import Sidebar from '../components/Sidebar';

const Home = () => {

    const { incidents } = useSocket();
    const [selectedIncident, setSelectedIncident] = useState(null)

    const acitveIncidents = incidents.filter(incident => incident.status === "pending")

    return (
        <div className='ml-72'>

            <div className='bg-gradient-to-r from-orange-200 to-orange-500 w-[60%] m-auto p-4 rounded-md text-center mb-4'>
                <h1 className='text-xl font-bold mb-4'>Our Vision</h1>
                <p className='font-semibold mb-2'>• To ensure community safety by creating basic awareness regarding fire safety, life safety and Disaster Management among the people and thereby mitigate the fire loss and improve effective and timely rescue and life saving activities.</p>
                <p className='font-semibold'>• Minimize the response time in urban and rural areas by increasing the number of Fire & Rescue Stations and mobility profile of the Department.</p>
            </div>

            <div className='border border-gray-300 rounded-md p-4'>
                <h1 className='text-xl font-bold mb-4'>Active incidents</h1>

                <div className='grid md:grid-cols-2 gap-4'>
                    {acitveIncidents.length > 0 ? (
                        acitveIncidents.map((incident) => (
                            <div
                                key={incident.id}
                                className='border border-gray-300 rounded-md p-4 hover:border-orange-500 hover:bg-orange-200'
                                onClick={() => setSelectedIncident(incident)}
                            >
                                <p><strong>Location: </strong>{incident.place}</p>
                                <p><strong>Note: </strong>{incident.note}</p>
                            </div>
                        ))
                    ) : (
                        <p>No active incidents..</p>
                    )}
                </div>
            </div>

            <IncidentModal
                incident={selectedIncident}
                onClose={() => setSelectedIncident(null)}
            />
        </div>
    )
}

export default Home