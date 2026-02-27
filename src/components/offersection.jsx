import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Play } from "lucide-react";
import { getOffers } from "../data/offers";



const OfferSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [offers, setOffers] = useState([]);
    console.log(offers);
    useEffect(() => {
        const fetchOffers = async () => {
            const data = await getOffers();
            setOffers(data.data);
        };
        fetchOffers();
    }, []);

    const nextSlide = () => {
        if (offers.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % offers.length);
        }
    };

    const prevSlide = () => {
        if (offers.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
        }
    };

    // Auto-slide every 5 seconds
    useEffect(() => {
        if (offers.length === 0) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [offers.length]);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    return (
        <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[#EBEBEB] flex items-center justify-center">
            {/* Background City Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center grayscale opacity-30"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#EBEBEB] via-transparent to-[#EBEBEB]/80"></div>
            </div>

            {/* Heading Section - Positioned to be overlapped */}
            <div className="absolute top-12 md:top-16 left-0 w-full text-center z-0 px-4">
                <div className="inline-flex items-center gap-2 mb-2 justify-center">
                    <div className="w-8 h-0.5 bg-[#FF8A00]" />
                    <span className="text-sm font-bold text-[#FF8A00] uppercase tracking-wider">
                        Limited Time Deals
                    </span>
                    <div className="w-8 h-0.5 bg-[#FF8A00]" />
                </div>
                <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] leading-tight mb-6">
                    EXCLUSIVE <span className="text-[#FF8A00]">OFFERS</span>
                </h2>
            </div>

            {/* 3D Billboard Container - Z-index higher to overlap text */}
            <div className="relative z-10 w-full max-w-5xl px-4 md:px-8 perspective-container mt-28 md:mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="billboard-3d relative"
                >
                    {/* The Image Background Billboard Face */}
                    <div
                        className="relative w-full aspect-[2.2/1] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.3)] overflow-hidden flex items-center p-6 md:p-16 border border-white/10 bg-cover bg-center transition-all duration-700"
                        style={{ backgroundImage: offers.length > 0 && offers[currentIndex] ? `url(${BACKEND_URL}${offers[currentIndex].image})` : 'none' }}
                    >
                        {/* Dark Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10"></div>

                        {/* Orange Overlay Mix */}
                        <div className="absolute inset-0 bg-orange-600/20 mix-blend-overlay z-10"></div>

                        {/* Subtle Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay z-10"></div>

                        {/* Content Carousel */}
                        <div className="relative z-20 w-full h-full flex flex-col justify-center">
                            {offers.length > 0 && (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-white max-w-4xl"
                                    >
                                        <h2 className="font-['Oswald'] text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight uppercase drop-shadow-md mb-4 text-white">
                                            {offers[currentIndex].headline}
                                        </h2>
                                        <div className="h-1 w-16 md:w-24 bg-white/40 mb-4 md:mb-6"></div>
                                        <h3 className="font-['Urbanist'] text-sm md:text-2xl font-light text-white/90 tracking-widest uppercase mb-2">
                                            {offers[currentIndex].subline}
                                        </h3>
                                        <p className="font-['Urbanist'] text-xs md:text-base text-white/80 max-w-xl hidden sm:block font-medium">
                                            {offers[currentIndex].description}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Decorative Side Elements (Fake visual depth) */}
                        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>

                        {/* Play Button */}
                        {/* <button className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-white/40 flex items-center justify-center hover:bg-white/20 transition-all group backdrop-blur-sm z-30 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            <Play className="w-5 h-5 md:w-8 md:h-8 text-white fill-white opacity-90 group-hover:opacity-100 transition-opacity" />
                        </button> */}

                        {/* Navigation Controls */}
                        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2 md:gap-3 z-30">
                            <button
                                onClick={prevSlide}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition-colors border border-white/20"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition-colors border border-white/20"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                </motion.div>
            </div>

            <style jsx>{`
        .perspective-container {
            perspective: 1200px;
        }
        .billboard-3d {
            /* 3D effect mainly on larger screens */
            transform: none;
            transform-style: preserve-3d;
        }
        @media (min-width: 768px) {
            .billboard-3d {
                transform: rotateY(-2deg) rotateX(2deg);
                box-shadow: 30px 40px 70px -10px rgba(0,0,0,0.15);
            }
        }
      `}</style>
        </section>
    );
};

export default OfferSection;
