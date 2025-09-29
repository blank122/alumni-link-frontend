import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiBriefcase,
    FiPlus,
    FiX,
    FiUpload,
    FiCalendar,
    FiEdit,
    FiTrash2,
    FiImage,
    FiFileText
} from "react-icons/fi";
import formatDate from "../../utils/helper";

const Jobs = () => {
    const { user, token } = useAuth();
    const [jobsPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postLoading, setPostLoading] = useState(false);

    // Form State
    const [jobTitle, setJobTitle] = useState("");
    const [jobDetails, setJobDetails] = useState("");
    const [jobImage, setJobImage] = useState(null);

    useEffect(() => {
        const fetchJobPost = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/jobs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setJobPosts(response.data.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchJobPost();
        }
    }, [token]);

    // Handle Form Submission
    const handleCreateJob = async (e) => {
        e.preventDefault();
        setPostLoading(true);

        const formData = new FormData();
        formData.append("job_title", jobTitle);
        formData.append("job_details", jobDetails);
        formData.append("account_id", user.id);
        if (jobImage) formData.append("job_image", jobImage);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/jobs`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                window.location.reload();
                alert("Job created successfully!");
                setShowModal(false);
                setJobTitle("");
                setJobDetails("");
                setJobImage(null);
            }
        } catch (error) {
            console.error("Error creating job:", error);
        } finally {
            setPostLoading(false);
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-8"
                >
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                <FiBriefcase className="w-6 h-6 text-indigo-500" />
                            </div>
                            <h1 className="text-3xl font-light text-gray-900 dark:text-white">Job Posts Management</h1>
                        </div>
                        <div className="w-12 h-0.5 bg-indigo-500"></div>
                        <p className="text-gray-600 dark:text-gray-400 mt-3">
                            Manage and create job postings for alumni opportunities.
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowModal(true)}
                        className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-sm hover:bg-indigo-700 transition-all duration-300 font-medium"
                    >
                        <FiPlus className="w-5 h-5" />
                        <span>Create Job</span>
                    </motion.button>
                </motion.div>

                {/* Jobs Table */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Job Listings</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {jobsPosts.length} job posting{jobsPosts.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Job Details
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Date Posted
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {jobsPosts.length > 0 ? (
                                        jobsPosts.map((item, index) => (
                                            <motion.tr
                                                key={item.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                            >
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                            {item.job_title || "N/A"}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                                            {item.job_details || "No details provided"}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.job_image ? (
                                                        <div className="relative group">
                                                            <img
                                                                src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/job_posts/${item.job_image}`}
                                                                alt="Job Post"
                                                                className="w-16 h-16 object-cover rounded-lg shadow-sm transition-transform group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all flex items-center justify-center">
                                                                <FiImage className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                                            <FiImage className="w-6 h-6 text-gray-400" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                        <FiCalendar className="w-4 h-4 mr-2" />
                                                        {formatDate(item.created_at)}
                                                    </div>
                                                </td>

                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <FiBriefcase className="w-12 h-12 text-gray-400 mb-3" />
                                                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No job posts found</p>
                                                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                                                        Get started by creating your first job posting.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>

                {/* Create Job Modal */}
                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                            onClick={() => setShowModal(false)}
                        >
                            <motion.div
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <FiBriefcase className="w-5 h-5 text-indigo-500" />
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Create Job Post
                                        </h2>
                                    </div>
                                    <button
                                        className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <FiX className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Modal Form */}
                                <form onSubmit={handleCreateJob} className="p-6 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Job Title
                                        </label>
                                        <input
                                            type="text"
                                            value={jobTitle}
                                            onChange={(e) => setJobTitle(e.target.value)}
                                            required
                                            disabled={postLoading}
                                            placeholder="Enter job title..."
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Job Details
                                        </label>
                                        <textarea
                                            value={jobDetails}
                                            onChange={(e) => setJobDetails(e.target.value)}
                                            required
                                            disabled={postLoading}
                                            rows={4}
                                            placeholder="Describe the job position, requirements, and details..."
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Job Image
                                        </label>
                                        <div className="flex items-center space-x-3">
                                            <label className="flex-1 cursor-pointer">
                                                <input
                                                    type="file"
                                                    onChange={(e) => setJobImage(e.target.files[0])}
                                                    disabled={postLoading}
                                                    className="hidden"
                                                    accept="image/*"
                                                />
                                                <div className="flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-indigo-400 transition-colors">
                                                    <FiUpload className="w-5 h-5 text-gray-400" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {jobImage ? jobImage.name : "Upload job image"}
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Modal Actions */}
                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <motion.button
                                            type="button"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setShowModal(false)}
                                            disabled={postLoading}
                                            className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={postLoading}
                                            className="flex items-center space-x-2 px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                        >
                                            {postLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    <span>Creating...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FiPlus className="w-4 h-4" />
                                                    <span>Create Job</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Jobs;