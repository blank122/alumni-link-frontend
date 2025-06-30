import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const ManageFeedback = () => {
    const { token } = useAuth();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRating, setSelectedRating] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            `${import.meta.env.VITE_API_BASE_URL}/api/admin/feedbacks`
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/feedbacks`
                    , {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    });
                setData(response.data.data);
                setFilteredData(response.data.data);
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

    useEffect(() => {
        let filtered = data;

        if (searchTerm.trim() !== "") {
            filtered = filtered.filter(feedback =>
                feedback.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedRating !== "All") {
            filtered = filtered.filter(feedback => feedback.rating === parseInt(selectedRating));
        }

        setFilteredData(filtered);
    }, [searchTerm, selectedRating, data]);

    return (
        <div className={`flex flex-col h-screen p-6`}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">📝 Manage Feedbacks</h1>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-1/2 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="mt-2 sm:mt-0 p-2 border rounded-md"
                >
                    <option value="All">All Ratings</option>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>{rating} Stars</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p>Loading Feedbacks...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <div className="bg-yellow-100 text-yellow-800 px-6 py-4 rounded-lg shadow-md inline-block">
                                No feedbacks found with the selected rating or search term.
                            </div>
                        </div>
                    ) : (
                        filteredData.map((feedback) => (
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
                        ))
                    )}

                </div>
            )}
        </div>
    );
};

export default ManageFeedback;
