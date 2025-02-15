/* eslint-disable react/prop-types */
// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     const login = (userData) => {
//         setUser(userData);
//         localStorage.setItem("user", JSON.stringify(userData));
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem("user");
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_BASE_URL = "http://127.0.0.1:8000/api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("authToken") || "");

    const login = async ({ email, password }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email,
                password,
            });

            if (response.data.success) {
                localStorage.setItem("authToken", response.data.token);
                setUser(response.data.user);
                setToken(response.data.token);
                return { success: true };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
