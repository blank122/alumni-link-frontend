/* eslint-disable no-constant-binary-expression */
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-yellow-50">
            <Navbar />

            {/* Main Content */}
            <div className="min-h-[100vh] mt-16 py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-black">
                        About Us
                        <div className="mt-2 h-1 w-24 bg-yellow-400 mx-auto rounded-full"></div>
                    </h2>

                    <div className="bg-white border border-green-200 rounded-2xl p-10 shadow-2xl">
                        <h3 className="text-2xl font-semibold mb-6 text-center text-green-700">
                            Get in Touch
                        </h3>

                        <div className="space-y-6 text-slate-700">
                            <p className="text-lg leading-relaxed text-justify">
                                Welcome to <span className="text-green-700 font-semibold">AlumniLink</span>,
                                the official platform dedicated to connecting graduates of the
                                College of Computing Education (CCE). AlumniLink was created
                                to help track and support the employment journeys of our alumni.
                            </p>

                            <p className="text-lg leading-relaxed text-justify">
                                Our mission is to strengthen the lifelong bond between CCE and its graduates.
                                By understanding alumni career paths, skills, and achievements,
                                <span className="text-yellow-600 font-medium"> AlumniLink </span>
                                also helps the department improve curriculum alignment, career development
                                programs, and data-driven planning that benefit both current students and graduates.
                            </p>

                            <p className="text-lg leading-relaxed text-justify">
                                Through surveys and feedback, we've learned that our alumni value staying connected
                                and receiving updates from their alma mater. AlumniLink was built to make the
                                connection stronger—serving as a bridge for collaboration, opportunities,
                                and community growth.
                            </p>

                            <p className="text-xl font-semibold text-center text-black mt-8">
                                <span className="text-green-700">Reconnect.</span>{" "}
                                <span className="text-yellow-600">Rediscover.</span>{" "}
                                <span className="text-black">Reimagine.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;
