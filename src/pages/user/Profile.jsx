import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiUser,
    FiBriefcase,
    FiMapPin,
    FiPhone,
    FiMail,
    FiSettings,
    FiPlus,
    FiEdit,
    FiUsers,
    FiAward,
    FiCalendar,
    FiChevronRight,
    FiStar,
    FiTool,
    FiBookOpen 
} from "react-icons/fi";
import EmploymentModal from "./Components/EmploymentModal";
import AddressModal from "./Components/AddressModal";
import SkillsModal from "./Components/SkillsModal";
import formatDate from "../../utils/helper";

const Profile = () => {
    const { user, token } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showTechSkillsModal, setShowTechSkillsModal] = useState(false);
    const [showSoftSkillsModal, setShowSoftSkillsModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/alumni/${user.id}`, {
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

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { y: -2, transition: { duration: 0.2 } }
    };

    const getEmploymentStatus = (status) => {
        const statusConfig = {
            '0': { label: 'Unemployed', color: 'bg-red-500', bgColor: 'bg-red-50', textColor: 'text-red-700' },
            '1': { label: 'Freelancing', color: 'bg-yellow-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
            '2': { label: 'Employed', color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-700' }
        };
        return statusConfig[status] || { label: 'Not specified', color: 'bg-gray-400', bgColor: 'bg-gray-50', textColor: 'text-gray-700' };
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    );

    if (!data) return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
            <div className="text-center">
                <FiUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Failed to load profile data.</p>
            </div>
        </div>
    );

    const { alumni } = data;
    const { alumni_education, address, employment_history, employment_status, technicalskillslogs, softskillslogs, user_defined_soft_skills, user_defined_tech_skills, certifications } = alumni;
    const statusConfig = getEmploymentStatus(employment_status?.emp_info_status);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Profile Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold backdrop-blur-sm">
                                    {alumni.alm_first_name[0]}{alumni.alm_last_name[0]}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-light text-white">{alumni.alm_first_name} {alumni.alm_last_name}</h1>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <span className={`w-2 h-2 rounded-full ${statusConfig.color}`}></span>
                                        <span className="text-white/90 text-sm">{statusConfig.label}</span>
                                    </div>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 text-white/80 hover:text-white transition-colors"
                            >
                                <FiEdit className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
                        <div className="flex items-center space-x-4 p-6">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <FiUser className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                                <p className="font-medium text-gray-900 dark:text-white">{alumni.alm_gender || 'Not specified'}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-6">
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <FiPhone className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                                <p className="font-medium text-gray-900 dark:text-white">{alumni.alm_contact_number || 'Not provided'}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-6">
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <FiMail className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                <p className="font-medium text-gray-900 dark:text-white">{data.email}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Education */}
                {alumni_education && (
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <FiBookOpen className="w-6 h-6 text-blue-500" />
                                </div>
                                <h2 className="text-xl font-light text-gray-900 dark:text-white">Education</h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 mr-3">
                                        Bachelor's
                                    </span>
                                    <span className="text-gray-900 dark:text-white">{alumni_education?.courses?.course_name || 'Not specified'}</span>
                                </div>
                            </div>

                            {alumni_education.alm_edu_masters_deg && (
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                    <div>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 mr-3">
                                            Master's
                                        </span>
                                        <span className="text-gray-900 dark:text-white">
                                            {alumni_education.alm_edu_masters_deg} at {alumni_education.alm_edu_masters_deg_school || 'Unknown School'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Address */}
                {address && (
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                    <FiMapPin className="w-6 h-6 text-orange-500" />
                                </div>
                                <h2 className="text-xl font-light text-gray-900 dark:text-white">Address</h2>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowAddressModal(true)}
                                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                            >
                                <FiEdit className="w-5 h-5" />
                            </motion.button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                                <FiMapPin className="w-4 h-4 text-gray-400" />
                                <span>{address.full_address}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                                <FiUser className="w-4 h-4 text-gray-400" />
                                <span>Primary Address</span>
                            </div>
                        </div>
                        <AddressModal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} />
                    </motion.div>
                )}

                {/* Experience */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                <FiBriefcase className="w-6 h-6 text-indigo-500" />
                            </div>
                            <h2 className="text-xl font-light text-gray-900 dark:text-white">Experience</h2>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowModal(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            <FiPlus className="w-4 h-4" />
                            <span>Add</span>
                        </motion.button>
                    </div>

                    {employment_history && employment_history.length > 0 ? (
                        <div className="space-y-4">
                            {employment_history.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="w-3 h-3 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{job.job_title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{job.company_name}</p>
                                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <FiCalendar className="w-4 h-4" />
                                                <span>{formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : "Present"}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <FiMapPin className="w-4 h-4" />
                                                <span>{job.employment_address?.full_address || "Location not specified"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FiBriefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400 mb-3">No experience added yet</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowModal(true)}
                                className="text-blue-500 hover:text-blue-600 font-medium"
                            >
                                + Add your first experience
                            </motion.button>
                        </div>
                    )}
                </motion.div>

                {/* Technical Skills */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <FiTool className="w-6 h-6 text-red-500" />
                            </div>
                            <h2 className="text-xl font-light text-gray-900 dark:text-white">Technical Skills</h2>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowTechSkillsModal(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                            <FiPlus className="w-4 h-4" />
                            <span>Add</span>
                        </motion.button>
                    </div>

                    {(technicalskillslogs?.length > 0 || user_defined_tech_skills?.length > 0) ? (
                        <div className="flex flex-wrap gap-2">
                            {technicalskillslogs?.map((log) => (
                                <span key={log.id} className="inline-flex items-center px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                                    {log.technical_skills?.tch_skill_name}
                                </span>
                            ))}
                            {user_defined_tech_skills?.map((skill) => (
                                <span key={skill.id} className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                                    {skill.skill_name}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FiTool className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No technical skills added yet</p>
                        </div>
                    )}
                </motion.div>

                {/* Soft Skills */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <FiUsers className="w-6 h-6 text-purple-500" />
                            </div>
                            <h2 className="text-xl font-light text-gray-900 dark:text-white">Soft Skills</h2>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowSoftSkillsModal(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                        >
                            <FiPlus className="w-4 h-4" />
                            <span>Add</span>
                        </motion.button>
                    </div>

                    {(softskillslogs?.length > 0 || user_defined_soft_skills?.length > 0) ? (
                        <div className="flex flex-wrap gap-2">
                            {softskillslogs?.map((log) => (
                                <span key={log.id} className="inline-flex items-center px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                                    {log.soft_skill?.sft_skill_name}
                                </span>
                            ))}
                            {user_defined_soft_skills?.map((skill) => (
                                <span key={skill.id} className="inline-flex items-center px-3 py-1 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium">
                                    {skill.skill_name}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No soft skills added yet</p>
                        </div>
                    )}
                </motion.div>

                {/* Certifications */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                <FiAward className="w-6 h-6 text-yellow-500" />
                            </div>
                            <h2 className="text-xl font-light text-gray-900 dark:text-white">Certifications</h2>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowSoftSkillsModal(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                        >
                            <FiPlus className="w-4 h-4" />
                            <span>Add</span>
                        </motion.button>
                    </div>

                    {certifications?.length > 0 ? (
                        <div className="space-y-4">
                            {certifications.map((log, index) => (
                                <motion.div
                                    key={log.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FiAward className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{log.cert_name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Serial: {log.cert_serial_no}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Awarded: {log.cert_awarded}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            Added on {new Date(log.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FiAward className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No certifications added yet</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Modals */}
            <EmploymentModal isOpen={showModal} onClose={() => setShowModal(false)} />
            <SkillsModal isOpen={showTechSkillsModal} onClose={() => setShowTechSkillsModal(false)} />
            <AddressModal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} />
        </div>
    );
};

export default Profile;