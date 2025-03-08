/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_BASE_URL = "http://127.0.0.1:8000/api";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("authUser")) || null
    );
    const [token, setToken] = useState(localStorage.getItem("authToken") || "");

    // Ensure token persists after refresh
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, [token]);

    const login = async ({ email, password }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

            if (response.data.success) {
                localStorage.setItem("authToken", response.data.token);
                localStorage.setItem("authUser", JSON.stringify(response.data.user));
                setUser(response.data.user);
                setToken(response.data.token);
                // Redirect based on account_type
                if (response.data.user.account_type === 1) {
                    return { success: true, redirect: "/admin/dashboard" };
                } else {
                    return { success: true, redirect: "/user/dashboard" };
                }
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
        localStorage.removeItem("authUser");
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
