import React, { useState } from 'react';
import { Play, Check, Video, Camera, Clapperboard, MonitorPlay, ArrowUpRight } from 'lucide-react';
import Header from "../components/header";
import { Footer } from "../components/Footer";
import { Link } from 'react-router-dom';
import SEO from "../components/SEO";

const Services = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="min-h-screen bg-[#EBEBEB] text-[#111827] relative overflow-hidden">
            {/* Global Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(255,138,0,0.15)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(255,138,0,0.1)_0%,_transparent_70%)] pointer-events-none" />

            <SEO
                title="Our Services"
                description="Explore our comprehensive advertising services including video editing, professional videography, billboard advertising, and brand strategy."
                keywords="video editing, videography, billboard rental, brand strategy, advertising services, creative production"
                ogType="website"
            />

            <Header />

            <main className="pt-24 lg:pt-32 font-['Urbanist']">
                {/* 1. Page Title / Hero (Re-styled to match light theme) */}
                <section className="relative container mx-auto px-6 max-w-7xl mb-20 text-center">
                    <div className="inline-flex items-center gap-2 mb-4 justify-center">
                        <div className="w-8 h-0.5 bg-[#FF8A00]" />
                        <span className="text-sm font-semibold text-[#FF8A00] uppercase tracking-wider">
                            Our Services
                        </span>
                        <div className="w-8 h-0.5 bg-[#FF8A00]" />
                    </div>

                    <h1 className="font-['Oswald'] text-5xl md:text-7xl font-bold text-[#111827] mb-6">
                        WHAT WE <span className="text-[#FF8A00]">DO</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-sm md:text-base uppercase tracking-widest text-gray-500">
                        <Link to="/" className="hover:text-[#FF8A00] transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-[#FF8A00]">Service</span>
                    </div>
                </section>

                {/* 2. Highlight Section */}
                <section className="pb-20 md:pb-28 container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <div className="space-y-8 relative z-10">
                            <div>
                                <h2 className="font-['Oswald'] text-4xl md:text-6xl font-bold text-[#111827] leading-tight">
                                    CAPTURE THE <br />
                                    <span className="text-[#FF8A00] relative inline-block">
                                        GREATEST
                                        <span className="absolute inset-0 blur-lg bg-[#FF8A00]/20 -z-10" />
                                    </span> <br />
                                    EXPERIENCE
                                </h2>
                            </div>

                            <p className={`text-gray-600 leading-relaxed text-lg font-medium transition-all duration-500 ${!isExpanded ? 'line-clamp-5' : ''}`}>
                                Our Services
                                Exquisite digital advertising experiences crafted with precision. From intimate local campaigns to grand regional displays, our services bring visibility, high impact, and memorable presentation to every brand story.
                                <br /><br />
                                <strong>Transit Advertising in Buses</strong><br />
                                Create unforgettable brand moments with eye-level engagement.
                                We offer thoughtfully curated digital ad slots on high-definition 24-inch and 32-inch LED screens placed directly behind the driver’s seat. This ensures your message feels premium, meaningful, and impossible for passengers to miss throughout their entire journey.
                                <br /><br />
                                <strong>Restaurant Advertising</strong><br />
                                Perfect for localized reach during leisure and dining hours.
                                Our restaurant advertising solutions place your brand in front of a relaxed and captive audience. With strategically mounted digital screens, we ensure your business reflects high standards and captures the attention of diners across the Thrissur district.
                                <br /><br />
                                <strong>Outdoor Advertising</strong><br />
                                Professional displays that reflect your brand’s strength and standards.
                            </p>

                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="px-8 py-4 bg-white border border-[#FF8A00] text-[#FF8A00] rounded-full font-bold uppercase tracking-wider hover:bg-[#FF8A00] hover:text-white transition-all shadow-lg hover:shadow-orange-500/30 flex items-center gap-2 group"
                            >
                                {isExpanded ? 'Show Less' : 'Learn More'}
                                <ArrowUpRight className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-[-45deg]' : 'group-hover:rotate-45'}`} />
                            </button>
                        </div>

                        {/* Image */}
                        <div className="relative group">
                            {/* Decorative blur backing */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF8A00]/20 to-orange-100 blur-xl opacity-70 rounded-3xl" />

                            <img
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                                alt="Cameraman"
                                className="relative z-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </section>

                {/* 3. Services Icons Bar (Light Theme Card Style) */}
                <section className="py-10">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="bg-white rounded-3xl p-10 shadow-[0_40px_100px_rgba(0,0,0,0.08)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative overflow-hidden">
                            {/* Decorative accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF8A00] via-orange-300 to-[#FF8A00]" />

                            {[
                                { icon: MonitorPlay, title: "Video Editing", subtitle: "Supporting Digital Business" },
                                { icon: Camera, title: "Cameraman", subtitle: "Professional Shooters" },
                                { icon: Video, title: "Videography", subtitle: "High Quality Production" },
                                { icon: Clapperboard, title: "Branding", subtitle: "Identity & Strategy" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center group cursor-pointer p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                                    <div className="w-16 h-16 rounded-full bg-[#FF8A00]/10 flex items-center justify-center mb-4 group-hover:bg-[#FF8A00] transition-colors duration-300">
                                        <item.icon className="w-8 h-8 text-[#FF8A00] group-hover:text-white transition-colors" />
                                    </div>
                                    <h4 className="font-['Oswald'] font-bold text-xl text-[#111827]">{item.title}</h4>
                                    <p className="text-sm text-gray-500 mt-2">{item.subtitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Process Section (How We Work) */}
                <section className="py-24 container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Video Side */}
                        <div className="relative group rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                            <img
                                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop"
                                alt="How We Work"
                                className="w-full h-full object-cover min-h-[400px] group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex items-center justify-center">
                                <button className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                    <Play className="w-8 h-8 text-[#FF8A00] ml-1" fill="#FF8A00" />
                                </button>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div>
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="text-sm font-semibold text-[#FF8A00] uppercase tracking-wider">Process</span>
                                <div className="w-12 h-0.5 bg-[#FF8A00]/30" />
                            </div>
                            <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold text-[#111827] mb-6">HOW WE WORK</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                                Transparent, collaborative, and results-driven. We've refined our process to ensure
                                seamless execution from the first meeting to the final delivery.
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                {[
                                    "Strategic Planning",
                                    "Creative Direction",
                                    "High-End Production",
                                    "Post-Production Magic",
                                    "Multi-Platform Delivery",
                                    "Performance Analysis"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                        <div className="w-5 h-5 rounded-full bg-[#FF8A00]/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-[#FF8A00]" strokeWidth={3} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 5. Brand Logos (Clean Style) */}
                {/* <section className="py-16 border-t border-gray-200/60">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Trusted By</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex justify-center items-center text-2xl font-black font-['Oswald'] text-gray-800">ALJER</div>
                            <div className="flex justify-center items-center text-2xl font-black font-['Oswald'] text-gray-800">GEOMETRIA</div>
                            <div className="flex justify-center items-center text-2xl font-black font-['Oswald'] text-gray-800">FREEMAN</div>
                            <div className="flex justify-center items-center text-2xl font-black font-['Oswald'] text-gray-800">CIPLEX</div>
                            <div className="flex justify-center items-center text-2xl font-black font-['Oswald'] text-gray-800">AVANTE</div>
                            <div className="flex justify-center items-center text-2xl font-black font-['Oswald'] text-gray-800">DanArt</div>
                            <div className="flex justify-center items-center text-2xl font-black font-['Oswald'] text-gray-800">EMOTION</div>
                            <div className="flex justify-center items-center text-2xl font-black font-['Oswald'] text-gray-800">BITSTREAM</div>
                        </div>
                    </div>
                </section> */}

                {/* 6. CTA Footer Banner (Kept visual impact but updated typography) */}
                <section className="relative h-[50vh] flex items-center justify-center bg-fixed bg-cover bg-center mt-10"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1601506521937-244b01e9d128?q=80&w=2214&auto=format&fit=crop')"
                    }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative z-10 text-center px-6">
                        <p className="text-[#FF8A00] font-bold uppercase tracking-widest text-sm mb-4">Hire Us Now</p>
                        <h2 className="font-['Oswald'] text-4xl md:text-6xl font-bold text-white mb-8 max-w-4xl leading-tight">
                            READY TO TAKE THE <br />
                            <span className="text-[#FF8A00]">PERFECT SHOT?</span>
                        </h2>
                        <Link
                            to="/contact"
                            className="inline-block px-10 py-4 bg-[#FF8A00] text-white rounded-full font-bold uppercase tracking-wider hover:bg-[#E07900] transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,138,0,0.5)] text-center"
                        >
                            Get Started
                        </Link>
                    </div>
                </section>

            </main>
            <div className="font-['Urbanist']">
                <Footer />
            </div>
        </div>
    );
};

export default Services;
