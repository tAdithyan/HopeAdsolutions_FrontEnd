import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Filter } from "lucide-react";
import Header from "../components/header";
import { Footer } from "../components/Footer";
import SEO from "../components/SEO";

const categories = ["All", "Transit Ads", "Restaurant", "Outdoor", "Events"];

const galleryItems = [
    {
        id: 1,
        category: "Transit Ads",
        src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
        title: "City Bus LED Campaign",
        span: "row-span-2",
    },
    {
        id: 2,
        category: "Outdoor",
        src: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2069&auto=format&fit=crop",
        title: "Digital Billboard Night",
        span: "",
    },
    {
        id: 3,
        category: "Restaurant",
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
        title: "Restaurant Digital Display",
        span: "",
    },
    {
        id: 4,
        category: "Events",
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
        title: "Brand Activation Event",
        span: "row-span-2",
    },
    {
        id: 5,
        category: "Transit Ads",
        src: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=2070&auto=format&fit=crop",
        title: "In-Bus Screen Network",
        span: "",
    },
    {
        id: 6,
        category: "Outdoor",
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
        title: "Scenic Outdoor Placement",
        span: "",
    },
    {
        id: 7,
        category: "Restaurant",
        src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop",
        title: "Dining Area Screen Ad",
        span: "row-span-2",
    },
    {
        id: 8,
        category: "Transit Ads",
        src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1964&auto=format&fit=crop",
        title: "Metro Route Campaign",
        span: "",
    },
    {
        id: 9,
        category: "Events",
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
        title: "Exhibition Branding",
        span: "",
    },
    {
        id: 10,
        category: "Outdoor",
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
        title: "Roadside LED Panel",
        span: "",
    },
    {
        id: 11,
        category: "Transit Ads",
        src: "https://images.unsplash.com/photo-1546961342-ea5f60a193b4?q=80&w=1974&auto=format&fit=crop",
        title: "Bus Route Wrap",
        span: "row-span-2",
    },
    {
        id: 12,
        category: "Events",
        src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop",
        title: "Corporate Event Display",
        span: "",
    },
];

const GalleryPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightboxItem, setLightboxItem] = useState(null);

    const filtered =
        activeCategory === "All"
            ? galleryItems
            : galleryItems.filter((item) => item.category === activeCategory);

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

                {/* Masonry Grid */}
                <section className="pb-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[250px]"
                        >
                            <AnimatePresence>
                                {filtered.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.35 }}
                                        className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500 ${item.span}`}
                                        onClick={() => setLightboxItem(item)}
                                    >
                                        <img
                                            src={item.src}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                                            <span className="text-xs font-bold text-[#FF8A00] uppercase tracking-widest mb-1">
                                                {item.category}
                                            </span>
                                            <h3 className="font-['Oswald'] text-xl font-bold text-white">
                                                {item.title}
                                            </h3>
                                        </div>
                                        {/* Zoom Icon */}
                                        <div className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <ZoomIn size={16} className="text-white" />
                                        </div>
                                        {/* Category badge */}
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-[#FF8A00] text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                            <img
                                src={lightboxItem.src}
                                alt={lightboxItem.title}
                                className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain"
                            />
                            <div className="mt-4 text-center">
                                <span className="text-xs font-bold text-[#FF8A00] uppercase tracking-widest">
                                    {lightboxItem.category}
                                </span>
                                <p className="font-['Oswald'] text-2xl font-bold text-white mt-1">
                                    {lightboxItem.title}
                                </p>
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
