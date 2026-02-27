import React from 'react';
import Header from '../components/header';
import { Footer } from '../components/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Gavel, ClipboardCheck, UserCog, CreditCard, Image as ImageIcon, AlertCircle, Trash2, Globe } from 'lucide-react';

const TermsOfService = () => {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            icon: <Gavel className="text-orange-500" />,
            content: "By accessing or using our website and advertising services, you agree to comply with these Terms."
        },
        {
            title: "2. Services Provided",
            icon: <ClipboardCheck className="text-orange-500" />,
            content: "Hope Ad Solutions provides transit bus digital advertising, restaurant digital advertising, outdoor digital advertising, and campaign management services."
        },
        {
            title: "3. Client Responsibilities",
            icon: <UserCog className="text-orange-500" />,
            content: "Clients agree to provide lawful advertising content, ensure content does not infringe copyrights, avoid offensive, illegal, or misleading material, and provide accurate business information. We reserve the right to reject inappropriate content."
        },
        {
            title: "4. Payment Terms",
            icon: <CreditCard className="text-orange-500" />,
            content: "Fees must be paid as agreed in the contract. Late payments may result in suspension. Advertising slots are subject to availability."
        },
        {
            title: "5. Content Ownership",
            icon: <ImageIcon className="text-orange-500" />,
            content: "Clients retain ownership of their creative materials. By submitting content, you grant us permission to display it during the campaign period."
        },
        {
            title: "6. Limitation of Liability",
            icon: <AlertCircle className="text-orange-500" />,
            content: "Hope Ad Solutions is not liable for indirect losses, loss of business revenue, or technical interruptions beyond reasonable control."
        },
        {
            title: "7. Termination",
            icon: <Trash2 className="text-orange-500" />,
            content: "We reserve the right to suspend or terminate services if Terms are violated, payments are not made, or illegal content is provided."
        },
        {
            title: "8. Governing Law",
            icon: <Globe className="text-orange-500" />,
            content: "These terms are governed by the laws of India. Jurisdiction: Thrissur, Kerala."
        }
    ];

    return (
        <div className="bg-[#EBEBEB] min-h-screen">
            <SEO
                title="Terms of Service"
                description="Read our Terms of Service to understand the rules and guidelines for using Hope Ad Solutions' advertising services."
            />
            <Header />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-6 py-24 md:py-32"
            >
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#111827]">Terms of Service</h1>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
                    <p className="text-gray-600">Effective Date: 19 February 2026</p>
                    <p className="text-gray-900 font-semibold mt-2">Hope Ad Solutions</p>
                </div>

                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-orange-50 rounded-xl">
                                    {section.icon}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                            </div>

                            <p className="text-gray-600 leading-relaxed pl-14">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-16 text-center space-y-4"
                >
                    <p className="text-gray-500 text-sm">
                        If you have any questions regarding these terms, please contact our support team.
                    </p>
                    <a
                        href="mailto:info@hopeadsolutions.com"
                        className="inline-flex items-center gap-2 text-orange-600 font-bold hover:underline"
                    >
                        info@hopeadsolutions.com
                    </a>
                </motion.div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default TermsOfService;
