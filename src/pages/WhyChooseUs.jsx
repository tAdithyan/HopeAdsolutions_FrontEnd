import { motion } from "framer-motion";
import {
    TruckIcon,
    EyeIcon,
    AdjustmentsHorizontalIcon,
    MapPinIcon,
    TvIcon,
    ArrowPathIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Header from "../components/header";
import { Footer } from "../components/Footer";
import SEO from "../components/SEO";

const features = [
    {
        icon: TruckIcon,
        title: "Premium Transit Advertising",
        description:
            "Reach thousands of commuters daily through our high-definition 24-inch and 32-inch LED screens placed inside buses.",
    },
    {
        icon: EyeIcon,
        title: "Captive Audience Engagement",
        description:
            "Unlike traditional billboards, our eye-level screens ensure your message is seen and remembered throughout the entire journey.",
    },
    {
        icon: AdjustmentsHorizontalIcon,
        title: "Customizable Solutions",
        description:
            "From localized bus routes to grand outdoor events, we tailor our screen time to meet your specific business goals.",
    },
    {
        icon: MapPinIcon,
        title: "Strategic Local Placement",
        description:
            "We dominate the most high-traffic routes and popular hubs across the Thrissur district for maximum visibility.",
    },
    {
        icon: TvIcon,
        title: "Vibrant HD Displays",
        description:
            "State-of-the-art Android LED technology ensures your brand colors and visuals are always crisp, vivid, and impactful.",
    },
    {
        icon: ArrowPathIcon,
        title: "Consistent Visibility",
        description:
            "Reliable uptime and high-frequency ad rotation across every route and every screen in our network, all day long.",
    },
];

const stats = [
    { value: "30k+", label: "Daily Viewers" },
    { value: "10+", label: "Strategic Bus Routes" },
    { value: "24/7", label: "Digital Management" },
    { value: "100%", label: "Eye-Level Visibility" },

];

const WhyChooseUsPage = () => {
    return (
        <div className="min-h-screen bg-[#EBEBEB] text-[#111827] relative overflow-hidden">
            <SEO
                title="Why Choose Us"
                description="Discover why top brands trust Billford Advertising for premium transit and outdoor advertising in Thrissur. Captive audiences, HD displays, and strategic placement."
                keywords="why choose billford, advertising agency thrissur, transit advertising, LED bus screens, outdoor advertising benefits"
                ogType="website"
            />

            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,_rgba(255,138,0,0.08)_0%,_transparent_70%)] pointer-events-none" />

            <Header />

            <main className="font-['Urbanist']">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 mb-4"
                        >
                            <div className="w-8 h-0.5 bg-[#FF8A00]" />
                            <span className="text-sm font-bold text-[#FF8A00] uppercase tracking-wider">
                                Our Advantage
                            </span>
                            <div className="w-8 h-0.5 bg-[#FF8A00]" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-['Oswald'] text-5xl md:text-7xl font-bold text-[#111827] mb-4"
                        >
                            WHY <span className="text-[#FF8A00]">CHOOSE</span> US
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-xl text-[#FF8A00] font-['Oswald'] font-bold mb-6 uppercase tracking-widest"
                        >
                            Your Vision. Our Screen. Unforgettable Impact.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed"
                        >
                            Where powerful brand stories unfold through innovation, reach, and
                            impeccable visibility — crafted with passion, precision, and a
                            touch of digital magic.
                        </motion.p>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="pb-20 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-[#111827] rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF8A00] via-orange-300 to-[#FF8A00]" />
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center"
                                >
                                    <p className="font-['Oswald'] text-4xl font-bold text-[#FF8A00] mb-1">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="pb-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative bg-white rounded-3xl p-8 hover:shadow-[0_20px_50px_rgba(255,138,0,0.12)] transition-all duration-500 border border-gray-100"
                                    >
                                        {/* Top accent line on hover */}
                                        <div className="absolute top-0 left-8 right-8 h-0.5 bg-[#FF8A00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full origin-left" />

                                        <div className="flex items-center justify-center w-14 h-14 bg-[#FF8A00]/10 rounded-2xl mb-6 group-hover:bg-[#FF8A00] transition-colors duration-300">
                                            <Icon className="w-8 h-8 text-[#FF8A00] group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="font-['Oswald'] text-xl font-bold text-[#111827] mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed font-medium">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="pb-24 px-6">
                    <div className="max-w-5xl mx-auto bg-[#111827] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8A00] opacity-10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity duration-700" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF4D30] opacity-10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2 group-hover:opacity-20 transition-opacity duration-700" />

                        <div className="relative z-10">
                            <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold text-white mb-6">
                                READY TO GROW YOUR{" "}
                                <span className="text-[#FF8A00]">BRAND?</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                                Let's build something unforgettable together. Reach out to us
                                and start your advertising journey today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/contact"
                                    className="px-10 py-4 bg-[#FF8A00] text-white rounded-full font-bold uppercase tracking-wider hover:bg-[#ff9f33] hover:shadow-[0_10px_30px_rgba(255,138,0,0.4)] transition-all duration-300"
                                >
                                    Get in Touch
                                </Link>
                                <Link
                                    to="/services"
                                    className="px-10 py-4 border border-gray-600 text-gray-300 rounded-full font-bold uppercase tracking-wider hover:border-[#FF8A00] hover:text-[#FF8A00] transition-all duration-300"
                                >
                                    View Services
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <div className="font-['Urbanist']">
                <Footer />
            </div>
        </div>
    );
};

export default WhyChooseUsPage;
