import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../config/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            checkUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const checkUser = async (token) => {
        try {
            // Add token to headers for this request
            const res = await axiosInstance.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data.data);
        } catch (error) {
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username = import.meta.env.VITE_ADMIN_USERNAME, password = import.meta.env.VITE_ADMIN_PASSWORD) => {
        try {
            const res = await axiosInstance.post("/auth/login", { username, password });
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            setUser(user);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Login failed"
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    // Axios interceptor to add token to every request
    useEffect(() => {
        const interceptor = axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => axiosInstance.interceptors.request.eject(interceptor);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
