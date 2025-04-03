/* eslint-disable no-constant-binary-expression */
import Navbar from "../components/layouts/Navbar";
import bgImage from '../assets/pictures/um-maa-gate.jpg'; // Adjust path accordingly
import UmLogo from '../assets/pictures/UM-1.png';
import { useEffect, useState } from "react";
import axios from "axios";


const Careers = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/careers", {
                    headers: {
                        Accept: "application/json",
                    },
                });
                setPosts(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching careers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    return (
        <div className="flex flex-col w-full min-h-screen">
            <Navbar />

            {/* Event Section */}
            <section className="min-h-[100vh] mt-16 py-16 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Upcoming Career Opportunity</h2>

                {loading ? (
                    <p className="text-gray-600 mt-4">Loading Data...</p>
                ) : posts.length === 0 ? (
                    <p className="text-gray-600 mt-4">No upcoming events available.</p>
                ) : (
                    <div className="mt-8 flex justify-center gap-8 flex-wrap">
                        {posts.map((event, index) => {
                            const eventDate = new Date(event.created_at);
                            const day = eventDate.getDate();
                            const month = eventDate.toLocaleString("en-US", { month: "short" }).toUpperCase();
                            const year = eventDate.getFullYear();

                            return (
                                <div key={index} className="relative w-xl bg-white shadow-lg rounded-lg overflow-hidden">
                                    <img src={`http://127.0.0.1:8000/storage/job_posts/${event.job_image}` || UmLogo} alt={event.job_title} className="w-full h-48 object-cover" />
                                    <div className="absolute top-3 left-3 bg-yellow-400 text-black p-2 text-sm font-bold rounded">
                                        <span className="block text-xl">{day}</span>
                                        <span className="block">{month}</span>
                                        <span className="block">{year}</span>
                                    </div>
                                    <div className="p-4 text-gray-800 font-semibold text-2xl">{event.job_title}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>



          
        </div>

    );

};

export default Careers;
