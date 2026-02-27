import { motion } from "framer-motion";
import {
  Megaphone,
  Palette,
  BarChart3,
  Video,
  Globe,
  Sparkles,
} from "lucide-react";

const services = [
  {
    title: "Brand Strategy",
    desc: "Building clear brand positioning and identity systems that connect emotionally and last.",
    icon: Sparkles,
  },
  {
    title: "Creative Design",
    desc: "Thoughtful visuals, campaigns, and brand assets crafted for attention and recall.",
    icon: Palette,
  },
  {
    title: "Digital Advertising",
    desc: "Smart ad placements across digital platforms driven by insights and performance.",
    icon: Megaphone,
  },
  {
    title: "Performance Marketing",
    desc: "ROI-focused marketing strategies designed to scale leads and conversions.",
    icon: BarChart3,
  },
  {
    title: "Video Production",
    desc: "High-quality brand films and ad creatives that tell stories and drive action.",
    icon: Video,
  },
  {
    title: "Outdoor & Billboard Ads",
    desc: "Strategic outdoor visibility with premium placements and high-impact execution.",
    icon: Globe,
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#F9FAFB] py-20 sm:py-28 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-xs tracking-widest text-[#6B7280] mb-3">
            OUR CAPABILITIES
          </p>

          <h2 className="
            text-3xl sm:text-4xl lg:text-5xl
            font-light leading-tight
            text-[#111827]
          ">
            Services Designed for
            <span className="block italic font-semibold text-[#FF8A00] mt-1">
              Modern Brands
            </span>
          </h2>

          <p className="mt-5 text-[#6B7280] max-w-2xl mx-auto text-sm sm:text-base">
            We combine creativity, strategy, and execution to help brands grow
            with clarity and consistency.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="
                  group relative
                  bg-white
                  border border-gray-200/60
                  rounded-2xl
                  p-8
                  transition-all
                  hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]
                "
              >
                {/* ICON */}
                <div className="
                  w-14 h-14 rounded-xl
                  bg-[#FF8A00]/10
                  flex items-center justify-center
                  mb-6
                  transition
                  group-hover:bg-[#FF8A00]
                ">
                  <Icon
                    size={26}
                    className="
                      text-[#FF8A00]
                      transition
                      group-hover:text-white
                    "
                  />
                </div>

                {/* TEXT */}
                <h3 className="text-lg sm:text-xl font-semibold text-[#111827] mb-3">
                  {service.title}
                </h3>

                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {service.desc}
                </p>

                {/* ACCENT LINE */}
                <span className="
                  absolute bottom-0 left-0
                  h-1 w-0
                  bg-[#FF8A00]
                  rounded-b-2xl
                  transition-all duration-500
                  group-hover:w-full
                " />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
