const Navbar = () => {
    return (
        <nav className="bg-green-700 p-4 flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">ALUMNILINK</h1>
            <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded-md"
            />
            <button className="text-white">Register</button>
        </nav>
    );
};

export default Navbar;
