import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { FaUser, FaGraduationCap, FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";

const Profile = () => {
    const { user, token } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [changePassword, setChangePassword] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user-account/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [user, token]);

    if (loading) return <div className="flex justify-center items-center h-screen text-gray-500 text-lg">Loading profile...</div>;
    if (!data) return <div className="text-center text-red-500 mt-6">Failed to load profile data.</div>;

    const { alumni } = data;
    const { alumni_education, address, employment_history, employment_status } = alumni;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Profile Card */}
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-6xl mx-auto mt-10 transition duration-300 ease-in-out">
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-2xl">ℹ️</span>
                        General Information
                    </h2>
                </div>

                <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-md">
                        {alumni.alm_first_name[0]}{alumni.alm_last_name[0]}
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {alumni.alm_first_name} {alumni.alm_last_name}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {employment_status.length > 0 ? (
                                employment_status[0].emp_info_status === 0
                                    ? "Unemployed"
                                    : employment_status[0].emp_info_status === 1
                                        ? "Freelancer"
                                        : employment_status[0].emp_info_status === 2
                                            ? "Employed"
                                            : "Unknown status"
                            ) : "Not employed"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                        <FaUser className="text-blue-500 text-xl" />
                        <p className="text-gray-800">
                            <span className="font-medium">Gender:</span> {alumni.alm_gender}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                        <FaPhone className="text-blue-500 text-xl" />
                        <p className="text-gray-800">
                            <span className="font-medium">Contact:</span> {alumni.alm_contact_number}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                        <FaEnvelope className="text-blue-500 text-xl" />
                        <p className="text-gray-800">
                            <span className="font-medium">Email:</span> {data.email}
                        </p>
                    </div>
                    <div
                        className="bg-gray-50 p-4 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => setChangePassword(true)}
                    >
                        <FaLock className="text-blue-500 text-xl" />
                        <p className="text-gray-800 font-medium">Change Password</p>
                    </div>
                </div>
            </div>


            {alumni_education && (
                <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                    <div className="bg-white shadow-xl rounded-2xl p-8 transition duration-300 ease-in-out">
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-800 mb-4">
                            <FaGraduationCap className="text-blue-600 text-2xl" />
                            Education
                        </h2>

                        <div className="space-y-2">
                            <p className="text-gray-800">
                                <span className="font-medium">Bachelor's Degree:</span>{' '}
                                {alumni_education?.courses?.course_name || 'Not specified'}
                            </p>
                            <p className="text-gray-800">
                                <span className="font-medium">Master's Degree:</span>{' '}
                                {alumni_education.alm_edu_masters_deg
                                    ? `${alumni_education.alm_edu_masters_deg} at ${alumni_education.alm_edu_masters_deg_school || 'Unknown School'}`
                                    : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            )}


            {/* Address */}
            {address && (
                <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                    <div className="bg-white shadow-xl rounded-2xl p-8 transition duration-300 ease-in-out">
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-800 mb-4">
                            <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                            Address
                        </h2>

                        <div className="space-y-2">
                            <p className="text-gray-800">
                                <span className="font-medium">Location:</span> {address.full_address}
                            </p>
                            <p className="text-gray-600 text-sm">
                                <span className="font-medium">Address:</span> {address.full_address}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Employment */}
            {employment_history.length > 0 && (
                <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                    <div className="bg-white shadow-xl rounded-2xl p-8 transition duration-300 ease-in-out">
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-800 mb-6">
                            <FaBuilding className="text-blue-600 text-2xl" />
                            Employment History
                        </h2>

                        <div className="space-y-6">
                            {employment_history.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 p-5 rounded-xl border border-gray-200"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <p className="text-gray-800">
                                            <span className="font-medium">Profession:</span> {job.job_title}
                                        </p>
                                        <p className="text-gray-800">
                                            <span className="font-medium">Company:</span> {job.company_name}
                                        </p>
                                        <p className="text-gray-800">
                                            <span className="font-medium">Start Date:</span> {job.start_date}
                                        </p>
                                        <p className="text-gray-800">
                                            <span className="font-medium">End Date:</span> {job.end_date || "Present"}
                                        </p>
                                        <p className="text-gray-600 col-span-full text-sm">
                                            <span className="font-medium">Work Location:</span> {job.address_employment?.full_address || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}


            {/* change password modal */}
            {/* Modal */}
            {changePassword && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                        <p className="text-gray-600 mb-4">This is just a placeholder modal.</p>
                        <div className="flex justify-end space-x-2">
                            <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => setChangePassword(false)}>Close</button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
