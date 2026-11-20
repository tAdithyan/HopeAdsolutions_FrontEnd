import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Filter, Play, Loader2 } from "lucide-react";
import Header from "../components/header";
import { Footer } from "../components/Footer";
import SEO from "../components/SEO";
import axiosInstance from "../config/axios"; // <-- adjust to where your instance lives

/* Cloudinary video -> still frame used as poster (first frame as JPG) */
const getVideoPoster = (url) =>
    url && url.includes("/video/upload/")
        ? url.replace("/video/upload/", "/video/upload/so_0/").replace(/\.[^/.]+$/, ".jpg")
        : undefined;

const playPreview = (e) => {
    const p = e.currentTarget.play();
    if (p && p.catch) p.catch(() => { });
};

const stopPreview = (e) => {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
};

const GalleryPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightboxItem, setLightboxItem] = useState(null);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            setError("");
            const { data } = await axiosInstance.get("/media");
            setItems(data);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load the gallery. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    /* Close lightbox with Escape */
    useEffect(() => {
        if (!lightboxItem) return;
        const onKey = (e) => e.key === "Escape" && setLightboxItem(null);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [lightboxItem]);

    /* Filter tabs come from the categories that actually have media */
    const categories = useMemo(
        () => ["All", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))],
        [items]
    );

    const filtered =
        activeCategory === "All"
            ? items
            : items.filter((item) => item.category === activeCategory);

    return (
        <div className="min-h-screen bg-[#EBEBEB] text-[#111827] relative overflow-hidden">
            <SEO
                title="Gallery"
                description="Explore our portfolio of transit, outdoor, restaurant, and event advertising campaigns across the Thrissur district."
                keywords="advertising gallery, transit ads thrissur, LED screen ads, outdoor advertising portfolio, brand campaigns"
                ogType="website"
            />

            <div className="fixed top-0 left-0 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,_rgba(255,138,0,0.08)_0%,_transparent_70%)] pointer-events-none" />

            <Header />

            <main className="font-['Urbanist']">
                {/* Hero */}
                <section className="relative pt-32 pb-16 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 mb-4"
                        >
                            <div className="w-8 h-0.5 bg-[#FF8A00]" />
                            <span className="text-sm font-bold text-[#FF8A00] uppercase tracking-wider">
                                Our Work
                            </span>
                            <div className="w-8 h-0.5 bg-[#FF8A00]" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-['Oswald'] text-5xl md:text-7xl font-bold text-[#111827] mb-6"
                        >
                            OUR <span className="text-[#FF8A00]">GALLERY</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-2xl mx-auto text-lg text-gray-600"
                        >
                            A showcase of our finest campaigns — from in-bus LED screens to
                            outdoor placements and event activations across Thrissur.
                        </motion.p>
                    </div>
                </section>

                {/* Filter Bar */}
                {!loading && !error && items.length > 0 && (
                    <section className="pb-10 px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center gap-3 flex-wrap justify-center">
                                <Filter size={16} className="text-[#FF8A00]" />
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === cat
                                            ? "bg-[#FF8A00] text-white shadow-[0_8px_20px_rgba(255,138,0,0.35)]"
                                            : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF8A00] hover:text-[#FF8A00]"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Masonry Grid */}
                <section className="pb-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="flex justify-center py-24">
                                <Loader2 size={32} className="animate-spin text-[#FF8A00]" />
                            </div>
                        ) : error ? (
                            <div className="text-center py-24">
                                <p className="text-gray-500 font-bold mb-4">{error}</p>
                                <button
                                    onClick={fetchMedia}
                                    className="px-6 py-2 bg-[#FF8A00] text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#ff9f33] transition-colors"
                                >
                                    Try again
                                </button>
                            </div>
                        ) : (
                            <>
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[250px]"
                                >
                                    <AnimatePresence>
                                        {filtered.map((item, index) => (
                                            <motion.div
                                                key={item._id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.35 }}
                                                className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-gray-200 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500 ${index % 3 === 0 ? "row-span-2" : ""
                                                    }`}
                                                onClick={() => setLightboxItem(item)}
                                            >
                                                {item.type === "video" ? (
                                                    <video
                                                        src={item.url}
                                                        poster={getVideoPoster(item.url)}
                                                        muted
                                                        loop
                                                        playsInline
                                                        preload="none"
                                                        onMouseEnter={playPreview}
                                                        onMouseLeave={stopPreview}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <img
                                                        src={item.url}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                )}

                                                {/* Video indicator */}
                                                {item.type === "video" && (
                                                    <div className="absolute bottom-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                                                        <Play size={14} className="ml-0.5 text-[#111827]" fill="currentColor" />
                                                    </div>
                                                )}

                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6 pointer-events-none">
                                                    <span className="text-xs font-bold text-[#FF8A00] uppercase tracking-widest mb-1">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="font-['Oswald'] text-xl font-bold text-white">
                                                        {item.title}
                                                    </h3>
                                                </div>

                                                {/* Zoom Icon */}
                                                <div className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                    <ZoomIn size={16} className="text-white" />
                                                </div>

                                                {/* Category badge */}
                                                <div className="absolute top-4 left-4 px-3 py-1 bg-[#FF8A00] text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                                    {item.category}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {filtered.length === 0 && (
                                    <div className="text-center py-24 text-gray-400 font-bold uppercase tracking-widest">
                                        No items in this category yet.
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className="pb-24 px-6">
                    <div className="max-w-5xl mx-auto bg-[#111827] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8A00] opacity-10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity duration-700" />
                        <div className="relative z-10">
                            <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold text-white mb-6">
                                WANT YOUR BRAND{" "}
                                <span className="text-[#FF8A00]">IN OUR GALLERY?</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                                Let's create something powerful together. Contact us to start
                                your campaign today.
                            </p>
                            <a
                                href="/contact"
                                className="inline-block px-10 py-4 bg-[#FF8A00] text-white rounded-full font-bold uppercase tracking-wider hover:bg-[#ff9f33] hover:shadow-[0_10px_30px_rgba(255,138,0,0.4)] transition-all duration-300"
                            >
                                Start a Campaign
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
                        onClick={() => setLightboxItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative max-w-5xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setLightboxItem(null)}
                                className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#FF8A00] hover:text-white transition-colors shadow-lg"
                            >
                                <X size={18} />
                            </button>

                            {lightboxItem.type === "video" ? (
                                <video
                                    src={lightboxItem.url}
                                    controls
                                    autoPlay
                                    playsInline
                                    className="w-full rounded-2xl shadow-2xl max-h-[80vh] bg-black"
                                />
                            ) : (
                                <img
                                    src={lightboxItem.url}
                                    alt={lightboxItem.title}
                                    className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain"
                                />
                            )}

                            <div className="mt-4 text-center">
                                <span className="text-xs font-bold text-[#FF8A00] uppercase tracking-widest">
                                    {lightboxItem.category}
                                </span>
                                <p className="font-['Oswald'] text-2xl font-bold text-white mt-1">
                                    {lightboxItem.title}
                                </p>
                                {lightboxItem.description && (
                                    <p className="mt-2 text-sm text-gray-300 max-w-2xl mx-auto">
                                        {lightboxItem.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="font-['Urbanist']">
                <Footer />
            </div>
        </div>
    );
};

export default GalleryPage;