/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const AddressInfoStep = ({ userData, handleChange, errors }) => {
    const [position, setPosition] = useState(null);

    // Function to get user's current location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition([latitude, longitude]);
            },
            (err) => console.error(err),
            { enableHighAccuracy: true }
        );
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg w-96 mx-auto">
            <h2 className="text-xl font-semibold mb-4">Address Information</h2>
            <input
                type="text"
                name="add_full_address"
                placeholder="Full Address"
                onChange={handleChange}
                value={userData.add_full_address}
                className="w-full p-2 border rounded mb-1"
            />
            {errors.add_full_address && <p className="text-red-500 text-sm">{errors.add_full_address}</p>}

            {/* Render Map Only When Position is Available */}
            {position && (
                <MapContainer
                    center={position}
                    zoom={15}
                    style={{ height: "300px", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} />
                </MapContainer>
            )}
        </div>
    );
};

export default AddressInfoStep;
