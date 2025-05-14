import React, { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { useGeolocated } from "react-geolocated";
import { useAuth } from "../../../contexts/AuthContext";
import { FaTimes, FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const EmploymentModal = ({ isOpen, onClose }) => {
    const { user, token } = useAuth();

    const [employmentType, setEmploymentType] = useState("2");
    const [markerPosition, setMarkerPosition] = useState([10.3157, 123.8854]);
    const [isLoading, setIsLoading] = useState(false);

    const [newJob, setNewJob] = useState({
        emp_status: "2",
        job_title: "",
        company_name: "",
        start_date: "",
        end_date: "",
        emp_full_address: "",
        emp_add_lat: "",
        emp_add_long: "",
    });

    const { coords } = useGeolocated({
        positionOptions: { enableHighAccuracy: true },
        userDecisionTimeout: 5000,
    });

    useEffect(() => {
        if (coords) {
            const lat = coords.latitude.toFixed(6);
            const long = coords.longitude.toFixed(6);
            setMarkerPosition([parseFloat(lat), parseFloat(long)]);
            setNewJob((prev) => ({
                ...prev,
                emp_add_lat: lat,
                emp_add_long: long,
            }));
        }
    }, [coords]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEmploymentTypeChange = (e) => {
        const type = e.target.value;
        setEmploymentType(type);
        setNewJob((prev) => ({
            ...prev,
            company_name: type === "1" ? "Self-employed" : "",
            emp_status: type
        }));
    };

    const handleMapClick = ({ latLng }) => {
        const [lat, long] = latLng;
        setMarkerPosition([lat, long]);
        setNewJob((prev) => ({
            ...prev,
            emp_add_lat: lat.toFixed(6),
            emp_add_long: long.toFixed(6),
        }));
    };

    const handleSave = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/add-career/${user.alumni_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newJob),
            });

            const result = await response.json();
            console.log("Server response:", result);
            alert("Career updated successfully!");

            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Failed to send address:", error);
        } finally {
            setIsLoading(false);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-2xl mx-auto shadow-xl flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-semibold text-gray-800">Add experience</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                    >
                        <FaTimes className="text-lg" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 px-6 py-4">
                    <div className="space-y-6">
                        {/* Employment Type */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Employment type</label>
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => handleEmploymentTypeChange({ target: { value: "2" } })}
                                    className={`px-4 py-2 text-sm rounded-full ${employmentType === "2" ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Full-time
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleEmploymentTypeChange({ target: { value: "1" } })}
                                    className={`px-4 py-2 text-sm rounded-full ${employmentType === "1" ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                                >
                                    Freelance
                                </button>
                            </div>
                        </div>

                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title*</label>
                            <input
                                type="text"
                                name="job_title"
                                value={newJob.job_title}
                                onChange={handleInputChange}
                                placeholder="Ex: Software Engineer"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                {employmentType === "1" ? "What do you do?" : "Company name*"}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaBuilding className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="company_name"
                                    value={newJob.company_name}
                                    onChange={handleInputChange}
                                    placeholder={employmentType === "1" ? "Ex: Graphic Design" : "Ex: Microsoft"}
                                    readOnly={employmentType === "1"}
                                    className={`w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${employmentType === "1" ? 'bg-gray-100' : ''}`}
                                    required
                                />
                            </div>
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start date*</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={newJob.start_date}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End date</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={newJob.end_date}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location Fields (only for full-time) */}
                        {employmentType === "2" && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaMapMarkerAlt className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="emp_full_address"
                                            value={newJob.emp_full_address}
                                            onChange={handleInputChange}
                                            placeholder="Ex: San Francisco, CA"
                                            className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Latitude</label>
                                        <input
                                            type="text"
                                            name="emp_add_lat"
                                            value={newJob.emp_add_lat}
                                            readOnly
                                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Longitude</label>
                                        <input
                                            type="text"
                                            name="emp_add_long"
                                            value={newJob.emp_add_long}
                                            readOnly
                                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                                        />
                                    </div>
                                </div>

                                <div className="border rounded-md overflow-hidden h-96">
                                    <Map
                                        height={384}
                                        center={markerPosition}
                                        defaultZoom={15}
                                        onClick={handleMapClick}
                                    >
                                        <Marker width={50} anchor={markerPosition} />
                                    </Map>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200 sticky bottom-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 mr-3"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmploymentModal;
