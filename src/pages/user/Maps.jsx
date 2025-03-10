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
        <div className="flex flex-col h-screen p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    🗺️ Maps
                </h1>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading Map...</p>
            ) : maps.length > 0 ? (
                <div className="w-full h-full flex flex-col">
                    {maps.map((map) => (
                        <div key={map.id} className="flex flex-col w-full h-full min-h-screen bg-white p-5 rounded-none shadow-md">
                            <h2 className="text-xl font-semibold text-gray-900">
                                📍 Your Location
                            </h2>
                            <p className="text-gray-700"><strong>Full Address:</strong> {map.full_address}</p>
                            <p className="text-gray-700"><strong>Latitude:</strong> {map.add_lat}</p>
                            <p className="text-gray-700"><strong>Longitude:</strong> {map.add_long}</p>

                            {/* Full-Screen Map */}
                            <div className="flex-grow w-full h-full mt-4 border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                                <Map height={"100%"} width={"100%"} center={[parseFloat(map.add_lat), parseFloat(map.add_long)]} defaultZoom={15}>
                                    <Marker width={50} anchor={[parseFloat(map.add_lat), parseFloat(map.add_long)]} />
                                </Map>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No map data available.</p>
            )}
        </div>


    );
};

export default Maps;
