import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login({ email });
        navigate("/");
    };

    return (
        // <div className="flex justify-center items-center min-h-screen bg-gray-100">
        //     <div className="bg-white p-8 rounded-lg shadow-md w-96">
        //         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        //         {error && <p style={{ color: "red" }}>{error}</p>}
        // <form onSubmit={handleSubmit}>
        //     <div className="mb-4">
        //         <label className="block text-gray-700 font-semibold mb-2">Email</label>
        //         <input
        //             type="email"
        //             className="w-full p-2 border border-gray-300 rounded-md"
        //             placeholder="Enter your email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             required
        //         />
        //     </div>
        //     <div className="mb-4">
        //         <label className="block text-gray-700 font-semibold mb-2">Password</label>
        //         <input
        //             type="password"
        //             className="w-full p-2 border border-gray-300 rounded-md"
        //             placeholder="Enter your password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             required
        //         />
        //     </div>
        //     <button
        //         type="submit"
        //         className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
        //     >
        //         Login
        //     </button>
        // </form>
        //         <p className="text-center text-sm text-gray-600 mt-4">
        //             Don&apos;t have an account?{" "}
        //             <a href="/register" className="text-green-600 font-semibold">
        //                 Register here
        //             </a>
        //         </p>
        //     </div>
        // </div>
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                    <form >
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                    </form>
                    <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full">
                        Login
                    </button>
                </div>
            </div>
        </div>



    );
};
export default Login;
