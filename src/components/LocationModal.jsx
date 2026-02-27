import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Check } from 'lucide-react';

const LocationModal = ({ onAccept, onCancel, isOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full overflow-hidden"
                    >
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-orange-50 text-[#FF8A00] rounded-full flex items-center justify-center mx-auto mb-6">
                                <MapPin size={32} />
                            </div>

                            <h2 className="font-['Oswald'] text-2xl font-bold text-[#111827] mb-3 uppercase tracking-tight">
                                Location Access
                            </h2>

                            <p className="text-gray-500 leading-relaxed mb-8 flex flex-col gap-1">
                                <span>We'd like to use your location</span>
                                <span className="text-sm">to provide a more personalized experience and better local advertising data.</span>
                            </p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={onAccept}
                                    className="w-full bg-[#111827] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98]"
                                >
                                    <Check size={20} />
                                    Accept Access
                                </button>

                                <button
                                    onClick={onCancel}
                                    className="w-full py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <X size={18} />
                                    Maybe Later
                                </button>
                            </div>
                        </div>

                        <div className="h-1.5 w-full bg-gray-100 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-[#FF8A00]"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LocationModal;
