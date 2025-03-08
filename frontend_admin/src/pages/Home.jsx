import React, { useState } from 'react'
import { useSocket } from '../context/SocketContext'
import IncidentModal from '../components/IncidentModal';

const Home = () => {

    const { incidents } = useSocket();
    const [selectedIncident, setSelectedIncident] = useState(null)

    const acitveIncidents = incidents.filter(incident => incident.status === "pending")

    return (
        <div className='p-6'>
            <div className='bg-gray-200 w-[60%] m-auto p-4 rounded-md text-center mb-4'>
                <h1 className='text-xl font-semibold mb-4'>Random Text</h1>
                <p>bla bla bla .</p>
                <p>bla bla bla .</p>
                <p>bla bla bla   .</p>
            </div>

            <div className='border border-gray-300 rounded-md p-4'>
                <h1 className='text-xl font-bold mb-4'>Active incidents</h1>

                <div className='grid md:grid-cols-3 gap-4'>
                    {acitveIncidents.length > 0 ? (
                        acitveIncidents.map((incident) => (
                            <div
                                key={incident.id}
                                className='border border-gray-300 rounded-md p-4 hover:border-orange-500'
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