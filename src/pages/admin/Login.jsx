import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const [username, setUsername] = useState(import.meta.env.VITE_ADMIN_USERNAME || "");
    const [password, setPassword] = useState(import.meta.env.VITE_ADMIN_PASSWORD || "");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const result = await login(username, password);

        if (result.success) {
            navigate("/admin");
        } else {
            setError(result.error);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6 font-['Urbanist']">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo Area */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#111827] rounded-2xl shadow-xl mb-6">
                        <div className="w-8 h-8 bg-[#FF8A00] rounded-lg"></div>
                    </div>
                    <h1 className="font-['Oswald'] text-3xl font-bold text-[#111827] uppercase tracking-wider">
                        Admin Portal
                    </h1>
                    <p className="text-gray-500 mt-2">Sign in to manage your advertising platform</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-10 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100"
                            >
                                <AlertCircle size={18} />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:border-[#FF8A00] focus:bg-white focus:ring-4 focus:ring-[#FF8A00]/10 rounded-2xl outline-none transition-all text-[#111827] font-semibold"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:border-[#FF8A00] focus:bg-white focus:ring-4 focus:ring-[#FF8A00]/10 rounded-2xl outline-none transition-all text-[#111827] font-semibold"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#111827] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black active:scale-[0.98] transition-all disabled:opacity-70 group shadow-xl shadow-gray-200"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm text-gray-400 font-medium">
                        &copy; 2024 Billford International. <br className="md:hidden" /> All Rights Reserved.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
