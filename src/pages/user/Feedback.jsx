import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { FaStar } from "react-icons/fa";


const Feedback = () => {

    const { user, token } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // // Form State
    const [feedbackType, setFeedbackType] = useState("General Feedback");
    const [feedbackDescription, setFeedbackDescription] = useState("");
    const [rating, setRating] = useState(0);

    const [postLoading, setPostLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/user-feedbacks", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setData(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error feedbacks data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
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
            const response = await axios.post("http://127.0.0.1:8000/api/feedbacks", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                alert("Feedback created successfully!");
                setShowModal(false);
                setFeedbackType("");
                setFeedbackDescription("");
                setRating("");

            }
            setPostLoading(false);

        } catch (error) {
            console.error("Error creating feedbacks:", error);
        }
    };



    return (
        <div className={`flex flex-col h-screen p-6 `}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">📝 Your Feedbacks</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                >
                    + Create Feedback
                </button>
            </div>
            {loading ? (
                <p>Loading Feedbacks...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((feedback) => (
                        <div
                            key={feedback.id}
                            className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 dark:bg-gray-900 dark:border-gray-800"
                        >
                            <h5 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                                {feedback.feedback_type.replace("_", " ")}
                            </h5>

                            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                                {feedback.description}
                            </p>

                            <div className="mt-4 flex justify-between items-center">
                                <div className="flex items-center space-x-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                    <span className="text-yellow-500">⭐</span> {feedback.rating}
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(feedback.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Feedback Creation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 backdrop-blur-md">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
                        <h2 className="text-lg font-semibold mb-4">Create Feedback</h2>
                        <form onSubmit={handleCreateFeedback} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
                                <select
                                    value={feedbackType}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                    disabled={postLoading}
                                >
                                    <option value="General Feedback">General Feedback</option>
                                    <option value="Feature Request">Feature Request</option>
                                    <option value="Bug Report">Bug Report</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Feedback Description</label>
                                <textarea
                                    value={feedbackDescription}
                                    onChange={(e) => setFeedbackDescription(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                    disabled={postLoading}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Feedback Rating</label>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            size={24}
                                            className={`cursor-pointer transition-colors duration-300 ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                                            onClick={() => setRating(star)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg"
                                    disabled={postLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white p-2 w-full rounded-md hover:bg-blue-600 flex justify-center items-center"
                                    disabled={postLoading}
                                >
                                    {postLoading ? (
                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    ) : (
                                        "Create Feedback"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>



    );
};

export default Feedback;
