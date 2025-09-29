import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiCalendar,
    FiX,
    FiEye,
    FiClock,
    FiAlertCircle
} from "react-icons/fi";

const Events = () => {
    const { token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/user-events`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                setPosts(response.data.data);
            } catch (error) {
                console.error("Error fetching events:", error);
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
                        Events
                    </h1>
                    <div className="w-12 h-0.5 bg-blue-500"></div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : posts.length === 0 ? (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <FiAlertCircle className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No events available
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                            There are no events scheduled at the moment. Please check back later for updates.
                        </p>
                    </motion.div>
                ) : (
                    /* Events Grid */
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                            >
                                {/* Event Image */}
                                <div className="relative overflow-hidden">
                                    <img
                                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                        src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/event_images/${post.event_image}`}
                                        alt="Event"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="px-2 py-1 text-xs font-medium bg-black bg-opacity-50 text-white rounded-full backdrop-blur-sm">
                                            <FiCalendar className="inline w-3 h-3 mr-1" />
                                            {new Date(post.event_date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* Event Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                        {post.event_title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                                        {post.event_details}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <FiClock className="w-4 h-4 mr-1" />
                                            {new Date(post.event_date).toLocaleDateString()}
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedEvent(post)}
                                            className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                        >
                                            <FiEye className="w-4 h-4 mr-2" />
                                            View
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Modal */}
                <AnimatePresence>
                    {selectedEvent && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                            onClick={() => setSelectedEvent(null)}
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
                                        src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/event_images/${selectedEvent.event_image}`}
                                        alt={selectedEvent.event_title}
                                    />
                                    <button
                                        className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full backdrop-blur-sm hover:bg-opacity-70 transition-all"
                                        onClick={() => setSelectedEvent(null)}
                                    >
                                        <FiX className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="p-6 overflow-y-auto max-h-96">
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                        {selectedEvent.event_title}
                                    </h2>

                                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                                        <FiCalendar className="w-4 h-4 mr-2" />
                                        <span className="text-sm">
                                            {new Date(selectedEvent.event_date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                        {selectedEvent.event_details}
                                    </p>
                                </div>

                                {/* Modal Footer */}
                                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-600">
                                    <button
                                        className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                        onClick={() => setSelectedEvent(null)}
                                    >
                                        Close Event Details
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Events;