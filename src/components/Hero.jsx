const Hero = () => {
    return (
        <div className="relative bg-cover bg-center h-64 flex items-center justify-center text-white text-center px-4"
            style={{ backgroundImage: "url('your-image-url.jpg')" }}>
            <div className="bg-black bg-opacity-50 p-6 rounded-md">
                <h2 className="text-2xl font-bold">Welcome to AlumniLink!</h2>
                <p>Reconnect. Rediscover. Engage.</p>
            </div>
        </div>
    );
};

export default Hero;
