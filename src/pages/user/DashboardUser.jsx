import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiBriefcase,
    FiBell,
    FiCalendar,
    FiEye,
    FiX,
    FiTrendingUp,
    FiUsers,
    FiAward
} from "react-icons/fi";

const DashboardUser = () => {
    const { token, user } = useAuth();
    const [jobs, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [announcements, setAnnouncementsPosts] = useState([]);
    const [loadingAnnouncement, setLoadingAnnouncement] = useState(true);
    const [stats, setStats] = useState({
        totalJobs: 0,
        totalAnnouncements: 0,
        newOpportunities: 0
    });

    // Fetch latest jobs
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/latest-jobs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setJobPosts(response.data.data);
                setStats(prev => ({ ...prev, totalJobs: response.data.data.length }));
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    // Fetch latest announcements
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/latest-announcements`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setAnnouncementsPosts(response.data.data);
                setStats(prev => ({ ...prev, totalAnnouncements: response.data.data.length }));
            } catch (error) {
                console.error("Error fetching announcements:", error);
            } finally {
                setLoadingAnnouncement(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-2">
                        Welcome back, {user?.name || 'User'}!
                    </h1>
                    <div className="w-16 h-0.5 bg-blue-500 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Here's what's happening in your alumni community.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                >
                    {/* Jobs Stat */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Jobs</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalJobs}</p>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <FiBriefcase className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Announcements Stat */}
                    <motion.div
                        variants={cardVariants}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Announcements</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalAnnouncements}</p>
                            </div>
                            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                <FiBell className="w-6 h-6 text-orange-500" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Opportunities Stat */}
                    <motion.div
                        variants={cardVariants}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New This Week</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.newOpportunities}</p>
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <FiTrendingUp className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Latest Job Opportunities Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                <FiBriefcase className="w-6 h-6 text-indigo-500" />
                            </div>
                            <h2 className="text-2xl font-light text-gray-900 dark:text-white">Latest Job Opportunities</h2>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : jobs.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <FiBriefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">No job opportunities available at the moment.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {jobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer"
                                    onClick={() => setSelectedPost(job)}
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                            src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/job_posts/${job.job_image}`}
                                            alt={job.job_title}
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-black bg-opacity-50 text-white rounded-full backdrop-blur-sm">
                                                <FiBriefcase className="w-3 h-3 mr-1" />
                                                Job
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                            <FiCalendar className="w-4 h-4 mr-1" />
                                            {formatDate(job.created_at)}
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                            {job.job_title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                                            {job.job_details}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                Posted {formatDate(job.created_at)}
                                            </span>
                                            <motion.span
                                                whileHover={{ x: 3 }}
                                                className="text-indigo-500 text-sm font-medium"
                                            >
                                                View Details →
                                            </motion.span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                {/* Latest Announcements Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                <FiBell className="w-6 h-6 text-orange-500" />
                            </div>
                            <h2 className="text-2xl font-light text-gray-900 dark:text-white">Latest Announcements</h2>
                        </div>
                    </div>

                    {loadingAnnouncement ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                        </div>
                    ) : announcements.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <FiBell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">No announcements available at the moment.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {announcements.map((announcement, index) => (
                                <motion.div
                                    key={announcement.id}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                            src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/announcements/${announcement.ann_image}`}
                                            alt={announcement.ann_title}
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-black bg-opacity-50 text-white rounded-full backdrop-blur-sm">
                                                <FiBell className="w-3 h-3 mr-1" />
                                                News
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                            <FiCalendar className="w-4 h-4 mr-1" />
                                            {formatDate(announcement.created_at)}
                                        </div>

                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                            {announcement.ann_title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                                            {announcement.ann_details}
                                        </p>

                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                Posted {formatDate(announcement.created_at)}
                                            </span>
                                            <motion.span
                                                whileHover={{ x: 3 }}
                                                className="text-orange-500 text-sm font-medium"
                                            >
                                                Read More →
                                            </motion.span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                {/* Job Details Modal */}
                <AnimatePresence>
                    {selectedPost && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
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

export default DashboardUser;