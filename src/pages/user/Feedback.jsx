import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiStar,
    FiX,
    FiPlus,
    FiCalendar,
    FiMessageSquare,
    FiAlertCircle,
    FiType,
    FiEdit3
} from "react-icons/fi";

const Feedback = () => {
    const { user, token } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [feedbackType, setFeedbackType] = useState("General Feedback");
    const [feedbackDescription, setFeedbackDescription] = useState("");
    const [rating, setRating] = useState(0);
    const [postLoading, setPostLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user-feedbacks`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setData(response.data.data);
            } catch (error) {
                console.error("Error feedbacks data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchData();
    }, [token]);

    const handleCreateFeedback = async (e) => {
        e.preventDefault();
        setPostLoading(true);

        const formData = new FormData();
        formData.append("feedback_type", feedbackType);
        formData.append("description", feedbackDescription);
        formData.append("rating", rating);
        formData.append("account_id", user.id);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/feedbacks`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                alert("✅ Feedback created successfully!");
                setShowModal(false);
                setFeedbackType("General Feedback");
                setFeedbackDescription("");
                setRating(0);
            }
        } catch (error) {
            console.error("Error creating feedbacks:", error);
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

    const getFeedbackTypeColor = (type) => {
        const colors = {
            "General Feedback": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
            "Feature Request": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
            "Bug Report": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
            "Other": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
        };
        return colors[type] || colors["General Feedback"];
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
                            Feedback
                        </h1>
                        <div className="w-12 h-0.5 bg-green-500"></div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowModal(true)}
                        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl shadow-sm hover:bg-green-700 transition-all duration-300 font-medium"
                    >
                        <FiPlus className="w-5 h-5 mr-2" />
                        Create Feedback
                    </motion.button>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    </div>
                ) : data.length === 0 ? (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <FiMessageSquare className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No feedback yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                            Be the first to share your thoughts and help us improve.
                        </p>
                    </motion.div>
                ) : (
                    /* Feedback Grid */
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {data.map((feedback, index) => (
                            <motion.div
                                key={feedback.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                            >
                                <div className="p-6">
                                    {/* Feedback Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getFeedbackTypeColor(feedback.feedback_type)}`}>
                                            <FiType className="w-3 h-3 mr-1" />
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

                                    {/* Rating */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FiStar
                                                    key={star}
                                                    size={16}
                                                    className={
                                                        star <= feedback.rating
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300 dark:text-gray-600"
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {feedback.rating}/5
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Create Feedback Modal */}
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
                                    <div className="flex items-center">
                                        <FiEdit3 className="w-5 h-5 text-green-500 mr-3" />
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Create Feedback
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
                                <form onSubmit={handleCreateFeedback} className="p-6 space-y-6">
                                    {/* Feedback Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Feedback Type
                                        </label>
                                        <select
                                            value={feedbackType}
                                            onChange={(e) => setFeedbackType(e.target.value)}
                                            required
                                            disabled={postLoading}
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        >
                                            <option value="General Feedback">General Feedback</option>
                                            <option value="Feature Request">Feature Request</option>
                                            <option value="Bug Report">Bug Report</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    {/* Feedback Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Feedback Description
                                        </label>
                                        <textarea
                                            value={feedbackDescription}
                                            onChange={(e) => setFeedbackDescription(e.target.value)}
                                            required
                                            disabled={postLoading}
                                            rows={4}
                                            placeholder="Share your thoughts, suggestions, or issues..."
                                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                                        />
                                    </div>

                                    {/* Rating */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Rating
                                        </label>
                                        <div className="flex space-x-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <motion.button
                                                    key={star}
                                                    type="button"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setRating(star)}
                                                    className="p-1 transition-colors"
                                                >
                                                    <FiStar
                                                        size={32}
                                                        className={
                                                            star <= rating
                                                                ? "text-yellow-400 fill-yellow-400"
                                                                : "text-gray-300 dark:text-gray-600 hover:text-yellow-200"
                                                        }
                                                    />
                                                </motion.button>
                                            ))}
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            <span>Poor</span>
                                            <span>Excellent</span>
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
                                            className="flex items-center px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                        >
                                            {postLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Creating...
                                                </>
                                            ) : (
                                                "Create Feedback"
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

export default Feedback;