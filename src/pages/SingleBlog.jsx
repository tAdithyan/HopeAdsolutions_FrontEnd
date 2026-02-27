import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, ArrowUpRight } from "lucide-react";
import Header from "../components/header";
import { Footer } from "../components/Footer";
import { fetchBlogById, fetchBlogs } from "../data/blogs";
import Loading from "../components/common/Loading";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import SEO from "../components/SEO";

const SingleBlogPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlog = async () => {
            try {
                setLoading(true);
                const data = await fetchBlogById(id);
                setBlog(data);
            } catch (error) {
                console.error("Error loading blog:", error);
            } finally {
                setLoading(false);
            }
        };
        loadBlog();

        // Scroll to top on load
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return <Loading fullScreen />;
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#EBEBEB] flex items-center justify-center font-['Urbanist']">
                <div className="text-center">
                    <h1 className="text-4xl font-bold font-['Oswald'] text-[#111827] mb-4">Blog Not Found</h1>
                    <Link to="/blogs" className="text-[#FF8A00] font-bold hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft size={20} /> Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    // Since we don't have all blogs here, we might need another strategy for related posts
    // For now, removing related posts logic or fetching random ones could be done separately
    // Keeping it simple for now by removing it or setting empty
    const relatedPosts = [];

    return (
        <div className="min-h-screen bg-[#EBEBEB] text-[#111827] relative overflow-x-hidden">
            <Header />

            <SEO
                title={blog.title}
                description={blog.Excerpt}
                keywords={`advertising blog, ${blog.title}, marketing article, creative news`}
                ogImage={blog.image}
                ogType="article"
            />

            {/* Progress Bar (Optional) */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-[#FF8A00] z-50 origin-left"
                style={{ scaleX: 0 }} // Placeholder for scroll progress logic
            />

            <main className="font-['Urbanist'] pt-24 md:pt-32 pb-20">
                {/* 1. Article Header & Hero */}
                <article className="max-w-4xl mx-auto px-6">
                    {/* Breadcrumb */}
                    <Link to="/blogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF8A00] transition-colors mb-8 text-sm font-bold uppercase tracking-wider">
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>

                    {/* Title & Meta */}
                    <div className="text-center mb-10">


                        <h1 className="font-['Oswald'] text-4xl md:text-6xl font-bold text-[#111827] mb-6 leading-tight">
                            {blog.title}
                        </h1>
                        <p className="font-['Urbanist'] text-lg md:text-xl font-bold text-[#111827] mb-6 leading-tight">
                            {blog.Excerpt}
                        </p>


                    </div>

                    {/* Hero Image */}
                    <div className="rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)] mb-16 aspect-video">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content Body */}
                    <div
                        className="prose prose-lg prose-gray max-w-none 
                        prose-headings:font-['Oswald'] prose-headings:font-bold prose-headings:text-[#111827]
                        prose-p:font-['Urbanist'] prose-p:text-gray-600 prose-p:leading-relaxed
                        prose-a:text-[#FF8A00] prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-l-[#FF8A00] prose-blockquote:bg-white prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:shadow-sm prose-blockquote:not-italic
                        prose-strong:text-[#111827]
                        mb-20"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />


                </article>


            </main>

            <div className="font-['Urbanist']">
                <Footer />
            </div>
        </div>
    );
};

export default SingleBlogPage;
