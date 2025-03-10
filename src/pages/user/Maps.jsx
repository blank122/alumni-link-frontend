import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Map, Marker } from "pigeon-maps";

const Maps = () => {
    const { user, token } = useAuth();
    const [maps, setMaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [markerPosition, setMarkerPosition] = useState([10.3157, 123.8854]); // Default: Cebu City

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/user-location/${user?.alumni_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                const locationData = response.data.data;
                setMaps(locationData);

                // If data exists, update marker position
                if (locationData.length > 0) {
                    setMarkerPosition([
                        parseFloat(locationData[0].add_lat),
                        parseFloat(locationData[0].add_long),
                    ]);
                }

                console.log(locationData);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [user, token, markerPosition]);

    return (
        <div className="flex flex-col h-screen p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">🗺️ Maps</h1>
            </div>

            {loading ? (
                <p>Loading Map...</p>
            ) : maps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {maps.map((map, index) => (
                        <div key={map.id} className="p-4 border rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold">📍 Alumni Location {index + 1}</h2>
                            <p><strong>Full Address:</strong> {map.full_address}</p>
                            <p><strong>Latitude:</strong> {map.add_lat}</p>
                            <p><strong>Longitude:</strong> {map.add_long}</p>

                            {/* Map Display */}
                            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-300 mt-4">
                                <Map height={300} center={[parseFloat(map.add_lat), parseFloat(map.add_long)]} defaultZoom={15}>
                                    <Marker width={50} anchor={[parseFloat(map.add_lat), parseFloat(map.add_long)]} />
                                </Map>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No map data available.</p>
            )}
        </div>
    );
};

export default Maps;
