import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "BoldAds transformed our brand visibility. Their billboard campaign generated more leads in 3 months than we had in the entire previous year.",
  
   
  },
  {
    quote:
      "The creativity and strategic thinking they bring to every campaign is unmatched. They don't just advertise—they create cultural moments.",
  
   
  },
  {
    quote:
      "Our ROI has increased by 340% since partnering with BoldAds. Their data-driven approach combined with bold creativity is a game-changer.",
   
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