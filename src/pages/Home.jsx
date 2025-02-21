import Navbar from "../components/layouts/Navbar";
import bgImage from '../assets/pictures/um-maa-gate.jpg'; // Adjust path accordingly
import UmLogo from '../assets/pictures/UM-1.png';


const Home = () => {
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
                        <a href="#about" className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600">
                            See More
                        </a>
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

                <div className="mt-8 flex justify-center gap-8 flex-wrap">
                    {/* <!-- Event 1 --> */}
                    <div className="relative w-xl bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src={UmLogo} alt="UM Logo" className="w-full h-48 object-cover" />
                        <div className="absolute top-3 left-3 bg-yellow-400 text-black p-2 text-sm font-bold rounded">
                            <span className="block text-xl">20</span>
                            <span className="block">JULY</span>
                            <span className="block">2024</span>
                        </div>
                        <div className="p-4 text-gray-800 font-semibold text-2xl">UM Trail Run</div>
                    </div>

                    {/* <!-- Event 2 --> */}
                    <div className="relative w-xl bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src={UmLogo} alt="UM Logo" className="w-full h-48 object-cover" />
                        <div className="absolute top-3 left-3 bg-yellow-400 text-black p-2 text-sm font-bold rounded">
                            <span className="block text-xl">15</span>
                            <span className="block">AUG</span>
                            <span className="block">2024</span>
                        </div>
                        <div className="p-4 text-gray-800 font-semibold text-2xl">Job Fair</div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-gray-900 text-white py-6 text-center">
                <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
            </footer>
        </div>

    );

};

export default Home;
