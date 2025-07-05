import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";


const Announcements = () => {

    const { token } = useAuth();
    const [announcements, setAnnouncementsPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user-announcements`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setAnnouncementsPosts(response.data.data);
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
                <h1 className="text-2xl font-bold">📢 Announcements Posts</h1>
            </div>
            {loading ? (
                <p>Loading announcements...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="w-full h-60 object-cover" 
                                src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/announcements/${announcement.ann_image}`}
                                 alt="Announcement" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{announcement.ann_title}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{announcement.ann_details}</p>
                                {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>


    );
};

export default Announcements;
