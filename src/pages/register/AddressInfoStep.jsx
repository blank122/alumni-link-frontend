/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGeolocated } from "react-geolocated";
import { Map, Marker } from "pigeon-maps";
import ProgressBar from "../user/Components/ProgressBar";

const AddressInfoStep = ({ userData, setUserData, handleChange, errors, currentStepIndex, totalSteps }) => {
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
                add_lat: lat,
                add_long: long,
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
            add_lat: lat.toFixed(6),
            add_long: long.toFixed(6),
        }));
    };

    return (
        <motion.div
            className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg w-full max-w-4xl mx-auto border border-gray-100 max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            <div className="w-full max-w-3xl">
                <ProgressBar currentStepIndex={currentStepIndex} totalSteps={totalSteps} />
            </div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-9 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full"></div>
                <h2 className="text-3xl font-extrabold text-gray-800">Address Information</h2>
            </div>

            <div className="space-y-6">
                {/* Full Address */}
                <div>
                    <input
                        type="text"
                        name="add_full_address"
                        placeholder="Full Address"
                        onChange={handleChange}
                        value={userData.add_full_address}
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02] text-[16px]"
                    />
                    {errors.add_full_address && (
                        <p className="text-red-500 text-sm mt-1">{errors.add_full_address}</p>
                    )}
                </div>

                {/* Latitude & Longitude */}
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <input
                            type="text"
                            name="add_lat"
                            placeholder="Latitude"
                            value={userData.add_lat}
                            readOnly
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02] text-[16px]"
                        />
                        {errors.add_lat && (
                            <p className="text-red-500 text-sm mt-1">{errors.add_lat}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            name="add_long"
                            placeholder="Longitude"
                            value={userData.add_long}
                            readOnly
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02] text-[16px]"
                        />
                        {errors.add_long && (
                            <p className="text-red-500 text-sm mt-1">{errors.add_long}</p>
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
                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300">
                    <Map
                        height={400}
                        center={markerPosition}
                        defaultZoom={15}
                        onClick={handleMapClick}
                    >
                        <Marker width={50} anchor={markerPosition} />
                    </Map>
                </div>
            </div>
        </motion.div>

    );
};

export default AddressInfoStep;
