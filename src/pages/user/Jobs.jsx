import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiBriefcase,
    FiCalendar,
    FiPlus,
    FiX,
    FiFileText,
    FiUpload,
    FiAlertCircle,
    FiClock,
    FiEye
} from "react-icons/fi";
import formatDate from "../../utils/helper";

const Jobs = () => {
    const { user, token } = useAuth();
    const [jobs, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [postLoading, setPostLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [jobTitle, setJobTitle] = useState("");
    const [jobDetails, setJobDetails] = useState("");
    const [jobImage, setJobImage] = useState(null);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/user-jobs`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                setJobPosts(response.data.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleCreateJob = async (e) => {
        e.preventDefault();
        setPostLoading(true);

        const formData = new FormData();
        formData.append("job_title", jobTitle);
        formData.append("job_details", jobDetails);
        formData.append("account_id", user.id);
        if (jobImage) formData.append("job_image", jobImage);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/user-jobs`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

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
        visible: { opacity: 1, y: 0 },
        hover: { y: -4, transition: { duration: 0.2 } }
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
                            <h1 className="text-3xl font-light text-gray-900 dark:text-white">Job Posts</h1>
                        </div>
                        <div className="w-12 h-0.5 bg-indigo-500"></div>
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

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    </div>
                ) : jobs.length === 0 ? (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <FiBriefcase className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No job posts available
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                            There are no job posts available right now. Please check back later.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowModal(true)}
                            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            <FiPlus className="w-4 h-4" />
                            <span>Create First Job Post</span>
                        </motion.button>
                    </motion.div>
                ) : (
                    /* Jobs Grid */
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {jobs.map((job, index) => (
                            <motion.div
                                key={job.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                            >
                                {/* Job Image */}
                                <div className="relative overflow-hidden">
                                    <img
                                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                        src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/job_posts/${job.job_image}`}
                                        alt={job.job_title}
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-black bg-opacity-50 text-white rounded-full backdrop-blur-sm">
                                            <FiBriefcase className="w-3 h-3 mr-1" />
                                            Job Post
                                        </span>
                                    </div>
                                </div>

                                {/* Job Content */}
                                <div className="p-6">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        <FiCalendar className="w-4 h-4 mr-1" />
                                        {new Date(job.created_at).toLocaleDateString()}
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                        {job.job_title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                                        {job.job_details}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                                            <FiClock className="w-3 h-3 mr-1" />
                                            Posted {formatDate(job.created_at)}
                                        </span>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedPost(job)}
                                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                                        >
                                            <FiEye className="w-4 h-4" />
                                            <span>View</span>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Create Job Modal */}
                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
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

                {/* Job Details Modal */}
                <AnimatePresence>
                    {selectedPost && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                            onClick={() => setSelectedPost(null)}
                        >
                            <motion.div
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="relative">
                                    <img
                                        className="w-full h-64 object-cover"
                                        src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/job_posts/${selectedPost.job_image}`}
                                        alt={selectedPost.job_title}
                                    />
                                    <button
                                        className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full backdrop-blur-sm hover:bg-opacity-70 transition-all"
                                        onClick={() => setSelectedPost(null)}
                                    >
                                        <FiX className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="p-8 overflow-y-auto max-h-96">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        <FiCalendar className="w-4 h-4 mr-2" />
                                        Posted on {formatDate(selectedPost.created_at)}
                                    </div>

                                    <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
                                        {selectedPost.job_title}
                                    </h2>

                                    <div className="prose prose-gray dark:prose-invert max-w-none">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                                            {selectedPost.job_details}
                                        </p>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-600">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                                        onClick={() => setSelectedPost(null)}
                                    >
                                        Close Job Details
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Jobs;