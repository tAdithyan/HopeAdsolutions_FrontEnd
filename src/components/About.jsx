import { ArrowUpRight } from "lucide-react";
import homeimg from "../assets/Home.jpeg";

const AboutCompany = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 lg:py-32 bg-[#EBEBEB]"
    >
      {/* Soft Accent Glow */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(255,138,0,0.18)_0%,_transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-[#FF8A00]/20 to-[#FFD18A]/20 blur-xl opacity-40 group-hover:opacity-60 transition" />

            <div className="relative rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)]">
              <img
                src="https://i.pinimg.com/736x/e6/c0/15/e6c015646db509c45fb139e507487919.jpg"
                alt="Our creative team"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200">
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4  items-center justify-between">
                  <div>
                    <p className="font-['Oswald'] text-3xl font-bold text-[#111827]">
                      30K+                    </p>
                    <p className="text-sm text-gray-500">
                      Daily Viewers
                    </p>
                  </div>
                   <div>
                    <p className="font-['Oswald'] text-3xl font-bold text-[#111827]">
                      100+
                    </p>
                    <p className="text-sm text-gray-500">
                       Ad Plays Per Day
                    </p>
                  </div>
                   <div>
                    <p className="font-['Oswald'] text-3xl font-bold text-[#111827]">
                      10+
                    </p>
                    <p className="text-sm text-gray-500">
                      Strategic Bus Routes
                    </p>
                  </div>
                   <div>
                    <p className="font-['Oswald'] text-3xl font-bold text-[#111827]">
                     24/7
                    </p>
                    <p className="text-sm text-gray-500">
                     Digital Management
                    </p>
                  </div>
                  

                  {/* <div className="w-12 h-12 bg-[#FF8A00] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,138,0,0.4)]">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-0.5 bg-[#FF8A00]" />
              <span className="text-sm font-semibold text-[#FF8A00] uppercase tracking-wider">
                About Us
              </span>
            </div>

            <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] leading-tight mb-6">
              WE DON'T JUST CREATE{" "}
              <span className="relative text-[#FF8A00]">
                ADS
                <span className="absolute inset-0 blur-xl bg-[#FF8A00]/30 -z-10" />
              </span>
              . WE CREATE{" "}
              <span className="relative text-[#FF8A00]">
                ATTENTION
                <span className="absolute inset-0 blur-xl bg-[#FF8A00]/30 -z-10" />
              </span>
              .
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Hope Ad Solutions, we transform everyday commutes into powerful marketing opportunities through high-definition 24-inch LED screens strategically placed inside buses at eye-level behind the driver’s seat.
            </p>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Serving businesses across Kerala, including Thrissur, we deliver targeted, high-impact digital campaigns designed to capture attention, increase brand recall, and drive real engagement.
            </p>

            {/* Feature List */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "High-Definition 24-Inch LED Displays at Eye-Level",
                "Strategic Bus Route Placement for Maximum Exposure",
                "Customized Campaigns for Local & Enterprise Brands",
                "Professional Execution with Dedicated Technical Support",
              ].map((title, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#FF8A00]/10 flex items-center justify-center group-hover:bg-[#FF8A00] transition">
                    <div className="w-2 h-2 bg-[#FF8A00] rounded-full group-hover:bg-white transition" />
                  </div>

                  <p className="font-medium text-[#111827]">{title}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
