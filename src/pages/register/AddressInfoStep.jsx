/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGeolocated } from "react-geolocated";

const AddressInfoStep = ({ userData, setUserData, handleChange, errors }) => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: { enableHighAccuracy: true },
        userDecisionTimeout: 5000,
    });

    // Update userData state when geolocation is available
    useEffect(() => {
        if (coords) {
            setUserData((prevData) => ({
                ...prevData,
                add_lat: coords.latitude.toFixed(6),  // Limit decimal places
                add_long: coords.longitude.toFixed(6),
            }));
        }
    }, [coords, setUserData]);

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
                        name="add_full_address"
                        placeholder="Full Address"
                        onChange={handleChange}
                        value={userData.add_full_address}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                    />
                    {errors.add_full_address && (
                        <p className="text-red-500 text-sm mt-1">{errors.add_full_address}</p>
                    )}
                </div>

                {/* Latitude & Longitude */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Latitude */}
                    <div>
                        <input
                            type="text"
                            name="add_lat"
                            placeholder="Latitude"
                            value={userData.add_lat}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                        />
                        {errors.add_lat && (
                            <p className="text-red-500 text-sm mt-1">{errors.add_lat}</p>
                        )}
                    </div>

                    {/* Longitude */}
                    <div>
                        <input
                            type="text"
                            name="add_long"
                            placeholder="Longitude"
                            value={userData.add_long}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
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
            </div>
        </motion.div>
    );
};

export default AddressInfoStep;
