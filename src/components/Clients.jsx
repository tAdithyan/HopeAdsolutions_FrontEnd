import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getClients } from "../data/clients";

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await getClients();
                setClients(data.data || []);
            } catch (error) {
                console.error("Error fetching clients:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    if (loading && clients.length === 0) {
        return null; // Or a skeleton/loading state
    }

    if (clients.length === 0) {
        return null; // Don't show the section if no clients
    }

    return (
        <section className="py-20 bg-[#EBEBEB] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-0.5 bg-[#FF8A00]" />
                    <span className="text-sm font-semibold text-[#FF8A00] uppercase tracking-wider">
                        Trusted Partners
                    </span>
                    <div className="w-8 h-0.5 bg-[#FF8A00]" />
                </div>
                <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold text-[#111827]">
                    OUR <span className="text-[#FF8A00]">CLIENTS</span>
                </h2>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {clients.length > 5 ? (
                    <motion.div
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            duration: 20 + clients.length * 2,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="flex whitespace-nowrap gap-12 sm:gap-24 py-10 items-center justify-start min-w-full"
                    >
                        {/* Main loop content duplicated once for seamless scroll */}
                        {[...clients, ...clients].map((client, index) => (
                            <div
                                key={`${client._id}-${index}`}
                                className="flex-shrink-0 transition-all duration-500 opacity-60 hover:opacity-100 hover:scale-110 px-4"
                            >
                                <img
                                    src={`${client.logo}`}
                                    alt={client.name}
                                    className="h-16 sm:h-20 md:h-24 w-auto object-contain max-w-[180px]"
                                />
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    /* Static centered layout for few clients */
                    <div className="flex flex-wrap justify-center gap-12 sm:gap-20 py-10 items-center w-full max-w-7xl mx-auto px-6">
                        {clients.map((client) => (
                            <div
                                key={client._id}
                                className="transition-all duration-500 opacity-60 hover:opacity-100 hover:scale-110 px-4"
                            >
                                <img
                                    src={`${client.logo}`}
                                    alt={client.name}
                                    className="h-16 sm:h-20 md:h-24 w-auto object-contain max-w-[180px]"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
