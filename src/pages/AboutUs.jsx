/* eslint-disable no-constant-binary-expression */
import Navbar from "../components/layouts/Navbar";
const AboutUs = () => {



    return (
        <div className="flex flex-col w-full min-h-screen">
            <Navbar />

            <h2 className="text-3xl font-bold text-center mb-6">About us</h2>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
                <p className="text-gray-800 mt-4 text-justify leading-relaxed">
                    Welcome back to your academic home! At AlumniLink, we’re not just tracking your professional journey—we’re celebrating it.
                    Stay connected with your peers, access exclusive job opportunities, and be the first to know about upcoming events and seminars tailored just for you.
                    Your journey continues here, where every step forward is a step together.
                </p>
            </div>
        </div>

    );

};

export default AboutUs;
