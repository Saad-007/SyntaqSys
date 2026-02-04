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

  // Mobile Menu Animation Variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* 1. DESKTOP LOGO (Fixed Top-Left) - Hidden on Mobile */}
      <motion.a 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        href="#" 
        className="hidden md:flex fixed top-8 left-10 z-50 items-center gap-1 group mix-blend-difference text-white"
      >
        <span className="text-cyan-400 group-hover:animate-pulse text-2xl font-bold">{`{`}</span>
        <span className="text-white text-lg font-bold tracking-widest">SYNTAQ</span>
        <span className="text-cyan-400 group-hover:animate-pulse text-2xl font-bold">{`}`}</span>
      </motion.a>

      {/* 2. THE NAVBAR ISLAND */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto max-w-5xl"
      >
        <div 
          className={`
            relative flex items-center justify-between md:justify-center px-6 py-3 md:px-8 md:py-3
            bg-black/80 backdrop-blur-xl border border-white/10 
            rounded-full shadow-2xl transition-all duration-300
            ${isScrolled ? "border-cyan-500/30 shadow-[0_0_20px_rgba(0,0,0,0.5)]" : "border-white/10"}
          `}
        >
          
          {/* MOBILE LOGO (Visible only on Mobile inside Island) */}
          <div className="md:hidden flex items-center gap-1">
             <span className="text-cyan-400 font-bold text-xl">{`{`}</span>
             <span className="text-white text-sm font-bold tracking-widest">SYNTAQ</span>
             <span className="text-cyan-400 font-bold text-xl">{`}`}</span>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* BOOK CALL BUTTON (Desktop) */}
          <div className="hidden md:block pl-6 ml-6 border-l border-white/10">
            <button className="px-5 py-2 bg-cyan-400 text-black text-xs font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              Book Call
            </button>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </motion.nav>

      {/* 3. MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] z-40 md:hidden"
          >
            <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6">
               
               {/* Mobile Links */}
               <div className="flex flex-col gap-2">
                 {navLinks.map((link) => (
                   <a
                     key={link.name}
                     href={link.href}
                     onClick={() => setMobileOpen(false)}
                     className="text-lg font-medium text-gray-400 hover:text-white hover:pl-2 transition-all border-b border-white/5 py-3 flex items-center justify-between group"
                   >
                     {link.name}
                     <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                   </a>
                 ))}
               </div>

               {/* Mobile CTA */}
               <button className="w-full py-4 bg-cyan-400 text-black font-bold rounded-xl hover:bg-white transition-colors shadow-lg shadow-cyan-900/20">
                 Book a Free Call
               </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;