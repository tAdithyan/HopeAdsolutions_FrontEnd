import { motion } from "framer-motion";
import clint1 from '../assets/clint1.jpeg'
import clint2 from '../assets/clint2.jpeg'
import clint3 from '../assets/clint3.jpeg'
import clint4 from '../assets/clint4.jpeg'
import clint5 from '../assets/clint5.jpeg'



const clients = [
    { name: "Tata Motors", logo: clint1 },
    { name: "Reliance", logo: clint2 },
    { name: "Kerala Blasters", logo: clint3 },
    { name: "Malabar Gold", logo: clint4 },
    { name: "Joyalukkas", logo: clint5 },
    { name: "Federal Bank", logo: clint1 },
];

export default function Clients() {
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

            <div className="relative flex overflow-x-hidden  ">
                <motion.div
                    animate={{
                        x: ["0%", "-100%"],
                    }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex whitespace-nowrap gap-12 sm:gap-20 py-10 items-center"
                >
                    {/* Standard infinite loop of single logos */}
                    {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 transition-all duration-500 opacity-70 hover:opacity-100 hover:scale-110 px-4"
                        >
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="h-16 sm:h-24 md:h-28 w-auto object-contain"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
