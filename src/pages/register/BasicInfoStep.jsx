/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGeolocated } from "react-geolocated";
import { Map, Marker } from "pigeon-maps";
import { User, Phone, Home } from "lucide-react"; // icons
import ProgressHeader from "../../components/ProgressHeader";

const BasicInfoStep = ({
    userData,
    handleChange,
    errors,
    currentStepIndex,
    totalSteps,
    setUserData,
}) => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: { enableHighAccuracy: true },
        userDecisionTimeout: 5000,
    });

    const [markerPosition, setMarkerPosition] = useState([10.3157, 123.8854]); // Cebu default

    useEffect(() => {
        if (coords) {
            const lat = coords.latitude.toFixed(6);
            const long = coords.longitude.toFixed(6);
            setMarkerPosition([parseFloat(lat), parseFloat(long)]);
            setUserData((prevData) => ({
                ...prevData,
                add_lat: lat,
                add_long: long,
            }));
        }
    }, [coords, setUserData]);

    const handleMapClick = ({ latLng }) => {
        const [lat, long] = latLng;
        setMarkerPosition([lat, long]);
        setUserData((prevData) => ({
            ...prevData,
            add_lat: lat.toFixed(6),
            add_long: long.toFixed(6),
        }));
    };

    return (
        <motion.div
            className="p-8 rounded-2xl shadow-lg w-full max-w-2xl mx-auto "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Progress Header */}
            <ProgressHeader
                currentStepIndex={currentStepIndex}
                totalSteps={totalSteps}
                title="Alumni Basic Information"
            />

            {/* Section: General Info */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-green-500" />
                    General Information
                </h2>

                <div className="grid gap-4">
                    <input
                        type="text"
                        name="alm_first_name"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={userData.alm_first_name}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
                    />
                    {errors.alm_first_name && <p className="text-red-500 text-xs">{errors.alm_first_name}</p>}

                    <input
                        type="text"
                        name="alm_last_name"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={userData.alm_last_name}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
                    />
                    {errors.alm_last_name && <p className="text-red-500 text-xs">{errors.alm_last_name}</p>}

                    <select
                        name="alm_gender"
                        onChange={handleChange}
                        value={userData.alm_gender}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-700"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">👨 Male</option>
                        <option value="Female">👩 Female</option>
                    </select>
                    {errors.alm_gender && <p className="text-red-500 text-xs">{errors.alm_gender}</p>}

                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            name="alm_contact_number"
                            placeholder="09XXXXXXXXX"
                            maxLength={11}
                            onChange={handleChange}
                            value={userData.alm_contact_number}
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
                        />
                    </div>
                    {errors.alm_contact_number && (
                        <p className="text-red-500 text-xs">{errors.alm_contact_number}</p>
                    )}
                </div>
            </div>

            {/* Section: Address Info */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                    <Home className="w-5 h-5 text-yellow-500" />
                    Address Information
                </h2>

                <div className="grid gap-4">
                    <input
                        type="text"
                        name="add_full_address"
                        placeholder="Street, Barangay, City"
                        onChange={handleChange}
                        value={userData.add_full_address}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400"
                    />
                    {errors.add_full_address && (
                        <p className="text-red-500 text-xs">{errors.add_full_address}</p>
                    )}

                    {/* Lat/Long */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="add_lat"
                            placeholder="Latitude"
                            value={userData.add_lat}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                        />
                        <input
                            type="text"
                            name="add_long"
                            placeholder="Longitude"
                            value={userData.add_long}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                        />
                    </div>

                    {/* Geolocation feedback */}
                    {!isGeolocationAvailable ? (
                        <p className="text-red-500 text-sm">⚠️ Geolocation not supported</p>
                    ) : !isGeolocationEnabled ? (
                        <p className="text-red-500 text-sm">⚠️ Geolocation disabled in settings</p>
                    ) : coords ? (
                        <p className="text-green-500 text-sm">✅ Location detected!</p>
                    ) : (
                        <p className="text-gray-500 text-sm">📍 Detecting your location...</p>
                    )}

                    {/* Map */}
                    <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
                        <Map height={300} center={markerPosition} defaultZoom={15} onClick={handleMapClick}>
                            <Marker width={50} anchor={markerPosition} />
                        </Map>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Tap on the map to adjust your location if needed.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default BasicInfoStep;
