import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav>
            {/* Green Navbar (Top Section) */}
            <div className="bg-green-700 text-white">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center p-3">
                    {/* Logo & Title */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-full"></div> {/* Placeholder Logo */}
                        <div className="w-10 h-10 bg-white rounded-full"></div> {/* Placeholder Logo */}

                        <div>
                            <h1 className="text-lg font-bold">ALUMNILINK</h1>
                            <p className="text-xs">Reconnect · Rediscover · Reimagine</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center bg-white text-black px-3 py-1 rounded-md">
                        <input type="text" placeholder="Search..." className="outline-none w-40" />
                        🔍
                    </div>

                    {/* Login / Register */}
                    <div className="hidden md:flex space-x-4">
                        <Link to="/login" className="bg-white text-green-700 px-4 py-1 rounded-md">Login</Link>
                        <Link to="/register" className="bg-white text-green-700 px-4 py-1 rounded-md">Register</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                        ☰
                    </button>
                </div>
            </div>

            {/* Black Navbar (Navigation Links) */}
            <div className="bg-black text-white">
                <div className="max-w-screen-xl mx-auto flex justify-center md:justify-start space-x-6 py-2 text-sm">
                    <Link to="/" className="hover:text-yellow-400  hidden md:flex">Home</Link>
                    <Link to="/about" className="hover:text-yellow-400 hidden md:flex">About</Link>
                    <Link to="/programs" className="hover:text-yellow-400 hidden md:flex">Programs & Events</Link>
                    <Link to="/careers" className="hover:text-yellow-400 hidden md:flex">Career Opportunity</Link>
                    <Link to="/contact" className="hover:text-yellow-400 hidden md:flex">Contact Us</Link>
                </div>
            </div>

            {/* Yellow Bar (Separator) */}
            <div className="bg-yellow-500 h-2"></div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-800 text-white p-3">
                    <Link to="/" className="block py-2">Home</Link>
                    <Link to="/about" className="block py-2">About</Link>
                    <Link to="/programs" className="block py-2">Programs & Events</Link>
                    <Link to="/careers" className="block py-2">Career Opportunity</Link>
                    <Link to="/contact" className="block py-2">Contact Us</Link>
                    <Link to="/login" className="block py-2">Login</Link>
                    <Link to="/register" className="block py-2">Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
