import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const PageLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        // Animate progress bar to 100% over ~1.6s
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Small pause before exit
                    setTimeout(() => {
                        setLeaving(true);
                        setTimeout(onComplete, 700);
                    }, 200);
                    return 100;
                }
                return prev + 2;
            });
        }, 32);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!leaving ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#111827] overflow-hidden"
                >
                    {/* Radial glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,138,0,0.15)_0%,_transparent_65%)] pointer-events-none" />

                    {/* Animated rings */}
                    <div className="absolute w-[500px] h-[500px] rounded-full border border-[#FF8A00]/10 animate-ping-slow" />
                    <div className="absolute w-[350px] h-[350px] rounded-full border border-[#FF8A00]/15" />

                    {/* Logo + Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="flex flex-col items-center gap-4 relative z-10"
                    >
                        <img
                            src={logo}
                            alt="Billford Advertising"
                            className="h-24 w-auto drop-shadow-[0_0_30px_rgba(255,138,0,0.4)]"
                        />
                        <motion.p
                            initial={{ opacity: 0, letterSpacing: "0.2em" }}
                            animate={{ opacity: 1, letterSpacing: "0.4em" }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="font-['Oswald'] text-xs font-bold text-[#FF8A00] uppercase tracking-[0.4em]"
                        >
                            Advertising
                        </motion.p>
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-16 w-48 flex flex-col items-center gap-2 z-10"
                    >
                        <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#FF8A00] to-orange-300 rounded-full"
                                style={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                            Loading
                        </span>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default PageLoader;
