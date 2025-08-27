/* eslint-disable no-constant-binary-expression */
import Navbar from "../components/layouts/Navbar";
import bgImage from '../assets/pictures/um-maa-gate.jpg'; // Adjust path accordingly
import UmLogo from '../assets/pictures/UM-1.png';
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/layouts/Footer";
import { Link } from "react-router-dom";


const Home = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/home-events`
                    , {
                        headers: {
                            Accept: "application/json",
                        },
                    });
                setPosts(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col w-full min-h-screen">
            <Navbar />
            {/* Hero Section */}
            <section className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
                {/* Background Blur Overlay */}
                {/* <div classNameName="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div> */}

                {/* Content Box */}
                <div className="relative max-w-7xl bg-gray-100  p-6 md:p-10 rounded-lg text-center shadow-lg">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-start mt-5">Welcome to AlumniLink!</h1>
                    {/* Gradient Divider */}
                    <div className="mt-2 h-[4px] max-w-[100px] bg-gradient-to-r from-green-500 to-yellow-500  rounded-full"></div>
                    <p className="text-gray-800 mt-4 text-justify leading-relaxed">
                        Welcome back to your academic home! At AlumniLink, we’re not just tracking your professional journey—we’re celebrating it.
                        Stay connected with your peers, access exclusive job opportunities, and be the first to know about upcoming events and seminars tailored just for you.
                        Your journey continues here, where every step forward is a step together.
                    </p>
                    <div className="flex justify-start mt-2">
                        <Link
                            to="/about"
                            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600"
                        >
                            See More
                        </Link>

                    </div>

                </div>

                {/* Navigation Arrows */}
                <button className="absolute left-4 md:left-10 text-white text-3xl">&lt;</button>
                <button className="absolute right-4 md:right-10 text-white text-3xl">&gt;</button>
            </section>



            {/* red section */}
            <section className="h-1/3 flex flex-col justify-center items-center bg-red-500 text-white text-center px-4">
                <p className="text-lg md:text-xl m-6">Join <span>AlumniLink</span> and be a part of a community that values your growth and success</p>
            </section>
            {/* Event Section */}
            <section className="min-h-[50vh] py-16 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>

                {loading ? (
                    <p className="text-gray-600 mt-4">Loading events...</p>
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
                                    <img src={`${import.meta.env.VITE_STORAGE_BASE_URL}/public/storage/event_images/${event.event_image}` || UmLogo} alt={event.event_title} className="w-full h-48 object-cover" />
                                    <div className="absolute top-3 left-3 bg-yellow-400 text-black p-2 text-sm font-bold rounded">
                                        <span className="block text-xl">{day}</span>
                                        <span className="block">{month}</span>
                                        <span className="block">{year}</span>
                                    </div>
                                    <div className="p-4 text-gray-800 font-semibold text-2xl">{event.event_title}</div>
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

export default Home;
