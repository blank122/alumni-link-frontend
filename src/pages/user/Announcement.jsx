import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiBell,
    FiCalendar,
    FiAlertCircle,
    FiClock
} from "react-icons/fi";

const Announcements = () => {
    const { token } = useAuth();
    const [announcements, setAnnouncementsPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/user-announcements`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                setAnnouncementsPosts(response.data.data);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            } finally {
                setLoading(false);
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
            month: 'long',
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
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <FiBell className="w-6 h-6 text-orange-500" />
                        </div>
                        <h1 className="text-3xl font-light text-gray-900 dark:text-white">Announcements</h1>
                    </div>
                    <div className="w-12 h-0.5 bg-orange-500"></div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3">
                        Stay updated with the latest news and important updates.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    </div>
                ) : announcements.length === 0 ? (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <FiBell className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No announcements available
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                            There are no announcements at the moment. Please check back later for updates.
                        </p>
                    </motion.div>
                ) : (
                    /* Announcements Grid */
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {announcements.map((announcement, index) => (
                            <motion.div
                                key={announcement.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer"
                                onClick={() => setSelectedAnnouncement(announcement)}
                            >
                                {/* Announcement Image */}
                                <div className="relative overflow-hidden">
                                    <img
                                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                        src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/announcements/${announcement.ann_image}`}
                                        alt={announcement.ann_title}
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-black bg-opacity-50 text-white rounded-full backdrop-blur-sm">
                                            <FiBell className="w-3 h-3 mr-1" />
                                            Announcement
                                        </span>
                                    </div>
                                </div>

                                {/* Announcement Content */}
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
                                        <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                                            <FiClock className="w-3 h-3 mr-1" />
                                            Click to read more
                                        </span>
                                        <motion.span
                                            whileHover={{ x: 3 }}
                                            className="text-orange-500 text-sm font-medium"
                                        >
                                            View Details →
                                        </motion.span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Announcement Modal */}
                <AnimatePresence>
                    {selectedAnnouncement && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                            onClick={() => setSelectedAnnouncement(null)}
                        >
                            <motion.div
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="relative">
                                    <img
                                        className="w-full h-64 object-cover"
                                        src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/announcements/${selectedAnnouncement.ann_image}`}
                                        alt={selectedAnnouncement.ann_title}
                                    />
                                    <button
                                        className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full backdrop-blur-sm hover:bg-opacity-70 transition-all"
                                        onClick={() => setSelectedAnnouncement(null)}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="p-8 overflow-y-auto max-h-96">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        <FiCalendar className="w-4 h-4 mr-2" />
                                        {formatDate(selectedAnnouncement.created_at)}
                                    </div>

                                    <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
                                        {selectedAnnouncement.ann_title}
                                    </h2>

                                    <div className="prose prose-gray dark:prose-invert max-w-none">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                                            {selectedAnnouncement.ann_details}
                                        </p>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-600">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <FiMegaphone className="w-4 h-4 mr-2" />
                                            Official Announcement
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-6 py-3 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                                            onClick={() => setSelectedAnnouncement(null)}
                                        >
                                            Close Announcement
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Announcements;