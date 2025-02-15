/* eslint-disable react-hooks/exhaustive-deps */


import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const DashboardAdmin = () => {
    const { user, token } = useAuth(); // Retrieve user and token
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchAlumniData();
        }
    }, [token]);

    const fetchAlumniData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/get-alumni", {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token for authentication
                    Accept: "application/json",
                },
            });

            setAlumni(response.data.data);
        } catch (error) {
            console.error("Error fetching alumni data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen p-6">
            <h1 className="text-2xl font-bold">Welcome to Admin Panel</h1>

            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold">User Info</h2>
                {user ? (
                    <div>
                        <p><strong>First Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>

            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold">Auth Token</h2>
                {token ? <p className="break-all">{token}</p> : <p>No token found</p>}
            </div>

            <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Alumni Data</h2>
                {loading ? (
                    <p className="text-gray-500">Loading alumni data...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">First Name</th>
                                    <th className="px-6 py-3 text-left">Last Name</th>
                                    <th className="px-6 py-3 text-left">Gender</th>
                                    <th className="px-6 py-3 text-left">Contact</th>
                                    <th className="px-6 py-3 text-left">Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alumni.length > 0 ? (
                                    alumni.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
                                        >
                                            <td className="px-6 py-4 text-gray-700">{item.alumni?.alm_first_name || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-700">{item.alumni?.alm_last_name || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-700">{item.alumni?.alm_gender || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-700">{item.alumni?.alm_contact_number || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-700">{item.alumni?.alm_date_created || "N/A"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center p-4 text-gray-500">No alumni data found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardAdmin;

