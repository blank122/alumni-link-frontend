/* eslint-disable no-constant-binary-expression */
import Navbar from "../components/layouts/Navbar";

const ContactUs = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
                    Get in Touch
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Info */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Contact Details</h3>
                        <p className="text-gray-600">
                            <span className="font-medium text-gray-800">Address:</span> CCE Alumni Office, University Campus
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium text-gray-800">Email:</span>{" "}
                            <a href="mailto:contact@alumnilink.com" className="text-blue-600 hover:underline">contact@alumnilink.com</a>
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium text-gray-800">Phone:</span> +123 456 7890
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Send Us a Message</h3>
                        <form className="space-y-5">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                name="message"
                                rows="4"
                                placeholder="Your Message"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-sm"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Optional Footer Links */}
                {/* <div className="text-center">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Follow Us</h3>
          <div className="flex justify-center space-x-6 text-blue-600 text-lg">
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">LinkedIn</a>
          </div>
        </div> */}
            </div>
        </div>
    );
};

export default ContactUs;
