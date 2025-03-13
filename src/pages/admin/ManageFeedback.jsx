import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";


const ManageFeedback = () => {

    const { token } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin/feedbacks", {
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


    return (
        <div className={`flex flex-col h-screen p-6 `}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">📝 Manage Feedbacks</h1>

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

        </div>



    );
};

export default ManageFeedback;
