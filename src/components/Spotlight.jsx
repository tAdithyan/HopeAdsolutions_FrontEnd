import { motion } from "framer-motion";

const initiatives = [
  {
    title: "Metro Pillar Branding",
    subtitle: "High Visibility Transit Ads",
    description:
      "Strategic placement across major metro stations for maximum daily exposure to commuters and travelers.",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200",
    size: "large",
    category: "Transit",
    stats: "2M+ Daily Views",
  },
  {
    title: "LED Billboard Campaigns",
    subtitle: "24x7 Brand Exposure",
    description:
      "Dynamic digital displays in prime city locations delivering continuous brand recall.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
    size: "tall",
    category: "Digital",
    stats: "500K+ Impressions",
  },
  {
    title: "Mall Facade Advertising",
    subtitle: "Premium Retail Audience",
    description:
      "Large-scale branding on shopping mall exteriors targeting affluent shoppers.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200",
    size: "tall",
    category: "Retail",
    stats: "1.5M+ Footfall",
  },
  {
    title: "Highway Billboards",
    subtitle: "Interstate Visibility",
    description:
      "Strategic highway placements for long-distance travelers and logistics routes.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200",
    size: "wide",
    category: "Highway",
    stats: "800K+ Vehicles",
  },
  {
    title: "Highway Billboards",
    subtitle: "Interstate Visibility",
    description:
      "Strategic highway placements for long-distance travelers and logistics routes.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200",
    size: "wide",
    category: "Highway",
    stats: "800K+ Vehicles",
  },
  
];

export function SpotlightInitiatives() {
  const getGridClasses = (size) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2 h-[520px]";
      case "wide":
        return "md:col-span-2 h-[300px]";
      case "tall":
        return "md:row-span-2 h-[520px]";
      default:
        return "h-[360px]";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Transit: "bg-blue-500",
      Digital: "bg-purple-500",
      Retail: "bg-green-500",
      Highway: "bg-orange-500",
      Aviation: "bg-indigo-500",
      Sports: "bg-red-500",
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <section className="relative bg-[#EBEBEB]  overflow-hidden py-16">
      {/* Ambient Glows */}
  

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
       
           <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-0.5 bg-[#FF8A00]" />
            <span className="text-sm font-semibold text-[#FF8A00] uppercase tracking-wider">
                          Spotlight Initiatives

            </span>
            <div className="w-8 h-0.5 bg-[#FF8A00]" />
          </div>

          <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] ">
            Advertising That
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
              Dominates Cities
            </span>
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            High-impact outdoor advertising across metro stations, highways,
            malls, airports, and premium urban locations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 auto-rows-min perspective-[1600px]">
          {initiatives.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                rotateX: 6,
                rotateY: -6,
                scale: 1.04,
              }}
              style={{ transformStyle: "preserve-3d" }}
              className={`relative group rounded-3xl overflow-hidden
              bg-white/5 backdrop-blur-xl
              border border-white/10
              shadow-[0_30px_80px_rgba(0,0,0,0.6)]
              transition-all duration-700
              ${getGridClasses(item.size)}`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover brightness-90 group-hover:brightness-110 transition duration-700"
              />

              {/* Overlays */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-red-500/20 blur-2xl transition duration-700" /> */}

              {/* Badges */}
              <div className="absolute top-5 left-5 flex gap-3">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>
              </div>

              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur rounded-lg px-3 py-1">
                <span className="text-xs font-bold text-black">
                  {item.stats}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 p-7 flex flex-col justify-end h-full">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-red-400 mb-3">
                  {item.subtitle}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Case Study #{i + 1}
                  </span>

                  <motion.button
                    whileHover={{ x: 6 }}
                    className="text-xs text-red-400 font-semibold flex items-center gap-1"
                  >
                    Explore
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

 

       
      </div>
      <div className=" h-10 m-10 items-center justify-center flex">
 <button className="px-6 py-3 rounded-full border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition">
                  Explore Gallery
                </button>
      </div>
             
    </section>
  );
}
