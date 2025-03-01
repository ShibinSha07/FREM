import React from 'react'

const Home = () => {

    // const [incidents, setIncidents] = useState([])

    return (
        <div>

            <div className='bg-gray-200 w-[60%] m-auto p-4 rounded-md text-center'>
                <h1 className='text-xl font-semibold mb-4'>Active Incidents</h1>
                <p>No active incident.</p>
            </div>

            {/* <h2>Incidents List</h2>
            <ul>
                {incidents.map((incident, index) => (
                    <li key={index}>
                        <strong>Location:</strong> {incident.location} |
                        <strong>Status:</strong> {incident.status} |
                        <strong>Vehicle ID:</strong> {incident.vehicle_id}
                    </li>
                ))}
            </ul> */}

        </div>
    )
}



export default Home
