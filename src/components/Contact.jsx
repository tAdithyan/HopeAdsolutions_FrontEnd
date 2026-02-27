import { useState } from "react";
import { submitContact } from "../data/contacts";
import { motion } from "framer-motion";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContact(formData);
      alert("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error
        ? (Array.isArray(error.response.data.error) ? error.response.data.error.join(", ") : error.response.data.error)
        : "Failed to send message. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#EBEBEB] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-0.5 bg-[#FF8A00]" />
            <span className="text-sm font-semibold text-[#FF8A00] uppercase tracking-wider">
              Contact Us
            </span>
            <div className="w-8 h-0.5 bg-[#FF8A00]" />
          </div>
          <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827]">
            Let’s Build Something <span className="text-[#FF8A00]">Powerful</span>
          </h2>
          <p className="text-slate-600 text-lg font-['Oswald']">
            Tell us about your brand, goals, and vision. We’ll help you turn
            attention into impact.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl h-full"
          >
            <h3 className="text-2xl font-['Oswald'] font-bold text-[#FF8A00] mb-8">
              Send us a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6 font-['Oswald']">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Input
                  label="Phone"
                  name="phone"
                  className="text-[#FF8A00] font-['Oswald']"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>



              {/* SERVICE */}
              <div>
                <label className="text-sm font-semibold font-['Oswald'] text-[#FF8A00] mb-2 block">
                  Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 text-[#FF8A00] font-['Oswald']"
                  style={{
                    color: '#FF8A00',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="" style={{ color: '#FF8A00' }}>Select a service</option>
                  {[
                    "Metro Advertising",
                    "Billboards",
                    "Digital Displays",
                    "Transit Ads",
                    "Airport Ads",
                  ].map((s) => (
                    <option key={s} style={{ color: '#FF8A00' }}>{s}</option>
                  ))}
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-sm font-semibold font-['Oswald'] text-[#FF8A00] mb-2 block">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 resize-none font-['Oswald']"
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full rounded-full border border-orange-400 text-orange-400  hover:bg-[#e67700]  py-4 rounded-xl font-semibold font-['Oswald'] hover:bg-orange-400 hover:text-white transition hidden md:block transition disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>


            </form>

          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 h-full flex flex-col"
          >
            {[
              {
                title: "Visit Us",
                text: "123 Business District, New York",
              },
              {
                title: "Call Us",
                text: "+1 (555) 123-4567",
              },
              {
                title: "Email",
                text: "hello@billford.com",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md"
              >
                <h4 className="font-bold font-['Oswald'] text-slate-900 mb-2">{item.title}</h4>
                <p className="text-slate-600 font-['Oswald']">{item.text}</p>
              </div>
            ))}

            {/* MAP */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md flex-1 min-h-[280px]">
              <iframe
                className="w-full h-full grayscale hover:grayscale-0 transition"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00369368459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SMALL INPUT COMPONENT ---------- */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-semibold font-['Oswald'] text-[#FF8A00] mb-2 block">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 font-['Oswald']"
      />
    </div>
  );
}
