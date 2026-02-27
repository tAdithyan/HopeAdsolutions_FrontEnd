import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getOffers } from "../data/offers";

// const slides = [
//   {
//     title: "BRINGING YOUR ADS",
//     highlight: "TO LIFE",
//     subtitle: "Reach • Engage • Convert",
//     desc: "Experience the impact of our creative vision and discover how DOOH can elevate your brand presence.",
//     image:
//       "https://i.pinimg.com/1200x/90/0f/8e/900f8e5bf9f083cecd1a17c84221cc77.jpg",
//   },
//   {
//     title: "LESS SPEND",
//     highlight: "MORE GROWTH",
//     subtitle: "Smart • Scalable • Powerful",
//     desc: "We help brands stand out indoors with stunning visuals and strategic placements.",
//     image:
//       "https://i.pinimg.com/736x/04/6d/0e/046d0ed28b088a14ff2786e11cfa50f7.jpg",
//   },
// ];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const data = await getOffers();
      console.log("dasdasd", data);
      setSlides(data.data);
    };
    fetchOffers();
  }, []);
  console.log(slides);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      4500
    );
    return () => clearInterval(timer);
  }, [slides.length]);




  return (
    <section className="relative w-full h-screen overflow-hidden text-white shadow-2xl">
      {/* BASE BACKGROUND (white on mobile, white on desktop) */}
      <div className="absolute inset-0 bg-[#EBEBEB]" />

      {/* BACKDROP SHADOW OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />

      {/* MOBILE BACKGROUND IMAGE - REMOVED */}

      {/* GRID OVERLAY (large screens only) */}
      <div
        className="absolute inset-0 opacity-[0.15] hidden lg:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-40 lg:pt-48 xl:pt-[12rem] 2xl:px-16 py-8 md:py-24 xl:py-32 h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center w-full max-w-7xl mx-auto">

          {/* LEFT TEXT */}
          {slides.length > 0 && slides[index] && (
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative p-6 md:p-0 drop-shadow-lg"
              >
                <h1
                  className="
                font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] 
                "
                >
                  {slides[index].headline} <br />
                  <span className="font-serif italic text-[#FF8A00]">
                    {slides[index].subline}
                  </span>
                </h1>

                <h2
                  className="
                  mt-4
                  text-sm
                  xs:text-base
                  sm:text-lg
                  md:text-xl
                  xl:text-2xl
                  2xl:text-3xl
                  text-[#6B7280] lg:text-[#6B7280]
                  font-semibold md:font-medium
                  leading-relaxed
                "
                >
                  {/* Data structure mapping might differ - using sensible fallback or property from offers */}
                  {/* Assuming offers structure: headline, subline, description */}
                </h2>

                <p
                  className="
                 text-lg text-gray-600 mb-8 leading-relaxed
                "
                >
                  {slides[index].description}
                </p>

                {/* BUTTON */}
                <div className="mt-6 md:mt-10">

                  <a href="/contact" className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition ">
                    Contact Us →
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* RIGHT IMAGE (desktop only) */}
          {slides.length > 0 && slides[index] && (
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].image}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="relative "
              >
                <img
                  src={`${slides[index].image}`}
                  alt=""
                  className="
                    w-full max-w-4xl
                    aspect-[2.2/1]
                    drop-shadow-[0_60px_120px_rgba(255,138,0,0.85)]
                    object-cover
                    rounded-2xl
                    max-h-[30vh] md:max-h-none
                  "
                />

              </motion.div>
            </AnimatePresence>
          )}


        </div>
      </div>

      {/* SCROLL DOWN BUTTON */}
      <div className="absolute  bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
          className="
            flex flex-col items-center justify-center
            w-12 h-12 rounded-full
            bg-black/10 backdrop-blur-sm
            border border-white/20
            hover:bg-white/20 hover:border-white/30
            transition-all duration-300
            group
          "
          aria-label="Scroll to next section"
        >
          <svg
            className="w-5 h-5 text-white group-hover:text-white/90 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}