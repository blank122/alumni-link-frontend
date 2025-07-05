import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";


const Events = () => {

    const { token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user-events`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setPosts(response.data.data);
                console.log(response.data.data);
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
    return (
        <div className={`flex flex-col h-screen p-6 `}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">💼 Events Posts</h1>
            </div>
            {loading ? (
                <p>Loading Events Posts...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                            <img className="w-full h-60 object-cover"
                                src={`${import.meta.env.VITE_API_BASE_URL}/storage/event_images/${post.event_image}`}
                                alt="Job Post" />

                            <div className="p-6">
                                <h5 className="text-xl font-semibold text-gray-900 dark:text-white">{post.event_title}</h5>

                                <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 line-clamp-3">
                                    {post.event_details}
                                </p>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(post.event_date).toLocaleDateString()}
                                    </span>

                                    <button
                                        onClick={() => setSelectedEvent(post)} // Set the clicked event as selected
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                                        View Event
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>



            )}

            {/* Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-lg p-6">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            onClick={() => setSelectedEvent(null)}>
                            ✖
                        </button>
                        <img className="w-full h-60 object-cover rounded-md"
                            src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/event_images/${selectedEvent.event_image}`}
                            alt={selectedEvent.event_title} />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">{selectedEvent.event_title}</h2>
                        <p className="mt-2 text-gray-700 dark:text-gray-400">{selectedEvent.event_details}</p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Event Date: {new Date(selectedEvent.event_date).toLocaleDateString()}
                        </p>
                        <button
                            className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                            onClick={() => setSelectedEvent(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>


    );
};

export default Events;
