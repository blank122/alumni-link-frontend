import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, storeToken } from './services/authService';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await login(email, password);
            if (response.token) {
                storeToken(response.token);
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err);
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        // <div style={{ maxWidth: "400px", margin: "50px auto" }}>
        //     <h2>Login</h2>
        //     {error && <p style={{ color: "red" }}>{error}</p>}
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label>Email:</label>
        //             <input
        //                 type="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Password:</label>
        //             <input
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 required
        //             />
        //         </div>
        //         <button type="submit">Login</button>
        //     </form>
        // </div>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="text-green-600 font-semibold">
                        Register here
                    </a>
                </p>
            </div>
        </div>

    );
};

export default Login;
