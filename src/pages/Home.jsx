import Navbar from "../components/layouts/Navbar";

const Home = () => {
    return (
        <div className="flex flex-col w-full min-h-screen">

            <Navbar />

            {/* Hero Section */}
            <section className="h-screen flex flex-col justify-center items-center bg-blue-500 text-white text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Alumnilink</h1>
                <p className="text-lg md:text-xl mb-6">This section is on the making.</p>
                <a href="#about" className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md shadow-md hover:bg-gray-200">Learn More</a>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-16 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Lorem ipsum
                </p>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-6 text-center">
                <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
