import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "BoldAds transformed our brand visibility. Their billboard campaign generated more leads in 3 months than we had in the entire previous year.",
    author: "Sarah Chen",
    role: "CMO, TechVenture Inc.",
    image: "https://i.pinimg.com/736x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg",
  },
  {
    quote:
      "The creativity and strategic thinking they bring to every campaign is unmatched. They don't just advertise—they create cultural moments.",
    author: "Marcus Johnson",
    role: "Brand Director, Luxe Fashion",
    image: "https://i.pinimg.com/736x/02/00/90/020090c506a4e9f4c6fa0052d6dfd0c1.jpg",
  },
  {
    quote:
      "Our ROI has increased by 340% since partnering with BoldAds. Their data-driven approach combined with bold creativity is a game-changer.",
    author: "Emily Rodriguez",
    role: "CEO, Metro Retail",
    image: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-carousel functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  const prev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#EBEBEB]">
      {/* Soft background glow */}
      <div className="absolute inset-0 " />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-0.5 bg-[#FF8A00]" />
            <span className="text-sm font-semibold text-[#FF8A00] uppercase tracking-wider">
              Testimonials
            </span>
            <div className="w-8 h-0.5 bg-[#FF8A00]" />
          </div>

          <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] ">
            WHAT CLIENTS <span className="text-[#FF8A00]">SAY</span>
          </h2>
        </div>

        {/* Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#F9FAFB] rounded-3xl p-8 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-[#FF8A00] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,138,0,0.45)]">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Quote */}
            <blockquote className="text-lg text-gray-600 mb-8 leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                {/* Person Photo */}
                <div className="relative">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF8A00]/20 to-transparent"></div>
                </div>
                
                {/* Person Info */}
                <div>
                  <p className="text-xl font-bold text-[#111827]">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-[#6B7280]">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-[#E5E7EB] flex items-center justify-center hover:border-[#FF8A00] hover:bg-[#FF8A00]/10 transition"
                >
                  <ChevronLeft className="w-5 h-5 text-[#111827]" />
                </button>

                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full bg-[#FF8A00] flex items-center justify-center hover:opacity-90 transition shadow-[0_0_30px_rgba(255,138,0,0.45)]"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-[#FF8A00]"
                      : "w-2 bg-[#E5E7EB] hover:bg-[#6B7280]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;