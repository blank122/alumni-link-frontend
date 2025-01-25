import axios from 'axios';

// Define the API base URL
const API_BASE_URL = "http://127.0.0.1:8000/api";

// Function to handle user login
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            email,
            password,
        });

        return response.data; // Return the entire response data
    } catch (error) {
        throw error.response?.data?.message || "Login failed. Please try again.";
    }
};

// Function to handle storing the token
export const storeToken = (token) => {
    localStorage.setItem("token", token);
};

// Function to remove token (logout)
export const logout = () => {
    localStorage.removeItem("token");
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};
