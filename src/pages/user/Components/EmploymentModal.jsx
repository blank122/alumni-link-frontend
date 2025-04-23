import React, { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { useGeolocated } from "react-geolocated";
import { useAuth } from "../../../contexts/AuthContext";

const EmploymentModal = ({ isOpen, onClose }) => {
    const { user, token } = useAuth();

    const [employmentType, setEmploymentType] = useState("2");
    const [markerPosition, setMarkerPosition] = useState([10.3157, 123.8854]);
    const [isLoading, setIsLoading] = useState(false);

    const [newJob, setNewJob] = useState({
        emp_status: "",
        job_title: "",
        company_name: "",
        start_date: "",
        end_date: "",
        emp_full_address: "",
        emp_add_lat: "",
        emp_add_long: "",
    });

    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg p-6 max-h-[95vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add Employment</h2>

                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Employment Type</label>
                    <select
                        value={employmentType}
                        onChange={handleEmploymentTypeChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="2">Full-time Employment</option>
                        <option value="1">Freelancing/Part-time</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Job Title</label>
                    <input
                        type="text"
                        name="job_title"
                        value={newJob.job_title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Company Name</label>
                    <input
                        type="text"
                        name="company_name"
                        value={newJob.company_name}
                        onChange={handleInputChange}
                        readOnly={employmentType === "1"}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        name="start_date"
                        value={newJob.start_date}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        name="end_date"
                        value={newJob.end_date}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Show map fields only for full_time */}
                {employmentType === "2" && (
                    <>
                        <div className="mb-4">
                            <label className="block font-medium text-gray-700">Full Address</label>
                            <input
                                type="text"
                                name="emp_full_address"
                                value={newJob.emp_full_address}
                                onChange={handleInputChange}
                                placeholder="Enter address"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="emp_add_lat"
                                value={newJob.emp_add_lat}
                                readOnly
                                placeholder="Latitude"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="emp_add_long"
                                value={newJob.emp_add_long}
                                readOnly
                                placeholder="Longitude"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-6 border rounded-md overflow-hidden">
                            <Map
                                height={300}
                                center={markerPosition}
                                defaultZoom={15}
                                onClick={handleMapClick}
                            >
                                <Marker width={50} anchor={markerPosition} />
                            </Map>
                        </div>
                    </>
                )}

                <div className="flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmploymentModal;
