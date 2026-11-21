
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import Header from "../components/header";
import { Footer } from "../components/Footer";
import { fetchBlogById } from "../data/blogs";
import Loading from "../components/common/Loading";
import SEO from "../components/SEO";

const SingleBlogPage = () => {

    // URL example:
    // /blog/how-to-create-advertisements-people-actually-remember?blogid=692abc123456

    // Get slug from URL
    const { slug } = useParams();

    // Get blog ID from query parameter
    const [searchParams] = useSearchParams();

    const blogId = searchParams.get("blogid");


    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);


    // =====================================================
    // FETCH BLOG USING MONGODB ID
    // =====================================================

    useEffect(() => {

        const loadBlog = async () => {

            if (!blogId) {
                console.error("Blog ID not found in URL");
                setBlog(null);
                setLoading(false);
                return;
            }

            try {

                setLoading(true);

                // Fetch blog using MongoDB ID
                const data = await fetchBlogById(blogId);

                setBlog(data);

            } catch (error) {

                console.error("Error loading blog:", error);

                setBlog(null);

            } finally {

                setLoading(false);

            }
        };


        loadBlog();

        // Scroll to top
        window.scrollTo(0, 0);

    }, [blogId]);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return <Loading fullScreen />;
    }


    // =====================================================
    // BLOG NOT FOUND
    // =====================================================

    if (!blog) {

        return (
            <div className="min-h-screen bg-[#EBEBEB] flex items-center justify-center font-['Urbanist']">

                <div className="text-center px-6">

                    <h1 className="text-4xl font-bold font-['Oswald'] text-[#111827] mb-4">
                        Blog Not Found
                    </h1>

                    <p className="text-gray-500 mb-6">
                        The blog you're looking for doesn't exist.
                    </p>

                    <Link
                        to="/blogs"
                        className="text-[#FF8A00] font-bold hover:underline flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Back to Blogs
                    </Link>

                </div>

            </div>
        );
    }


    // =====================================================
    // BLOG PAGE
    // =====================================================

    return (
        <div className="min-h-screen bg-[#EBEBEB] text-[#111827] relative overflow-x-hidden">

            <Header />


            {/* SEO */}

            <SEO
                title={blog.title}
                description={blog.Excerpt}
                keywords={`advertising blog, ${blog.title}, marketing article, creative news`}
                ogImage={blog.image}
                ogType="article"
            />


            {/* Progress Bar */}

            <motion.div
                className="fixed top-0 left-0 h-1 bg-[#FF8A00] z-50 origin-left"
                style={{ scaleX: 0 }}
            />


            <main className="font-['Urbanist'] pt-24 md:pt-32 pb-20">

                <article className="max-w-4xl mx-auto px-6">


                    {/* =========================================
                        BACK BUTTON
                    ========================================= */}

                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF8A00] transition-colors mb-8 text-sm font-bold uppercase tracking-wider"
                    >
                        <ArrowLeft size={16} />
                        Back to Insights
                    </Link>


                    {/* =========================================
                        TITLE
                    ========================================= */}

                    <div className="text-center mb-10">

                        <h1 className="font-['Oswald'] text-4xl md:text-6xl font-bold text-[#111827] mb-6 leading-tight">
                            {blog.title}
                        </h1>


                        {blog.Excerpt && (

                            <p className="font-['Urbanist'] text-lg md:text-xl font-bold text-[#111827] mb-6 leading-tight">
                                {blog.Excerpt}
                            </p>

                        )}

                    </div>


                    {/* =========================================
                        HERO IMAGE
                    ========================================= */}

                    {blog.image && (

                        <div className="rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.1)] mb-16 aspect-video">

                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />

                        </div>

                    )}


                    {/* =========================================
                        BLOG CONTENT
                    ========================================= */}

                    <div
                        className="mb-20"
                        dangerouslySetInnerHTML={{
                            __html: blog.content,
                        }}
                    />

                </article>

            </main>


            {/* FOOTER */}

            <div className="font-['Urbanist']">
                <Footer />
            </div>

        </div>
    );
};

export default SingleBlogPage;
