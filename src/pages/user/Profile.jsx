import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { FaUser, FaGraduationCap, FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCogs, FaPlus, FaEdit, FaHandsHelping, FaCertificate } from "react-icons/fa";
import EmploymentModal from "./Components/EmploymentModal";
import AddressModal from "./Components/AddressModal";
import SkillsModal from "./Components/SkillsModal";

import formatDate from "../../utils/helper";

const Profile = () => {
    const { user, token } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [changePassword, setChangePassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showTechSkillsModal, setShowTechSkillsModal] = useState(false);
    const [showSoftSkillsModal, setShowSoftSkillsModal] = useState(false);

    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/alumni/${user.id}`
                    , {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    });
                setData(response.data.data);
                console.log(response.data.data);
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
    const { alumni_education, address, employment_history, employment_status, technicalskillslogs, softskillslogs, user_defined_soft_skills, user_defined_tech_skills, certifications } = alumni;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Profile Card */}
            <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                            <span className="bg-white/20 p-2 rounded-full">ℹ️</span>
                            General Information
                        </h2>
                        {/* <button className="bg-white/20 px-3 py-1 rounded-md text-white hover:bg-white/30 text-sm">Edit</button> */}
                    </div>

                    {/* Profile Section */}
                    <div className="p-6 flex items-start gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-blue-400 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                            {alumni.alm_first_name[0]}{alumni.alm_last_name[0]}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-800">{alumni.alm_first_name} {alumni.alm_last_name}</h1>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`w-3 h-3 rounded-full ${employment_status?.emp_info_status === '0' ? 'bg-red-500' :
                                    employment_status?.emp_info_status === '1' ? 'bg-yellow-500' :
                                        employment_status?.emp_info_status === '2' ? 'bg-green-500' :
                                            'bg-gray-400'
                                    }`}></span>
                                <p className="text-gray-600 text-sm">
                                    {employment_status?.emp_info_status === '0' ? 'Unemployed' :
                                        employment_status?.emp_info_status === '1' ? 'Freelancing' :
                                            employment_status?.emp_info_status === '2' ? 'Employed' :
                                                'Not specified'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-100">
                        <div className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50">
                            <FaUser className="text-blue-500" />
                            <div>
                                <p className="text-xs text-gray-500">Gender</p>
                                <p className="font-medium text-gray-800">{alumni.alm_gender || 'Not specified'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50">
                            <FaPhone className="text-blue-500" />
                            <div>
                                <p className="text-xs text-gray-500">Contact</p>
                                <p className="font-medium text-gray-800">{alumni.alm_contact_number || 'Not provided'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50">
                            <FaEnvelope className="text-blue-500" />
                            <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="font-medium text-gray-800">{data.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {alumni_education && (
                <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                    <div className="bg-white shadow-xl rounded-2xl p-8 transition duration-300 ease-in-out">
                        <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800 mb-4">
                            <FaGraduationCap className="text-blue-600" />
                            Education
                        </h2>

                        <div className="space-y-3">
                            <p className="text-gray-800">
                                <span className="font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs mr-2">Bachelor’s</span>
                                {alumni_education?.courses?.course_name || 'Not specified'}
                            </p>
                            <p className="text-gray-800">
                                <span className="font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs mr-2">Master’s</span>
                                {alumni_education.alm_edu_masters_deg
                                    ? `${alumni_education.alm_edu_masters_deg} at ${alumni_education.alm_edu_masters_deg_school || 'Unknown School'}`
                                    : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* address */}
            {address && (
                <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                    <div className="bg-white shadow-xl rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                                <FaMapMarkerAlt className="text-blue-600" />
                                Address
                            </h2>
                            <button
                                onClick={() => setShowAddressModal(true)}
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition"
                            >
                                <FaEdit />
                            </button>
                        </div>
                        <div className="pl-10 space-y-2">
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="text-gray-800">{address.full_address}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Type</p>
                                <p className="text-gray-800">Primary</p>
                            </div>
                        </div>
                        <AddressModal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} />
                    </div>
                </div>
            )}

            {/* Employment */}
            <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                            <FaBuilding className="text-blue-600" />
                            Experience
                        </h2>
                        <button
                            onClick={() => setShowModal(true)}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition"
                        >
                            <FaPlus />
                        </button>
                    </div>


                    {employment_history && employment_history.length > 0 ? (
                        <div className="relative border-l border-gray-200 pl-6 space-y-6">
                            {employment_history.map((job) => (
                                <div key={job.id} className="relative">
                                    <span className="absolute -left-3 top-2 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                    </span>
                                    <div className="px-7">
                                        <h3 className="font-semibold text-gray-800">{job.job_title}</h3>
                                        <p className="text-gray-600">{job.company_name}</p>
                                        <p className="text-sm text-gray-500">
                                            {formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : "Present"}
                                        </p>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <FaMapMarkerAlt className="text-gray-400" />
                                            {job.employment_address?.full_address || "Location not specified"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p className="mb-2">No experience added yet</p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="text-blue-500 hover:text-blue-700 font-medium"
                            >
                                + Add experience
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Technical Skills */}
            <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                            <FaCogs className="text-blue-600" />
                            Technical Skills
                        </h2>
                        <button
                            onClick={() => setShowTechSkillsModal(true)}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition"
                        >
                            <FaPlus />
                        </button>
                    </div>


                    {/* Check if there are any skills (predefined or user-defined) */}
                    {(technicalskillslogs?.length > 0 || user_defined_tech_skills?.length > 0) ? (
                        <div className="flex flex-wrap gap-2">
                            {technicalskillslogs?.map((log) => (
                                <span key={log.id} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                    {log.technical_skills?.tch_skill_name}
                                </span>
                            ))}
                            {user_defined_tech_skills?.map((skill) => (
                                <span key={skill.id} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                                    {skill.skill_name}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No technical skills added yet</p>
                    )}
                </div>
            </div>

            {/* Soft Skills */}
            <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                <div className="bg-white shadow-xl rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                            <FaHandsHelping className="text-blue-600" />
                            Soft Skills
                        </h2>
                        <button
                            onClick={() => setShowSoftSkillsModal(true)}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition"
                        >
                            <FaPlus />
                        </button>
                    </div>

                    {(softskillslogs?.length > 0 || user_defined_soft_skills?.length > 0) ? (
                        <div className="flex flex-wrap gap-2">
                            {softskillslogs?.map((log) => (
                                <span key={log.id} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                                    {log.soft_skill?.sft_skill_name}
                                </span>
                            ))}
                            {user_defined_soft_skills?.map((skill) => (
                                <span key={skill.id} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">
                                    {skill.skill_name}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No soft skills added yet</p>
                    )}
                </div>
            </div>

            {/* certifications */}
            <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                <div className="bg-white shadow-xl rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                            <FaCertificate className="text-blue-600" />
                            Certifications
                        </h2>
                        <button
                            onClick={() => setShowSoftSkillsModal(true)}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition"
                        >
                            <FaPlus />
                        </button>
                    </div>

                    {certifications?.length > 0 ? (
                        <div className="space-y-4">
                            {certifications.map((log) => (
                                <div key={log.id} className="p-4 border rounded-lg hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-800">{log.cert_name}</h3>
                                    <p className="text-sm text-gray-600">Serial: {log.cert_serial_no}</p>
                                    <p className="text-sm text-gray-600">Awarded: {log.cert_awarded}</p>
                                    <p className="text-xs text-gray-500 mt-1">Added on {new Date(log.created_at).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No certifications added yet</p>
                    )}
                </div>
            </div>

            {/* change password modal */}
            {changePassword && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Add New Job</h3>

                        <form>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setChangePassword(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                {/* <button
                                    type="button"
                                    onClick={handleAddJob}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add Job
                                </button> */}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
