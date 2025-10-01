/* eslint-disable no-constant-binary-expression */
import Navbar from "../components/layouts/Navbar";
import bgImage from '../assets/pictures/um-maa-gate.jpg'; // Adjust path accordingly
import UmLogo from '../assets/pictures/UM-1.png';
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/layouts/Footer";

const Careers = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // 🔎 search state

    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/careers`,
                    { headers: { Accept: "application/json" } }
                );
                if (!ignore) {
                    setPosts(response.data.data);
                    console.log(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching careers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            ignore = true;
        };
    }, []);

    // 🔎 filter jobs locally by title (case-insensitive)
    const filteredPosts = posts.filter(event =>
        event.job_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col w-full min-h-screen">
            <Navbar />

            {/* Event Section */}
            <section className="min-h-[100vh] mt-16 py-16 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Upcoming Career Opportunities</h2>

                {/* 🔎 Search input */}
                <div className="mt-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search career opportunities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>

                {loading ? (
                    <p className="text-gray-600 mt-4">Loading Data...</p>
                ) : filteredPosts.length === 0 ? (
                    <p className="text-gray-600 mt-4">No career opportunities found.</p>
                ) : (
                    <div className="mt-8 flex justify-center gap-8 flex-wrap">
                        {filteredPosts.map((event, index) => {
                            const eventDate = new Date(event.created_at);
                            const day = eventDate.getDate();
                            const month = eventDate
                                .toLocaleString("en-US", { month: "short" })
                                .toUpperCase();
                            const year = eventDate.getFullYear();

                            return (
                                <div
                                    key={index}
                                    className="relative w-xl bg-white shadow-lg rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/job_posts/${event.job_image}` || UmLogo}
                                        alt={event.job_title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-yellow-400 text-black p-2 text-sm font-bold rounded">
                                        <span className="block text-xl">{day}</span>
                                        <span className="block">{month}</span>
                                        <span className="block">{year}</span>
                                    </div>
                                    <div className="p-4 text-gray-800 font-semibold text-2xl">
                                        {event.job_title}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default Careers;
