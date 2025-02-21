/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGeolocated } from "react-geolocated";
import { Map, Marker } from "pigeon-maps";

const AddressInfoStep = ({ userData, setUserData, handleChange, errors }) => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: { enableHighAccuracy: true },
        userDecisionTimeout: 5000,
    });

    // Local state for marker position
    const [markerPosition, setMarkerPosition] = useState([10.3157, 123.8854]); // Default to Cebu City

    // Update marker position when geolocation is available
    useEffect(() => {
        if (coords) {
            const lat = coords.latitude.toFixed(6);
            const long = coords.longitude.toFixed(6);
            setMarkerPosition([parseFloat(lat), parseFloat(long)]);

            // Set initial location in userData
            setUserData((prevData) => ({
                ...prevData,
                emp_lat: lat,
                emp_long: long,
            }));
        }
    }, [coords, setUserData]);

    // Handle map click event to move the marker
    const handleMapClick = ({ latLng }) => {
        const [lat, long] = latLng;
        setMarkerPosition([lat, long]);

        // Update userData with new marker position
        setUserData((prevData) => ({
            ...prevData,
            emp_lat: lat.toFixed(6),
            emp_long: long.toFixed(6),
        }));
    };

    return (
        <motion.div
            className="p-8 bg-white rounded-2xl shadow-2xl w-[420px] mx-auto border border-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-8 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Address Information</h2>
            </div>

            <div className="space-y-5">
                {/* Full Address */}
                <div>
                    <input
                        type="text"
                        name="emp_full_address"
                        placeholder="Full Address"
                        onChange={handleChange}
                        value={userData.emp_full_address}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                    />
                    {errors.emp_full_address && (
                        <p className="text-red-500 text-sm mt-1">{errors.emp_full_address}</p>
                    )}
                </div>

                {/* Latitude & Longitude */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            name="emp_add_lat"
                            placeholder="Latitude"
                            value={userData.emp_lat}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                        />
                        {errors.emp_lat && (
                            <p className="text-red-500 text-sm mt-1">{errors.emp_lat}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="emp_long"
                            placeholder="Longitude"
                            value={userData.emp_long}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                        />
                        {errors.emp_long && (
                            <p className="text-red-500 text-sm mt-1">{errors.emp_long}</p>
                        )}
                    </div>
                </div>

                {/* Geolocation Status */}
                {!isGeolocationAvailable ? (
                    <p className="text-red-500 text-sm">⚠️ Geolocation is not supported by your browser.</p>
                ) : !isGeolocationEnabled ? (
                    <p className="text-red-500 text-sm">⚠️ Geolocation is disabled. Please enable it in your settings.</p>
                ) : coords ? (
                    <p className="text-green-500 text-sm">✅ Location detected successfully!</p>
                ) : (
                    <p className="text-gray-500 text-sm">📍 Fetching your location...</p>
                )}

                {/* OpenStreetMap with Clickable Marker */}
                <div className="rounded-lg overflow-hidden shadow-lg border border-gray-300">
                    <Map
                        height={300}
                        center={markerPosition}
                        defaultZoom={15}
                        onClick={handleMapClick} // Move marker on map click
                    >
                        <Marker width={50} anchor={markerPosition} />
                    </Map>
                </div>
            </div>
        </motion.div>
    );
};

export default AddressInfoStep;
