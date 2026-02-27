import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/logo.png";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`${isScrolled
          ? "fixed backdrop-blur-xl shadow-lg"
          : "absolute bg-transparent"
          } top-0 left-0 right-0 z-50 transition-all duration-500 px-2 sm:px-4 lg:px-6 py-2`}
      >
        {/* INNER WRAPPER */}
        <div
          className={`max-w-7xl mx-auto rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-6 transition-all duration-500
            ${isScrolled
              ? "h-18 sm:h-20 bg-white/90 sm:bg-white/15 md:bg-transparent border border-white/30 md:border-0 shadow-xl md:shadow-none backdrop-blur-md md:backdrop-blur-none"
              : "h-22 sm:h-24 md:h-28 bg-transparent border-0 shadow-none"
            }`}
        >
          {/* MAIN ROW */}
          <div className="flex items-center justify-between h-full">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <img
                src={logo}
                alt="Logo"
                className={`transition-all duration-500 group-hover:scale-110 ${isScrolled
                  ? "h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18"
                  : "h-14 sm:h-16 md:h-18 lg:h-20 xl:h-24 drop-shadow-lg"
                  } w-auto`}
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-sm font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Why Choose Us", path: "/why-choose-us" },
                { name: "Blogs", path: "/blogs" },
                { name: "Contact Us", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative group text-lg xl:text-xl transition-all duration-300 hover:text-orange-400 ${location.pathname === item.path
                    ? "font-semibold text-orange-400"
                    : "text-[#111827]"
                    }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-out"></span>
                </Link>
              ))}
            </nav>

            {/* RIGHT */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* CTA - Hidden on small screens, visible on medium+ */}
              <Link to="/contact" className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition hidden md:block text-center">
                Get In Touch
              </Link>

              {/* MOBILE TOGGLE */}
              <button
                className={`lg:hidden p-2 hover:scale-110 transition-all duration-300 z-50 text-2xl text-[#111827] hover:text-orange-400`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black transition-all duration-500 z-40 lg:hidden ${isMenuOpen
          ? "bg-opacity-60 backdrop-blur-sm"
          : "bg-opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-2xl z-50 lg:hidden transform transition-all duration-500 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Mobile Menu Header */}
        <div className=" p-4 sm:p-6 flex justify-between items-center">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img
              src={logo}
              alt="Logo"
              className="h-[4rem] sm:h-12 w-auto"
            />
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-xl sm:text-2xl hover:scale-110 transition-transform"
          >
            ✕
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col p-4 sm:p-6 space-y-3 sm:space-y-4">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Services", path: "/services" },
            { name: "Why Choose Us", path: "/why-choose-us" },
            { name: "Blogs", path: "/blogs" },
            { name: "Contact Us", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-lg sm:text-xl py-2 px-3 rounded-lg hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 ${location.pathname === item.path ? "font-semibold text-orange-500 bg-orange-50" : "text-gray-700"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile CTA Button */}
          <div className="pt-4 mt-4 border-t border-gray-200">
            <Link
              to="/contact"
              className="inline-block w-full px-6 py-3 rounded-full border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-all duration-300 font-semibold text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get In Touch
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}