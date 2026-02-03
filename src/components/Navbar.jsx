import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* 1. THE LOGO (Separate & Fixed to Top-Left) */}
      <motion.a 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        href="#" 
        className="fixed top-6 left-6 md:left-10 z-50 text-xl font-bold tracking-tighter flex items-center gap-1 group mix-blend-difference text-white"
      >
        <span className="text-brand-cyan group-hover:animate-pulse text-2xl">{`{`}</span>
        <span className="text-white text-lg tracking-widest">SYNTAQ</span>
        <span className="text-brand-cyan group-hover:animate-pulse text-2xl">{`}`}</span>
      </motion.a>

      {/* 2. THE CENTERED ISLAND (Links + Book Call) */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto"
      >
        <div 
          className={`
            flex items-center justify-between md:justify-center gap-8 px-8 py-3 
            bg-brand-black/80 backdrop-blur-xl border border-white/10 
            rounded-full shadow-2xl transition-all duration-300
            ${isScrolled ? "border-brand-cyan/20 shadow-brand-cyan/10" : "border-white/10"}
          `}
        >
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white hover:text-brand-cyan transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Book Call Button (Inside the Island) */}
          <div className="hidden md:block pl-4 border-l border-white/10">
            <button className="px-5 py-2 bg-brand-cyan text-black text-xs font-bold rounded-full hover:bg-cyan-300 hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              Book Call
            </button>
          </div>

          {/* Mobile Spacer (To push toggle to right on mobile) */}
          <div className="md:hidden flex-grow"></div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden text-white p-1"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] z-40 bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-brand-cyan"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full py-3 bg-brand-cyan text-black font-bold rounded-xl">
              Book Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;