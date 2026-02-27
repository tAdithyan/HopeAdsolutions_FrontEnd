import { Play, ShieldCheck, PieChart, Users, Facebook, Twitter, Linkedin, Instagram, ArrowUpRight, Eye, Target, Zap } from "lucide-react";
import Header from "../components/header";
import { Footer } from "../components/Footer";
import { Link } from 'react-router-dom';
import SEO from "../components/SEO";
import about1 from '../assets/abt1.jpeg'
import about2 from '../assets/abt2.jpeg'

// --- Hero Section ---
const HeroSection = () => {
    return (
        <section className="relative container mx-auto px-6 max-w-7xl mb-20 text-center pt-24 lg:pt-32">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
                <div className="w-8 h-0.5 bg-[#FF8A00]" />
                <span className="text-sm font-semibold text-[#FF8A00] uppercase tracking-wider">
                    Our Story
                </span>
                <div className="w-8 h-0.5 bg-[#FF8A00]" />
            </div>

            <h1 className="font-['Oswald'] text-5xl md:text-7xl font-bold text-[#111827] mb-6">
                ABOUT <span className="text-[#FF8A00]">US</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm md:text-base uppercase tracking-widest text-gray-500">
                <Link to="/" className="hover:text-[#FF8A00] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#FF8A00]">About</span>
            </div>
        </section>
    );
};

// --- Introduction Section ---
const IntroSection = () => {
    return (
        <section className="pb-20 md:pb-28">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Top Header Part */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16 items-end">
                    <div>
                        <h2 className="font-['Oswald'] text-4xl md:text-6xl font-bold text-[#111827] leading-tight">
                            INTRODUCTION TO <br />
                            <span className="text-[#FF8A00] relative inline-block">
                                BEST DIGITAL
                                <span className="absolute inset-0 blur-lg bg-[#FF8A00]/20 -z-10" />
                            </span> <br />
                            AGENCY
                        </h2>
                    </div>

                    <div className="flex flex-col justify-center space-y-6 text-gray-600 font-medium text-lg">
                        <p className="text-[#FF8A00] font-['Oswald'] font-bold uppercase tracking-wider">
                            Where powerful brand stories unfold through innovation, reach, and impeccable visibility.
                        </p>
                        <p>
                            At Hope Ad Solutions, our mission is crafted with passion, precision, and a touch of digital magic.
                            We transform everyday bus journeys into high-impact advertising opportunities with our
                            eye-level 24-inch and 32-inch LED screens.
                        </p>
                        <p>
                            Serving businesses across Kerala, including Thrissur, we deliver targeted digital campaigns
                            designed to capture attention and boost brand recall. With strategic placement and
                            high-definition displays, we ensure your message reaches a captive audience at the
                            perfect time — making your brand truly unforgettable.
                        </p>
                    </div>
                </div>

                {/* Features Row */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    {[
                        { icon: Eye, title: "Eye-Level Maximum Visibility", desc: "Your ads are placed on 24-inch HD LED screens inside buses at direct eye-level, ensuring strong attention and high brand recall." },
                        { icon: Target, title: "Strategic & Targeted Reach", desc: "Campaigns are carefully positioned across key routes in Kerala, including Thrissur, to reach a captive and relevant audience." },
                        { icon: Zap, title: "Customized High-Impact Campaigns", desc: "Every advertisement is tailored to your brand — delivering professional execution and memorable brand experiences." }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex items-start gap-4 hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="w-14 h-14 bg-[#FF4D30]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#FF4D30] group-hover:bg-[#FF4D30] group-hover:text-white transition-colors">
                                <item.icon size={26} />
                            </div>
                            <div>
                                <h3 className="font-['Oswald'] font-bold text-[#111827] text-xl mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Image Collage Area */}
                <div className="mt-12 grid lg:grid-cols-12 gap-8 relative items-center">
                    <div className="lg:col-span-7 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-transparent blur-xl opacity-50 rounded-3xl" />
                        <img
                            src={about2}
                            alt="Office Team"
                            className="relative z-10 w-full h-[400px] md:h-[500px] object-cover rounded-[2rem] shadow-2xl"
                        />
                    </div>
                    <div className="lg:col-span-5 relative lg:-ml-24 z-20">
                        <div className="relative rounded-[2rem] overflow-hidden border-[8px] border-[#EBEBEB] shadow-[0_30px_60px_rgba(0,0,0,0.15)] group hover:scale-105 transition-transform duration-500">
                            <img
                                src={about1}
                                alt="Discussion"
                                className="w-full h-[300px] object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors">
                                <button className="w-16 h-16 bg-[#FF4D30] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-orange-500/50">
                                    <Play fill="white" className="text-white ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

// --- Team Section ---
const TeamSection = () => {
    const members = [
        {
            name: "Sony Madison",
            role: "CEO, Director",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
            bgColor: "bg-[#FF4D30]"
        },
        {
            name: "Hary Worth",
            role: "Head Manager",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
            bgColor: "bg-[#FF4D30]"
        },
        {
            name: "Jenny Hobb",
            role: "Branch Manager",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
            bgColor: "bg-[#FF4D30]"
        },
        {
            name: "Johny Smith",
            role: "Supervisor",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
            bgColor: "bg-[#FF4D30]"
        }
    ];

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#FF4D30]"></div>
                        <span className="uppercase text-xs font-bold tracking-widest text-[#FF4D30] bg-[#FF4D30]/10 px-3 py-1 rounded-full">OUR TEAM</span>
                        <div className="w-2 h-2 rounded-full bg-[#FF4D30]"></div>
                    </div>
                    <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold text-[#111827]">
                        MEET THE <span className="text-[#FF4D30]">EXPERTS</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members.map((member, idx) => (
                        <div key={idx} className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-300">
                            {/* Image Container */}
                            <div className="h-[380px] overflow-hidden relative">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#FF4D30]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Social Icons on Hover */}
                                <div className="absolute right-4 top-4 flex flex-col gap-3 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 delay-100">
                                    {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                        <button key={i} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-[#111827] hover:text-white transition-colors shadow-lg">
                                            <Icon size={16} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Card Content - Floating Badge Style */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]">
                                <div className={`relative bg-white text-[#111827] p-4 rounded-2xl text-center shadow-xl group-hover:-translate-y-2 transition-transform duration-300`}>
                                    <h3 className="font-['Oswald'] font-bold text-xl uppercase">{member.name}</h3>
                                    <p className="text-[#FF4D30] text-xs font-bold uppercase tracking-wider mt-1">{member.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const About = () => {
    return (
        <div className="min-h-screen bg-[#EBEBEB] text-[#111827] relative overflow-hidden">
            {/* Global Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(255,138,0,0.15)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(255,138,0,0.1)_0%,_transparent_70%)] pointer-events-none" />

            <SEO
                title="About Us"
                description="Learn more about Billford Advertising, our mission, our creative experts, and how we help businesses achieve digital growth."
                keywords="advertising team, marketing experts, our story, agency mission, creative growth"
                ogType="website"
            />

            <Header />
            <main className="font-['Urbanist']">
                <HeroSection />
                <IntroSection />
                {/* <TeamSection /> */}
            </main>
            <div className="font-['Urbanist']">
                <Footer />
            </div>
        </div>
    );
};

export default About;
