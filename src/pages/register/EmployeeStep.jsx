/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGeolocated } from "react-geolocated";
import { Map, Marker } from "pigeon-maps";
import ProgressBar from "../user/Components/ProgressBar";
import ProgressHeader from "../../components/ProgressHeader";

const EmploymentStep = ({
    userData,
    setUserData,
    handleChange,
    errors,
    currentStepIndex,
    totalSteps,
}) => {
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

            setUserData((prevData) => ({
                ...prevData,
                emp_lat: lat,
                emp_long: long,
            }));
        }
    }, [coords, setUserData]);

    // Handle map click
    const handleMapClick = ({ latLng }) => {
        const [lat, long] = latLng;
        setMarkerPosition([lat, long]);

        setUserData((prevData) => ({
            ...prevData,
            emp_lat: lat.toFixed(6),
            emp_long: long.toFixed(6),
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ProgressHeader
                currentStepIndex={currentStepIndex}
                totalSteps={totalSteps}
                title="Employement Basic Information"
            />

            {/* EMPLOYMENT STATUS */}
            <h2 className="text-xl font-semibold mb-4">Employment Status</h2>
            <select
                name="emp_status"
                onChange={handleChange}
                value={userData.emp_status}
                className="w-full p-2 border rounded mb-4"
            >
                <option value="">Employment Status</option>
                <option value="0">Unemployed</option>
                <option value="1">Freelance</option>
                <option value="2">Employed</option>
            </select>
            {errors.emp_status && (
                <p className="text-red-500 text-sm">{errors.emp_status}</p>
            )}

            {/* CONDITIONALLY RENDER INFO FORM */}
            {(userData.emp_status === "1" || userData.emp_status === "2") && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Employment Information</h2>
                    <input
                        type="text"
                        name="company_name"
                        placeholder="Company Name"
                        onChange={handleChange}
                        value={userData.company_name}
                        className="w-full p-2 border rounded mb-2"
                    />
                    {errors.company_name && (
                        <p className="text-red-500 text-sm">{errors.company_name}</p>
                    )}

                    <input
                        type="text"
                        name="job_title"
                        placeholder="Job Title"
                        onChange={handleChange}
                        value={userData.job_title}
                        className="w-full p-2 border rounded mb-2"
                    />
                    {errors.job_title && (
                        <p className="text-red-500 text-sm">{errors.job_title}</p>
                    )}

                    <input
                        type="date"
                        name="start_date"
                        placeholder="Start Date"
                        onChange={handleChange}
                        value={userData.start_date}
                        className="w-full p-2 border rounded mb-2"
                    />
                    {errors.start_date && (
                        <p className="text-red-500 text-sm">{errors.start_date}</p>
                    )}
                </div>
            )}

            {/* CONDITIONALLY RENDER ADDRESS FORM (ONLY IF EMPLOYED) */}
            {userData.emp_status === "2" && (
                <div className="mt-8">
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Employment Address Information
                        </h2>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <input
                                type="text"
                                name="emp_full_address"
                                placeholder="Full Address"
                                onChange={handleChange}
                                value={userData.emp_full_address}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            />
                            {errors.emp_full_address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.emp_full_address}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="emp_lat"
                                placeholder="Latitude"
                                value={userData.emp_lat}
                                readOnly
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            />
                            <input
                                type="text"
                                name="emp_long"
                                placeholder="Longitude"
                                value={userData.emp_long}
                                readOnly
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            />
                        </div>

                        {!isGeolocationAvailable ? (
                            <p className="text-red-500 text-sm">
                                ⚠️ Geolocation is not supported by your browser.
                            </p>
                        ) : !isGeolocationEnabled ? (
                            <p className="text-red-500 text-sm">
                                ⚠️ Geolocation is disabled. Please enable it in your settings.
                            </p>
                        ) : coords ? (
                            <p className="text-green-500 text-sm">
                                ✅ Location detected successfully!
                            </p>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                📍 Fetching your location...
                            </p>
                        )}

                        <div className="rounded-lg overflow-hidden shadow-lg border border-gray-300">
                            <Map
                                height={300}
                                center={markerPosition}
                                defaultZoom={15}
                                onClick={handleMapClick}
                            >
                                <Marker width={50} anchor={markerPosition} />
                            </Map>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default EmploymentStep;
