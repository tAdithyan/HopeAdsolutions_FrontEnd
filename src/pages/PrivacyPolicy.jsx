import React from 'react';
import Header from '../components/header';
import { Footer } from '../components/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, UserCheck, RefreshCw } from 'lucide-react';

const PrivacyPolicy = () => {
    const sections = [
        {
            title: "1. Introduction",
            icon: <FileText className="text-orange-500" />,
            content: "Hope Ad Solutions (\"Company\", \"we\", \"our\", \"us\") respects your privacy and is committed to protecting the personal information you share with us when you visit our website, engage our services, or communicate with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information."
        },
        {
            title: "2. Information We Collect",
            icon: <Eye className="text-orange-500" />,
            subsections: [
                {
                    subtitle: "a) Personal Information",
                    content: "We may collect: Name, Email address, Phone number, Business details, Billing information, and Advertising campaign details."
                },
                {
                    subtitle: "b) Technical Information",
                    content: "When you visit our website, we may collect: IP address, Browser type, Device information, Pages visited, Cookies and usage data."
                }
            ]
        },
        {
            title: "3. How We Use Your Information",
            icon: <RefreshCw className="text-orange-500" />,
            content: "We use collected information to provide advertising services, respond to inquiries, process payments, improve our services, send service updates, and maintain security. We do not sell your personal data to third parties."
        },
        {
            title: "4. Data Sharing",
            icon: <UserCheck className="text-orange-500" />,
            content: "We may share data with payment processors, technical service providers, and legal authorities if required by law. All third parties are required to maintain confidentiality."
        },
        {
            title: "5. Data Security",
            icon: <Lock className="text-orange-500" />,
            content: "We implement industry-standard security measures including encrypted communications, restricted data access, and secure servers. However, no digital system is 100% secure."
        },
        {
            title: "6. Your Rights",
            icon: <Shield className="text-orange-500" />,
            content: "You have the right to access your personal data, request correction, request deletion, and withdraw consent. To exercise these rights, contact: info@hopeadsolutions.com."
        }
    ];

    return (
        <div className="bg-[#EBEBEB] min-h-screen">
            <SEO
                title="Privacy Policy"
                description="Review our privacy policy to understand how Hope Ad Solutions handles your data."
            />
            <Header />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-6 py-24 md:py-32"
            >
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#111827]">Privacy Policy</h1>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-gray-600">Effective Date: 19 February 2026</p>
                    <p className="text-gray-900 font-semibold mt-2">Hope Ad Solutions | Thrissur, Kerala, India</p>
                </div>

                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-orange-50 rounded-xl">
                                    {section.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                            </div>

                            {section.content && (
                                <p className="text-gray-600 leading-relaxed">{section.content}</p>
                            )}

                            {section.subsections && (
                                <div className="space-y-6 mt-4">
                                    {section.subsections.map((sub, sIndex) => (
                                        <div key={sIndex}>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{sub.subtitle}</h3>
                                            <p className="text-gray-600 leading-relaxed">{sub.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="bg-orange-600 p-8 rounded-2xl text-white text-center"
                    >
                        <h2 className="text-2xl font-bold mb-4">Questions or Concerns?</h2>
                        <p className="mb-6 opacity-90">Our team is here to help you understand your data rights.</p>
                        <a
                            href="mailto:info@hopeadsolutions.com"
                            className="inline-block px-8 py-3 bg-white text-orange-600 font-bold rounded-full transition-transform hover:scale-105"
                        >
                            Contact Privacy Officer
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
