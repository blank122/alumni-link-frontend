/* eslint-disable no-constant-binary-expression */
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

const AboutUs = () => {



    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="min-h-[100vh] mt-16 py-16 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold text-center py-6 mb-6">About Us</h2>

                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 mx-10">
                    <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
                    <p className="text-gray-800 mt-4 text-justify leading-relaxed">
                        Welcome back to your academic home! At AlumniLink, we’re not just tracking your professional journey—we’re celebrating it.
                        Stay connected with your peers, access exclusive job opportunities, and be the first to know about upcoming events and seminars tailored just for you.
                        Your journey continues here, where every step forward is a step together.
                    </p>
                </div>
            </div>

            <Footer />

        </div>

    );

};

export default AboutUs;
