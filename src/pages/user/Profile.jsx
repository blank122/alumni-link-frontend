import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { FaUser, FaGraduationCap, FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLock, FaPlus, FaEdit } from "react-icons/fa";
import EmploymentModal from "./Components/EmploymentModal";
import AddressModal from "./Components/AddressModal";
import formatDate from "../../utils/helper";

const Profile = () => {
    const { user, token } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [changePassword, setChangePassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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
    const { alumni_education, address, employment_history, employment_status } = alumni;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-10 w-full max-w-6xl mx-auto px-4 overflow-hidden">
                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded-full">
                                <span className="text-blue-600">ℹ️</span>
                            </div>
                            General Information
                        </h2>
                        {/* <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Edit
                        </button> */}
                    </div>
                </div>

                {/* Profile Section */}
                <div className="p-6">
                    <div className="flex items-start gap-6">
                        <div className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-inner">
                            {alumni.alm_first_name[0]}{alumni.alm_last_name[0]}
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                                {alumni.alm_first_name} {alumni.alm_last_name}
                            </h1>

                            <div className="flex items-center gap-2 mb-4">
                                <span className={`inline-block w-3 h-3 rounded-full ${employment_status?.emp_info_status === '0' ? 'bg-red-500' :
                                    employment_status?.emp_info_status === '1' ? 'bg-yellow-500' :
                                        employment_status?.emp_info_status === '2' ? 'bg-green-500' :
                                            'bg-gray-500'
                                    }`}></span>
                                <p className="text-gray-600">
                                    {
                                        employment_status?.emp_info_status === '0' ? 'Currently unemployed' :
                                            employment_status?.emp_info_status === '1' ? 'Freelancing' :
                                                employment_status?.emp_info_status === '2' ? 'Currently employed' :
                                                    'Employment status not specified'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="bg-blue-50 p-2 rounded-full mt-1">
                                <FaUser className="text-blue-600 text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Gender</p>
                                <p className="text-gray-800 font-medium">{alumni.alm_gender || 'Not specified'}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="bg-blue-50 p-2 rounded-full mt-1">
                                <FaPhone className="text-blue-600 text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Contact</p>
                                <p className="text-gray-800 font-medium">{alumni.alm_contact_number || 'Not provided'}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="bg-blue-50 p-2 rounded-full mt-1">
                                <FaEnvelope className="text-blue-600 text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-gray-800 font-medium">{data.email}</p>
                            </div>
                        </div>

                        {/* <div
                            className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                            onClick={() => setChangePassword(true)}
                        >
                            <div className="bg-blue-50 p-2 rounded-full mt-1">
                                <FaLock className="text-blue-600 text-lg" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Password</p>
                                <p className="text-blue-600 font-medium">Change password</p>
                            </div>
                        </div> */}
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

            {address && (
                <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md border border-gray-100 overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-50 p-3 rounded-full">
                                        <FaMapMarkerAlt className="text-blue-600 text-xl" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">Address</h2>
                                </div>
                                <button
                                    onClick={() => setShowAddressModal(true)}
                                    className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                                    aria-label="Add address"
                                >
                                    <FaEdit className="text-lg" />
                                </button>
                            </div>

                            <div className="pl-14"> {/* Matches the icon + title alignment */}
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-start">
                                        <span className="text-gray-500 font-medium min-w-[80px]">Location:</span>
                                        <span className="text-gray-800">{address.full_address}</span>
                                    </div>

                                    {/* LinkedIn-style additional details (example) */}
                                    <div className="flex items-start">
                                        <span className="text-gray-500 font-medium min-w-[80px]">Type:</span>
                                        <span className="text-gray-800">Primary</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <AddressModal
                            isOpen={showAddressModal}
                            onClose={() => setShowAddressModal(false)}
                        />
                    </div>
                </div>
            )}

            {/* Employment */}
            <div className="mt-10 w-full max-w-6xl mx-auto px-4">
                <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <FaBuilding className="text-blue-600" />
                            Experience
                        </h2>
                        <button
                            onClick={() => setShowModal(true)}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                            title="Add experience"
                        >
                            <FaPlus />
                        </button>
                        <EmploymentModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                        />
                    </div>

                    {employment_history && employment_history.length > 0 ? (
                        <div className="space-y-4">
                            {employment_history.map((job) => (
                                <div key={job.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0 group">
                                    <div className="flex gap-4">
                                        <div className="mt-1">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <FaBuilding className="text-gray-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{job.job_title}</h3>
                                                    <p className="text-gray-600">{job.company_name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : "Present"}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        <FaMapMarkerAlt className="inline mr-1" />
                                                        {job.employment_address?.full_address || "Location not specified"}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleEditJob(job)} // You'll need to implement this function
                                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Edit experience"
                                                >
                                                    <FaEdit />
                                                </button>
                                            </div>
                                        </div>
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
