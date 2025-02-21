import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const result = await login({ email, password });

        if (result.success) {
            navigate("/admin/dashboard");
        } else {
            setError(result.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    {/* add atag logo?? */}
                    <h2 className="text-2xl font-bold text-center mb-6">LOGIN TO YOUR ACCOUNT</h2>
                    <h2 className="text-gray-500 text-center mb-6">Welcome back! Please enter your details</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form onSubmit={handleLogin}>
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

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    className="mr-2"
                                />
                                <label htmlFor="rememberMe" className="text-gray-700 text-sm">
                                    Remember me
                                </label>
                            </div>
                            <a href="#!" className="text-sm text-green-600 hover:underline">
                                Forgot password
                            </a>
                        </div>

                        <button type="submit" className="bg-green-600 text-white p-2 w-full rounded-md hover:bg-blue-600">
                            Sign in
                        </button>

                    </form>
                    {/* Or sign in with Google */}
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="px-2 text-gray-500">or</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>

                    <button
                        className="flex items-center justify-center gap-2 w-full p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                            alt="Google logo"
                            className="w-5 h-5"
                        />
                        Sign in with Google
                    </button>

                    {/* Register link */}
                    <p className="text-center text-sm text-gray-700 mt-6">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-green-600 hover:underline font-semibold">Register Now</Link>

                    </p>

                </div>
            </div>
        </div>



    );
};
export default Login;
