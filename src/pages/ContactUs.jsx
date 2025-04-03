/* eslint-disable no-constant-binary-expression */
import Navbar from "../components/layouts/Navbar";
const ContactUs = () => {



    return (
        <div className="flex flex-col w-full min-h-screen">
            <Navbar />

            <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
                <p><strong>Address:</strong> CCE Alumni Office, University Campus</p>
                <p><strong>Email:</strong> contact@alumnilink.com</p>
                <p><strong>Phone:</strong> +123 456 7890</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-3">Send Us a Message</h3>
                <form className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <textarea
                        name="message"
                        rows="5"
                        placeholder="Your Message"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >Submit</button>
                </form>
            </div>

            <div className="text-center">
                <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-blue-600 hover:underline">Facebook</a>
                    <a href="#" className="text-blue-600 hover:underline">Twitter</a>
                    <a href="#" className="text-blue-600 hover:underline">LinkedIn</a>
                </div>
            </div>
        </div>

    );

};

export default ContactUs;
