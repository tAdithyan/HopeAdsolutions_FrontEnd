import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelmetProvider } from 'react-helmet-async';

// Layout & Components
import Header from './components/header';
import Hero from './components/hero';
import WhyChooseUs from './components/WhyChooseUse';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import AboutCompany from "./components/About";
import TestimonialCarousel from "./components/Testimonial";
import Clients from "./components/Clients";
import LocationModal from "./components/LocationModal";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import SEO from "./components/SEO";
import PageLoader from "./components/PageLoader";

// Pages
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import BlogsPage from "./pages/Blogs";
import SingleBlogPage from "./pages/SingleBlog";
import ContactPage from "./pages/Contact";
import WhyChooseUsPage from "./pages/WhyChooseUs";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import TermsOfServicePage from "./pages/TermsOfService";
import CookiePolicyPage from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminOffers from "./pages/admin/AdminOffers";
import AdminContacts from "./pages/admin/AdminContacts";

// Context & Data
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { trackVisitorLocation } from "./data/analytics";

// Home Component
const Home = () => {
  const [showLoader, setShowLoader] = useState(() => {
    // Only show loader once per browser session
    return !sessionStorage.getItem("loaderShown");
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem("loaderShown", "true");
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && <PageLoader onComplete={handleLoaderComplete} />}
      <main className={`relative w-full min-h-screen bg-[#EBEBEB] transition-opacity duration-500 ${showLoader ? 'opacity-0' : 'opacity-100'}`}>
        <SEO
          title="Home"
          description="Welcome to Billford Advertising. We provide premium billboards, digital marketing, and creative advertising solutions."
          keywords="advertising agency, billboard advertising, digital marketing, outdoor advertising, creative ads, branding"
          ogType="website"
        />
        <Header />
        <Section id="hero">
          <Hero />
        </Section>
        <section id="about" className="relative z-20">
          <AboutCompany />
        </section>
        <section id="clients" className="relative z-30">
          <Clients />
        </section>
        <section id="testimonials" className="relative z-40">
          <TestimonialCarousel />
        </section>
        <section id="contact" className="relative z-40">
          <Contact />
        </section>
        <Footer />
      </main>
    </>
  );
};

// Component to handle conditional rendering of global elements
const GlobalElements = ({ showLocationModal, onAcceptLocation, onCancelLocation }) => {
  const location = useLocation();

  // Define routes where WhatsApp button SHOULD NOT appear
  const hideOnRoutes = ["/admin", "/admin/login", "/admin/blogs", "/admin/offers", "/admin/contacts"];

  // Also check if it's a 404 (any route not explicitly matched in hideOnRoutes and not a main route)
  const isMainRoute = ["/", "/about", "/services", "/blogs", "/blog", "/contact", "/why-choose-us", "/privacy-policy", "/terms-of-service", "/cookie-policy"].some(path =>
    location.pathname === path || location.pathname.startsWith("/blog/")
  );

  const shouldShowWhatsApp = isMainRoute && !hideOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowWhatsApp && <WhatsAppButton />}
      <LocationModal
        isOpen={showLocationModal}
        onAccept={onAcceptLocation}
        onCancel={onCancelLocation}
      />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(() => {
    return localStorage.getItem("locationPermission") === null;
  });

  const getAddressFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
          headers: { "User-Agent": "billford-advertising" },
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
    }
  };

  const handleFetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationData = await getAddressFromCoords(latitude, longitude);
          if (locationData) {
            try {
              await trackVisitorLocation({
                city: locationData.address.state_district || locationData.address.city || locationData.address.town
              });
            } catch (err) {
              console.error("Failed to track location in backend:", err);
            }
          }
          localStorage.setItem("locationPermission", "granted");
        },
        (error) => {
          console.error("Location access denied or error:", error);
          localStorage.setItem("locationPermission", "denied");
        }
      );
    }
  };

  useEffect(() => {
    if (localStorage.getItem("locationPermission") === "granted") {
      handleFetchLocation();
    }
  }, []);

  return (
    <HelmetProvider>


      <AuthProvider>
        <DataProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blog/:id" element={<SingleBlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="blogs" element={<AdminBlogs />} />
                  <Route path="offers" element={<AdminOffers />} />
                  <Route path="contacts" element={<AdminContacts />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <GlobalElements
              showLocationModal={showLocationModal}
              onAcceptLocation={() => {
                setShowLocationModal(false);
                handleFetchLocation();
              }}
              onCancelLocation={() => {
                setShowLocationModal(false);
                localStorage.setItem("locationPermission", "denied");
              }}
            />
          </Router>
        </DataProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

function Section({ children, id }) {
  return (
    <motion.section
      id={id}
      className="min-h-screen w-full md:h-screen sticky top-0 overflow-hidden bg-[#EBEBEB]"
    >
      <div className="h-full w-full relative flex items-center">
        {children}
      </div>
    </motion.section>
  );
}

export default App;