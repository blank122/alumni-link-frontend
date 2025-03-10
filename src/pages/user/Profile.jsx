import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { FaUser, FaGraduationCap, FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Profile = () => {
    const { user, token } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

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
    const { education, address, employment_infos } = alumni;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-8xl">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                        {alumni.alm_first_name[0]}{alumni.alm_last_name[0]}
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold">{alumni.alm_first_name} {alumni.alm_last_name}</h1>
                        <p className="text-gray-500 text-sm">{employment_infos.length > 0 ? employment_infos[0].emp_info_profession : "Not employed"}</p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Personal Info */}
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                        <FaUser className="text-blue-500 text-xl" />
                        <p className="text-gray-700"><strong>Gender:</strong> {alumni.alm_gender}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                        <FaPhone className="text-blue-500 text-xl" />
                        <p className="text-gray-700"><strong>Contact:</strong> {alumni.alm_contact_number}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
                        <FaEnvelope className="text-blue-500 text-xl" />
                        <p className="text-gray-700"><strong>Email:</strong> {data.email}</p>
                    </div>
                </div>
            </div>

            {/* Education */}
            {education && (
                <div className="mt-6 w-full max-w-8xl">
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-xl font-semibold flex items-center space-x-2">
                            <FaGraduationCap className="text-blue-500" /> <span>Education</span>
                        </h2>
                        <p className="mt-2 text-gray-700"><strong>Bachelor&apos;s Degree:</strong> {education.edu_att_bs_deg} ({education.edu_att_bs_deg_grad})</p>
                        {education.edu_att_masters_deg && (
                            <p className="text-gray-700"><strong>Master&apos;s Degree:</strong> {education.edu_att_masters_deg} at {education.edu_att_masters_deg_school}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Address */}
            {address && (
                <div className="mt-6 w-full max-w-8xl">
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-xl font-semibold flex items-center space-x-2">
                            <FaMapMarkerAlt className="text-blue-500" /> <span>Address</span>
                        </h2>
                        <p className="mt-2 text-gray-700"><strong>Location:</strong> {address.full_address}</p>
                        <p className="text-gray-500 text-sm">Coordinates: {address.add_lat}, {address.add_long}</p>
                    </div>
                </div>
            )}

            {/* Employment */}
            {employment_infos.length > 0 && (
                <div className="mt-6 w-full max-w-8xl">
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-xl font-semibold flex items-center space-x-2">
                            <FaBuilding className="text-blue-500" /> <span>Employment</span>
                        </h2>
                        {employment_infos.map((job) => (
                            <div key={job.id} className="mt-4 bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700"><strong>Profession:</strong> {job.emp_info_profession}</p>
                                <p className="text-gray-700"><strong>Company:</strong> {job.company_name}</p>
                                <p className="text-gray-700"><strong>Start Date:</strong> {job.start_date}</p>
                                <p className="text-gray-500 text-sm"><strong>Work Location:</strong> {job.address_employment?.full_address || "N/A"}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
