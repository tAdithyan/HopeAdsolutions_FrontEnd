import {
  TruckIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  TvIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

export default function WhyChooseSection() {
  const features = [
    {
      icon: TruckIcon,
      title: "Premium Transit Advertising Experience",
      description: "Reach thousands of commuters daily through our high-definition 24-inch and 32-inch LED network.",
    },
    {
      icon: EyeIcon,
      title: "Captive Audience Engagement",
      description: "Unlike traditional billboards, our eye-level screens ensure your message is seen and remembered throughout the entire journey.",
    },
    {
      icon: AdjustmentsHorizontalIcon,
      title: "Customizable Advertising Solutions",
      description: "From localized bus routes to grand outdoor events, we tailor our screen time to meet your specific business goals.",
    },
    {
      icon: MapPinIcon,
      title: "Strategic Local Placement",
      description: "We dominate the most high-traffic routes and popular hubs across the Thrissur district.",
    },
    {
      icon: TvIcon,
      title: "Vibrant High-Definition Displays",
      description: "Using state-of-the-art Android LED technology to ensure your brand colors and visuals are always crisp and clear.",
    },
    {
      icon: ArrowPathIcon,
      title: "Consistent Visibility",
      description: "Reliable uptime and high-frequency ad rotation across every route and every screen in our network.",
    },
  ];

  return (
    <section className="bg-[#EBEBEB] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 justify-center">
            <div className="w-8 h-0.5 bg-[#FF8A00]" />
            <span className="text-sm font-semibold text-[#FF8A00] uppercase tracking-wider">
              Our Vision
            </span>
            <div className="w-8 h-0.5 bg-[#FF8A00]" />
          </div>
          <h2 className="font-['Oswald'] text-4xl md:text-6xl font-bold text-[#111827] mb-4">
            WHY <span className="text-[#FF8A00]">CHOOSE</span> US
          </h2>
          <p className="text-xl text-[#FF8A00] font-['Oswald'] font-bold mb-6 uppercase tracking-widest">
            Your Vision. Our Screen. Unforgettable Impact.
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
            Where powerful brand stories unfold through innovation, reach, and impeccable visibility —
            crafted with passion, precision, and a touch of digital magic.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 hover:bg-gray-50 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-[#FF8A00]/10 rounded-2xl mb-6 group-hover:bg-[#FF8A00] transition-colors duration-300">
                  <Icon className="w-8 h-8 text-[#FF8A00] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-['Oswald'] text-xl font-bold text-[#111827] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}