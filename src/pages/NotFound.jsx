import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import errorVideo from "../assets/vecteezy_404-error-page-not-found-animation-with-spinning-gear_57679546.mov";

const NotFound = () => {
    return (
        <main className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">


            {/* Centered Small Video Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12"
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source
                        src={errorVideo}
                        type="video/quicktime"
                    />
                    <source
                        src={errorVideo}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </motion.div>

            {/* Navigation and Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center"
            >
                <h2 className="text-black font-bold text-2xl uppercase tracking-widest mb-4">
                    Page Not Found
                </h2>


                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-black text-white font-black py-4 px-12 rounded-full text-lg uppercase tracking-tight hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all"
                    >
                        Return Home
                    </motion.button>
                </Link>
            </motion.div>

            {/* Subtle decor to match branding */}
            <div className="fixed bottom-0 left-0 w-full h-2 bg-[#FF8A00]" />
        </main>
    );
};

export default NotFound;
