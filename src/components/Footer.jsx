import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 overflow-hidden font-sans relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/5 to-transparent blur-[120px] pointer-events-none opacity-20" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* --- TOP ROW: NAVIGATION & CTA --- */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          {/* Left: Brand Promise */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                System Operational
              </span>
            </div>
            <h3 className="text-3xl font-medium tracking-tight text-gray-200 leading-snug">
              Engineering the digital infrastructure for the next generation of
              brands.
            </h3>
          </div>

          {/* Right: Links Grid */}
          <div className="flex gap-16 md:gap-32">
            {/* SITEMAP */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Sitemap
              </h4>
              {["Home", "Work", "Services", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1 group"
                >
                  {link}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* SOCIALS */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Socials
              </h4>
              {[
                {
                  name: "LinkedIn",
                  icon: <Linkedin size={14} />,
                  url: "https://www.linkedin.com/in/saad-safeer-11b9b227a/",
                },
                {
                  name: "Instagram",
                  icon: <Instagram size={14} />,
                  url: " https://www.instagram.com/syntaqsystem/",
                },
                { name: "Github", icon: <Github size={14} /> },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank" // 3. Optional: Opens link in new tab
                  rel="noopener noreferrer" // Security best practice for target="_blank"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- MIDDLE: MASSIVE BRAND SIGNATURE --- */}
        <div className="border-t border-white/10 pt-12 pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
            className="text-[12vw] md:text-[14vw] font-black leading-[0.8] tracking-tighter text-center md:text-left text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 select-none cursor-default"
          >
            SYNTAQ
          </motion.h1>
        </div>

        {/* --- BOTTOM: LEGAL & INFO --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-8">
            <span className="text-xs text-gray-500 font-mono">
              © {currentYear} SYNTAQ SYSTEMS
            </span>
            <div className="hidden md:flex gap-6">
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <Globe className="w-3 h-3 text-gray-400" />
              <span className="text-xs font-mono text-gray-400">
                Karachi, PK — 12:42 PM
              </span>
            </div>

            <button
              onClick={scrollToTop}
              className="text-xs font-bold uppercase tracking-widest text-white hover:text-gray-300 transition-colors"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
