import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Location() {
    const [eventDetails, setEventDetails] = useState(null); // For main event details
    const [aggregatedLocations, setAggregatedLocations] = useState([]); // For nested "jsonb_agg" data
    const [error, setError] = useState(null);

    const { id } = useParams(); // Get the event ID from the URL

    useEffect(() => {
        fetch(`http://localhost:3000/event/aggregation/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEventDetails({
                    event_title: data.event_title,
                    event_description: data.event_description,
                    event_images: data.event_images, // Assuming the API returns an array of image URLs
                });
                if (Array.isArray(data.jsonb_agg)) {
                    setAggregatedLocations(data.jsonb_agg); // Save nested array
                } else {
                    throw new Error('Unexpected response format for jsonb_agg');
                }
            })
            .catch(err => {
                setError(err.message);
                console.error('Error fetching data:', err);
            });
    }, [id]);

    return (
        <div>
            <h1>Event Details</h1>

            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <>
                    {eventDetails ? (
                        <div>
                            <h2>{eventDetails.event_title}</h2>
                            <p>{eventDetails.event_description}</p>

                            {/* Display event images if available */}
                            {eventDetails.event_images && (
                                <div>
                                    <h3>Event Images</h3>
                                    <img src={`data:image/jpeg;base64,${eventDetails.event_images.image}`} alt="Event" />

                                    {/* {eventDetails.event_images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={``}
                                            style={{
                                                width: '100%',
                                                maxWidth: '500px',
                                                margin: '10px 0',
                                            }}
                                        />
                                    ))} */}
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Loading event details...</p>
                    )}

                    {/* Display nested location data */}
                    {aggregatedLocations.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Location ID</th>
                                    <th>Total Seats Available</th>
                                    <th>Event ID</th>
                                    <th>Seats Remaining</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aggregatedLocations.map((location, index) => (
                                    <tr key={index}>
                                        <td>{location.date}</td>
                                        <td>{location.time}</td>
                                        <td>{location.location_id}</td>
                                        <td>{location.totalseats_available}</td>
                                        <td>{location.events_id}</td>
                                        <td>{location.seats_remaining}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No location details available</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Location;
