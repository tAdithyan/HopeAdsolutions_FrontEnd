import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, User, Tag, Clock } from "lucide-react";
import Header from "../components/header";
import { Footer } from "../components/Footer";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import SEO from "../components/SEO";


import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { fetchBlogs } from "../data/blogs";
import Loading from "../components/common/Loading";

const BlogCard = ({ blog, featured = false }) => (
    <Link to={`/blog/${blog._id}`} className="block h-full">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(255,138,0,0.15)] transition-all duration-500 border border-gray-100 h-full ${featured ? 'md:grid md:grid-cols-2 md:gap-8' : 'flex flex-col'}`}
        >
            {/* Image Container */}
            <div className={`overflow-hidden relative ${featured ? 'h-64 md:h-full' : 'h-64'}`}>
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-center h-full">


                <h3 className={`font-['Oswald'] font-bold text-[#111827] mb-4 group-hover:text-[#FF8A00] transition-colors ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                    {blog.title}
                </h3>

                <p className="font-['Urbanist'] text-gray-600 mb-6 line-clamp-3">
                    {blog.Excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">


                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#FF8A00] group-hover:border-[#FF8A00] group-hover:text-white transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </motion.div>
    </Link>
);

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setLoading(true);
                const data = await fetchBlogs();
                setBlogs(data || []);
            } catch (error) {
                console.error("Error loading blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    if (loading) {
        return <Loading fullScreen />;
    }

    return (
        <div className="min-h-screen bg-[#EBEBEB] text-[#111827] relative overflow-hidden">
            <Header />

            <SEO
                title="Blog"
                description="Read our latest insights, success stories, and expert advice on advertising, marketing, and business growth."
                keywords="advertising blog, marketing insights, branding tips, digital trends, success stories"
                ogType="website"
            />

            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,_rgba(255,138,0,0.08)_0%,_transparent_70%)] pointer-events-none" />

            <main className="font-['Urbanist']">
                <section className="relative pt-32 pb-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 mb-4"
                            >
                                <div className="w-8 h-0.5 bg-[#FF8A00]" />
                                <span className="text-sm font-bold text-[#FF8A00] uppercase tracking-wider">
                                    Our Blog
                                </span>
                                <div className="w-8 h-0.5 bg-[#FF8A00]" />
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-['Oswald'] text-5xl md:text-7xl font-bold text-[#111827] mb-6"
                            >
                                LATEST <span className="text-[#FF8A00]">INSIGHTS</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="max-w-2xl mx-auto text-lg text-gray-600"
                            >
                                Expert perspectives on outdoor advertising, brand strategy, and the future of media.
                            </motion.p>
                        </div>

                        {/* Featured Post */}
                        {blogs.length > 0 && (
                            <div className="mb-12">
                                <BlogCard blog={blogs[0]} featured={true} />
                            </div>
                        )}

                        {/* Blog Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.slice(1).map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>

                        {/* CTA Section */}
                        <div className="mt-24 bg-[#111827] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden group">
                            {/* Decorative Glows */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8A00] opacity-10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity duration-700" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF4D30] opacity-10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2 group-hover:opacity-20 transition-opacity duration-700" />

                            <div className="relative z-10 max-w-3xl mx-auto">
                                <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold text-white mb-6">
                                    READY TO ELEVATE YOUR BRAND?
                                </h2>
                                <p className="text-gray-400 text-lg mb-8">
                                    Join hundreds of successful brands leveraging our expertise. Let's create something impactful together.
                                </p>
                                <Link to="/contact" className="px-8 py-4 bg-[#FF8A00] text-white rounded-full font-bold uppercase tracking-wider hover:bg-[#ff9f33] hover:shadow-[0_10px_30px_rgba(255,138,0,0.4)] transition-all duration-300">
                                    Start Your Project
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

export default BlogsPage;
