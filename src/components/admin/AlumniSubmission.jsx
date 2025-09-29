import { useEffect, useState } from "react";
import createApiClient from '../../api/ApiService';
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, 
  FiMapPin, 
  FiTool, 
  FiUsers, 
  FiBook, 
  FiBriefcase, 
  FiAward, 
  FiX,
  FiCheck,
  FiXCircle,
  FiMail,
  FiPhone,
  FiCalendar,
  FiNavigation
} from "react-icons/fi";

const AlumniSubmission = ({ userData, onClose, accountID }) => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userData) {
            console.log(
                "🔍 userData inside AlumniSubmission:",
                JSON.stringify(userData, null, 2)
            );
        }
    }, [userData]);

    if (!userData) return null;

    const employmentStatusMap = {
        "0": "Unemployed",
        "1": "Freelance",
        "2": "Employed",
    };

    const handleStatusUpdate = async (status) => {
        try {
            setLoading(true);
            const api = createApiClient(token);
            const res = await api.updateAccountStatus(accountID, status);
            console.log("✅ API response:", res.data);
            alert(`Account ${status === "2" ? "approved" : "rejected"} successfully and email sent!`);
            onClose();
        } catch (err) {
            console.error("❌ Error updating account status:", err);
            alert("Failed to update status. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const InfoCard = ({ icon: Icon, title, children, color = "blue" }) => {
        const colorClasses = {
            blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-500",
            green: "bg-green-50 dark:bg-green-900/20 text-green-500",
            purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-500",
            amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-500",
            indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500",
            sky: "bg-sky-50 dark:bg-sky-900/20 text-sky-500"
        };

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
            >
                <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl ${colorClasses[color]} mr-3`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                </div>
                <div className="space-y-4">
                    {children}
                </div>
            </motion.div>
        );
    };

    const InfoField = ({ label, value, icon: Icon }) => (
        <div className="flex items-start space-x-3">
            {Icon && <Icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                <p className="text-gray-900 dark:text-white font-medium">
                    {value || <span className="text-gray-400">N/A</span>}
                </p>
            </div>
        </div>
    );

    const SkillsList = ({ skills, type }) => (
        <div className="flex flex-wrap gap-2">
            {skills?.length > 0 ? (
                skills.map((log) => (
                    <span
                        key={log.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                        {type === 'technical' 
                            ? log.technical_skills?.tch_skill_name
                            : log.soft_skill?.sft_skill_name
                        }
                    </span>
                ))
            ) : (
                <span className="text-gray-400 text-sm">No {type} skills added</span>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Review Alumni Information
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Please verify all details before approving the alumni registration
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Personal Details */}
                            <InfoCard icon={FiUser} title="Personal Details" color="blue">
                                <InfoField 
                                    label="Full Name" 
                                    value={`${userData.alm_first_name} ${userData.alm_last_name}`}
                                    icon={FiUser}
                                />
                                <InfoField 
                                    label="Email Address" 
                                    value={userData.email}
                                    icon={FiMail}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoField 
                                        label="Gender" 
                                        value={userData.alm_gender}
                                    />
                                    <InfoField 
                                        label="Contact Number" 
                                        value={userData.alm_contact_number}
                                        icon={FiPhone}
                                    />
                                </div>
                            </InfoCard>

                            {/* Address */}
                            <InfoCard icon={FiMapPin} title="Address" color="green">
                                <InfoField 
                                    label="Full Address" 
                                    value={userData.address?.full_address}
                                    icon={FiMapPin}
                                />
                                <InfoField 
                                    label="Coordinates" 
                                    value={userData.address ? `${userData.address.add_lat}, ${userData.address.add_long}` : null}
                                    icon={FiNavigation}
                                />
                            </InfoCard>

                            {/* Skills */}
                            <InfoCard icon={FiTool} title="Skills" color="indigo">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Technical Skills</p>
                                    <SkillsList skills={userData.technicalskillslogs} type="technical" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Soft Skills</p>
                                    <SkillsList skills={userData.softskillslogs} type="soft" />
                                </div>
                            </InfoCard>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Education */}
                            <InfoCard icon={FiBook} title="Education" color="purple">
                                <InfoField 
                                    label="Alumni ID" 
                                    value={userData.alumni_education?.school_id}
                                />
                                <InfoField 
                                    label="Degree Program" 
                                    value={userData.alumni_education?.courses?.course_name}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InfoField 
                                        label="Year Graduated" 
                                        value={userData.alumni_education?.alm_edu_grad_year}
                                        icon={FiCalendar}
                                    />
                                    <InfoField 
                                        label="Masters Degree" 
                                        value={userData.alumni_education?.alm_edu_masters_deg}
                                    />
                                </div>
                                <InfoField 
                                    label="Institution" 
                                    value={userData.alumni_education?.alm_edu_masters_deg_school}
                                />
                            </InfoCard>

                            {/* Employment */}
                            <InfoCard icon={FiBriefcase} title="Employment" color="amber">
                                <InfoField 
                                    label="Employment Status" 
                                    value={employmentStatusMap[userData?.employment_status?.emp_info_status] || "Unknown"}
                                />
                                {userData.emp_status == 2 && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <InfoField 
                                                label="Company" 
                                                value={userData.company_name}
                                            />
                                            <InfoField 
                                                label="Job Title" 
                                                value={userData.job_title}
                                            />
                                        </div>
                                        <InfoField 
                                            label="Start Date" 
                                            value={userData.start_date}
                                            icon={FiCalendar}
                                        />
                                        <InfoField 
                                            label="Company Address" 
                                            value={userData.emp_full_address}
                                            icon={FiMapPin}
                                        />
                                        <InfoField 
                                            label="Coordinates" 
                                            value={userData.emp_lat && userData.emp_long ? `${userData.emp_lat}, ${userData.emp_long}` : null}
                                            icon={FiNavigation}
                                        />
                                    </>
                                )}
                            </InfoCard>

                            {/* Certificates */}
                            <InfoCard icon={FiAward} title="Certificates" color="sky">
                                <InfoField 
                                    label="Certificate Serial No." 
                                    value={userData.cert_serial_no}
                                />
                                <InfoField 
                                    label="Certificate Name" 
                                    value={userData.cert_name}
                                />
                                <InfoField 
                                    label="Awarded Date" 
                                    value={userData.cert_awarded}
                                    icon={FiCalendar}
                                />
                            </InfoCard>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                        Cancel
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        onClick={() => handleStatusUpdate("0")}
                        className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        <FiXCircle className="w-4 h-4" />
                        <span>{loading ? "Processing..." : "Reject"}</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        onClick={() => handleStatusUpdate("2")}
                        className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        <FiCheck className="w-4 h-4" />
                        <span>{loading ? "Processing..." : "Approve"}</span>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default AlumniSubmission;