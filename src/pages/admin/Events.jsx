import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const Events = () => {
    const { user, token } = useAuth();
    const [eventPosts, setEventPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postLoading, setPostLoading] = useState(false);

    // Form State
    const [eventTitle, setEventTitle] = useState("");
    const [eventDetails, setEventDetails] = useState("");
    const [eventSchedule, setEventSchedule] = useState("");
    const [eventImage, setEventImage] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/admin/events", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setEventPosts(response.data.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchEvents();
        }
    }, [token]);

    // Handle Form Submission
    const handleCreateJob = async (e) => {
        e.preventDefault();
        setPostLoading(true);

        const formData = new FormData();
        formData.append("event_title", eventTitle);
        formData.append("event_details", eventDetails);
        formData.append("event_date", eventSchedule);

        formData.append("account_id", user.id);
        if (eventImage) formData.append("event_image", eventImage);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/admin/events", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                window.location.reload(); // Reload the page after successful action
                alert("Events created successfully!");
                setShowModal(false);
                setEventTitle("");
                setEventDetails("");
                setEventSchedule("");
                setEventImage(null);
            }
            setPostLoading(false);

        } catch (error) {
            console.error("Error creating job:", error);
        }
    };


    return (
        <div className={`flex flex-col h-screen p-6 ${showModal ? "backdrop-blur-md" : ""}`}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Events</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                >
                    + Create Events
                </button>
            </div>

            <div className="p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Events</h2>
                {loading ? (
                    <p className="text-gray-500">Loading events data...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Event Title</th>
                                    <th className="px-6 py-3 text-left">Event Details</th>
                                    <th className="px-6 py-3 text-left">Event Schedule</th>
                                    <th className="px-6 py-3 text-left">Event Image</th>
                                    <th className="px-6 py-3 text-left">Date Posted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventPosts.length > 0 ? (
                                    eventPosts.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition`}
                                        >
                                            <td className="px-6 py-4 text-gray-700">{item.event_title || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-700">{item.event_details || "N/A"}</td>
                                            <td className="px-6 py-4 text-gray-700">{item.event_date || "N/A"}</td>
                                            <td className="px-6 py-4">
                                                {item.event_image ? (
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/event_images/${item.event_image}`}
                                                        alt="Job Post"
                                                        className="w-20 h-20 object-cover rounded-md shadow-sm"
                                                    />
                                                ) : (
                                                    <span className="text-gray-400">No Image</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-4 text-gray-500">
                                            No job data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Events Creation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 backdrop-blur-md">

                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
                        <h2 className="text-lg font-semibold mb-4">Create Events</h2>
                        <form onSubmit={handleCreateJob} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Event Title</label>
                                <input
                                    type="text"
                                    value={eventTitle}
                                    onChange={(e) => setEventTitle(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                    disabled={postLoading}

                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Event Details</label>
                                <textarea
                                    value={eventDetails}
                                    onChange={(e) => setEventDetails(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                    disabled={postLoading}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setEventImage(e.target.files[0])}
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                    disabled={postLoading}

                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Event Schedule</label>
                                <input
                                    type="date"
                                    value={eventSchedule}
                                    onChange={(e) => setEventSchedule(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-300 hover:border-green-500 focus:scale-[1.02]"
                                    disabled={postLoading}

                                />
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
                                        "Sign in"
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

export default Events;
