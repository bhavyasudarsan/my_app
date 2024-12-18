// import React, { useState, useEffect } from 'react';
// // import './Home.css'; // Import the CSS file
// import { useNavigate } from 'react-router-dom';


// function Home() {
//     const [events, setEvents] = useState([]);  // State to store fetched data
//     const [error, setError] = useState(null);  // State to store error message
//     const navigate = useNavigate(); // Hook for navigation

//     useEffect(() => {
//         fetch('http://localhost:3000/events')  // Your Express API endpoint
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setEvents(data);
//             })
//             .catch(err => {
//                 setError('Failed to fetch events');
//                 console.error('Error:', err);
//             });
//     }, []);
//     const handleRowClick = (id) => {
//         navigate(`/event-details/${id}`); // Navigate to EventDetails page with event ID
//     };
//     return (
//         <div className="App">
//             <h1>Events List</h1>

//             {/* Display error message if there is any */}
//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             <div className="container">
//                 {/* Check if events are available */}
//                 {events.length > 0 ? (
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Event Title</th>
//                                 <th>Description</th>
//                                 <th>Detailed Description</th>
//                                 <th>Organized By</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {events.map(event => (
//                                 <tr key={event.id}>
//                                     {/* data-label="Event Title" */}
//                                     {/* data-label="Description" */}
//                                     {/* data-label="Detailed Description" */}
//                                     {/* data-label="Organized By" */}
//                                     <td >{event.event_title}</td>
//                                     <td>{event.event_description}</td>
//                                     <td >{event.detailed_description}</td>
//                                     <td >{event.organised_by}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>No events available</p> // Display this if no events
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Home;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetch('http://localhost:3000/events') // Fetch API data
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setEvents(data))
            .catch(err => {
                setError('Failed to fetch events');
                console.error('Error:', err);
            });
    }, []);

    const handleRowClick = (id) => {
        navigate(`/Location/${id}`);
    };

    return (
        <div className="App">
            <h1>Events List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="container">
                {events.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Event Title</th>
                                <th>Description</th>
                                <th>Detailed Description</th>
                                <th>Organized By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(event => (
                                <tr key={event.id} onClick={() => handleRowClick(event.id)} style={{ cursor: 'pointer' }}>
                                    <td>{event.event_title}</td>
                                    <td>{event.event_description}</td>
                                    <td>{event.detailed_description}</td>
                                    <td>{event.organised_by}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No events available</p>
                )}
            </div>
        </div>
    );
}

export default Home;
