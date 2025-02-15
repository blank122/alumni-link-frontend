import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
                <h1 className="text-xl font-bold">Flowbite</h1>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/" className="hover:underline">About</Link>
                    <Link to="/" className="hover:underline">Services</Link>
                    <Link to="/" className="hover:underline">Pricing</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-800 p-2`}>
                <Link to="/" className="block py-2">Home</Link>
                <Link to="/" className="block py-2">About</Link>
                <Link to="/" className="block py-2">Services</Link>
                <Link to="/" className="block py-2">Pricing</Link>
                <Link to="/" className="block py-2">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
