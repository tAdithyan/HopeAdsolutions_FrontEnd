import React from 'react';
import Header from '../components/header';
import { Footer } from '../components/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Cookie, Settings, Activity, Info, ExternalLink } from 'lucide-react';

const CookiePolicy = () => {
    const sections = [
        {
            title: "1. What Are Cookies?",
            icon: <Cookie className="text-orange-500" />,
            content: "Cookies are small text files stored on your device when you visit a website. They help the website remember your actions and preferences over a period of time."
        },
        {
            title: "2. How We Use Cookies",
            icon: <Activity className="text-orange-500" />,
            content: "We use cookies to improve user experience, analyze website traffic, remember preferences, and monitor website performance to ensure everything is running smoothly."
        },
        {
            title: "3. Types of Cookies We Use",
            icon: <Info className="text-orange-500" />,
            subsections: [
                {
                    subtitle: "Essential Cookies",
                    content: "Required for basic site functionality, such as security and network management. The site cannot function properly without these cookies."
                },
                {
                    subtitle: "Analytics Cookies",
                    content: "These help us understand how visitors interact with our website by collecting and reporting information anonymously."
                },
                {
                    subtitle: "Preference Cookies",
                    content: "These allow the website to remember choices you make (such as your user name, language or the region you are in)."
                }
            ]
        },
        {
            title: "4. Managing Cookies",
            icon: <Settings className="text-orange-500" />,
            content: "You can disable cookies through your browser settings. However, please note that some features of the website may not function properly if you choose to do so."
        },
        {
            title: "5. Third-Party Cookies",
            icon: <ExternalLink className="text-orange-500" />,
            content: "We may use third-party tools such as Google Analytics and payment gateways. These services may set their own cookies to track the effectiveness of their services or to provide specialized functionality."
        }
    ];

    return (
        <div className="bg-[#EBEBEB] min-h-screen">
            <SEO
                title="Cookie Policy"
                description="Understand how Hope Ad Solutions uses cookies to improve your browsing experience."
            />
            <Header />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto px-6 py-24 md:py-32"
            >
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#111827]">Cookie Policy</h1>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-gray-600">Effective Date: 19 February 2026</p>
                    <p className="text-gray-900 font-semibold mt-2">Hope Ad Solutions</p>
                </div>

                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-orange-50 rounded-xl">
                                    {section.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                            </div>

                            {section.content && (
                                <p className="text-gray-600 leading-relaxed pl-1">{section.content}</p>
                            )}

                            {section.subsections && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                    {section.subsections.map((sub, sIndex) => (
                                        <div key={sIndex} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                            <h3 className="text-lg font-bold text-gray-800 mb-2">{sub.subtitle}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{sub.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 text-center bg-white p-10 rounded-3xl border border-dashed border-gray-300"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Have questions?</h2>
                    <p className="text-gray-600 mb-8">
                        If you have any questions about our use of cookies or other technologies, please email us at:
                    </p>
                    <a
                        href="mailto:info@hopeadsolutions.com"
                        className="inline-flex items-center gap-2 text-lg font-bold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                        info@hopeadsolutions.com
                    </a>
                </motion.div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default CookiePolicy;
