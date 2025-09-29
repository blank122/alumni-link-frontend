import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMessageSquare, 
  FiSearch, 
  FiFilter,
  FiStar,
  FiCalendar,
  FiUser,
  FiAlertCircle,
  FiThumbsUp
} from "react-icons/fi";

const ManageFeedback = () => {
    const { token } = useAuth();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRating, setSelectedRating] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/feedbacks`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setData(response.data.data);
                setFilteredData(response.data.data);
            } catch (error) {
                console.error("Error fetching feedbacks data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    useEffect(() => {
        let filtered = data;

        if (searchTerm.trim() !== "") {
            filtered = filtered.filter(feedback =>
                feedback.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.feedback_type.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedRating !== "All") {
            filtered = filtered.filter(feedback => feedback.rating === parseInt(selectedRating));
        }

        setFilteredData(filtered);
    }, [searchTerm, selectedRating, data]);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { y: -4, transition: { duration: 0.2 } }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const getFeedbackTypeColor = (type) => {
        const colors = {
            "General Feedback": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
            "Feature Request": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
            "Bug Report": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
            "Other": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
        };
        return colors[type] || colors["General Feedback"];
    };

    const getRatingColor = (rating) => {
        const colors = {
            5: "text-green-600 dark:text-green-400",
            4: "text-blue-600 dark:text-blue-400",
            3: "text-yellow-600 dark:text-yellow-400",
            2: "text-orange-600 dark:text-orange-400",
            1: "text-red-600 dark:text-red-400"
        };
        return colors[rating] || "text-gray-600 dark:text-gray-400";
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
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <FiMessageSquare className="w-6 h-6 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-light text-gray-900 dark:text-white">Manage Feedbacks</h1>
                    </div>
                    <div className="w-12 h-0.5 bg-green-500"></div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3">
                        Review and manage feedback from alumni and users.
                    </p>
                </motion.div>

                {/* Search and Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by description or type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Rating Filter */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <FiFilter className="w-5 h-5" />
                                <span className="text-sm font-medium">Filter by:</span>
                            </div>
                            <select
                                value={selectedRating}
                                onChange={(e) => setSelectedRating(e.target.value)}
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            >
                                <option value="All">All Ratings</option>
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <option key={rating} value={rating}>
                                        {rating} Star{rating !== 1 ? 's' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {filteredData.length} of {data.length} feedback{data.length !== 1 ? 's' : ''}
                        </span>
                        {searchTerm || selectedRating !== "All" ? (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedRating("All");
                                }}
                                className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                            >
                                Clear filters
                            </motion.button>
                        ) : null}
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    /* Feedback Grid */
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {filteredData.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full text-center py-16"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <FiAlertCircle className="w-16 h-16 text-gray-400 mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                            No feedbacks found
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                                            {searchTerm || selectedRating !== "All" 
                                                ? "Try adjusting your search criteria or filters."
                                                : "No feedback has been submitted yet."
                                            }
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                filteredData.map((feedback, index) => (
                                    <motion.div
                                        key={feedback.id}
                                        variants={cardVariants}
                                        whileHover="hover"
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                                    >
                                        <div className="p-6">
                                            {/* Feedback Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getFeedbackTypeColor(feedback.feedback_type)}`}>
                                                    <FiMessageSquare className="w-3 h-3 mr-1" />
                                                    {feedback.feedback_type.replace("_", " ")}
                                                </span>
                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <FiCalendar className="w-3 h-3 mr-1" />
                                                    {new Date(feedback.created_at).toLocaleDateString()}
                                                </div>
                                            </div>

                                            {/* Feedback Description */}
                                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                                                {feedback.description}
                                            </p>

                                            {/* Rating and Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex items-center space-x-1">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <FiStar
                                                                key={star}
                                                                size={16}
                                                                className={
                                                                    star <= feedback.rating
                                                                        ? `fill-current ${getRatingColor(feedback.rating)}`
                                                                        : "text-gray-300 dark:text-gray-600"
                                                                }
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className={`text-sm font-medium ${getRatingColor(feedback.rating)}`}>
                                                        {feedback.rating}/5
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center space-x-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <FiUser className="w-4 h-4" />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                                                        title="Mark as Resolved"
                                                    >
                                                        <FiThumbsUp className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Summary Stats */}
                {!loading && data.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.length}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Feedbacks</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {(data.reduce((sum, item) => sum + item.rating, 0) / data.length).toFixed(1)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {data.filter(item => item.rating >= 4).length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Positive (4+ stars)</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {data.filter(item => item.rating <= 2).length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Needs Attention</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ManageFeedback;