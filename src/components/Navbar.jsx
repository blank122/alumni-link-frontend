import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-green-700 p-4 flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">ALUMNILINK</h1>
            <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded-md"
            />
            <Link to="/login">
                <button className="bg-white text-green-700 px-4 py-2 rounded-md font-semibold">
                    Login
                </button>
            </Link>
            <button className="text-white">Register</button>
        </nav>
    );
};

export default Navbar;
