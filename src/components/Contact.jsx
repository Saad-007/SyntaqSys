import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Send, Check, Copy, Linkedin, Instagram } from "lucide-react";

// --- COMPONENT: 3D TILT CONTACT CARD (With Premium Shine) ---
const ContactCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [copied, setCopied] = useState(false);

  // Soft/Heavy Physics for Premium Feel
  const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  // Dynamic Shine
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("syntaqsystem@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      // RESPONSIVE: aspect-auto on mobile, square on desktop
      className="relative w-full md:max-w-md aspect-[4/5] md:aspect-square perspective-1000 group cursor-pointer h-[400px] md:h-auto"
      onClick={handleCopy}
    >
      <div className="relative w-full h-full rounded-2xl bg-[#050505] text-white p-8 md:p-12 shadow-2xl overflow-hidden border border-white/10 flex flex-col justify-between">
        
        {/* Abstract Background Mesh */}
        <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-gradient-to-br from-purple-900/20 to-blue-900/10 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        {/* Shine Layer */}
        <motion.div 
            style={{ 
                background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.08), transparent 50%)` 
            }}
            className="absolute inset-0 pointer-events-none z-0"
        />

        {/* Top Content */}
        <div className="relative z-10 translate-z-10">
           <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center mb-6 border border-white/10 group-hover:scale-105 transition-transform duration-500">
              <Mail className="w-5 h-5 text-white" />
           </div>
           <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-2">General Inquiries</p>
           {/* UPDATED EMAIL SIZE */}
           <h3 className="text-lg md:text-xl font-bold tracking-tight break-all">syntaqsystem@gmail.com</h3>
           
           {/* Copied Badge */}
           <AnimatePresence>
             {copied && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 10 }}
                 className="absolute top-0 right-0 px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-500/30 flex items-center gap-2 backdrop-blur-md"
               >
                 <Check className="w-3 h-3" /> Copied
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10 translate-z-10">
           <div className="flex items-center gap-3 mb-6 opacity-60">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-mono tracking-wider">KARACHI, PK — GLOBAL</span>
           </div>
           <div className="h-px w-full bg-white/10 mb-6" />
           <div className="flex justify-between items-end">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 group-hover:text-gray-300 transition-colors">Click card to copy</p>
              <Copy className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
           </div>
        </div>

      </div>
    </motion.div>
  );
};

// --- COMPONENT: FORM INPUT WITH ANIMATED LINE ---
const InputField = ({ label, type = "text", placeholder }) => {
    const [focused, setFocused] = useState(false);
    return (
        <div className="relative group w-full">
            <label className={`block text-xs font-bold uppercase tracking-widest mb-2 md:mb-3 transition-colors duration-300 ${focused ? "text-black" : "text-gray-400"}`}>
            {label}
            </label>
            <div className="relative">
                <input 
                    type={type} 
                    placeholder={placeholder}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full bg-transparent border-b border-gray-200 py-3 md:py-4 text-lg md:text-xl font-medium text-black placeholder-gray-300 focus:outline-none transition-colors"
                />
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: focused ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute bottom-0 left-0 h-[2px] bg-black"
                />
            </div>
        </div>
    );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-[#F5F5F7] relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-70 pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-3 mb-4 md:mb-6"
           >
              <div className="w-8 md:w-12 h-[2px] bg-black/20" />
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black/40">Start a Project</span>
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
             viewport={{ once: true }}
             className="text-5xl md:text-8xl font-black text-black uppercase tracking-tighter leading-[0.9]"
           >
             Let's Build <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
               The Future.
             </span>
           </motion.h2>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-start">
          
          {/* LEFT: 3D CARD & SOCIALS */}
          <div className="w-full lg:w-1/3 space-y-12 md:space-y-16">
             <ContactCard />
             
             {/* Social Links */}
             <div className="space-y-6 md:space-y-8">
                <p className="text-xs font-bold uppercase tracking-widest text-black/40">Connect</p>
                <div className="flex flex-col gap-2">
                  {[
                    {
                      name: "LinkedIn",
                      icon: <Linkedin size={14} />,
                      url: "https://www.linkedin.com/in/saad-safeer-11b9b227a/",
                    },
                    {
                      name: "Instagram",
                      icon: <Instagram size={14} />,
                      url: "https://www.instagram.com/syntaqsystem/",
                    },
                  ].map((social, i) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center justify-between group py-3 md:py-4 border-b border-gray-200 hover:border-black transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-medium text-gray-400 group-hover:text-black transition-colors">
                          {social.name}
                        </span>
                      </div>
                      
                      <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-black group-hover:rotate-45 transition-all duration-300" />
                    </motion.a>
                  ))}
                </div>
             </div>
          </div>

          {/* RIGHT: INTERACTIVE FORM */}
          <div className="w-full lg:w-2/3">
             <form 
             action="https://formspree.io/f/xwvnelvb"
             method='POST'
             className="space-y-12 md:space-y-16">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                   <InputField label="01. What's your name?" 
                   name="name"
                   placeholder="John Doe" />
                   <InputField label="02. What's your email?" 
                   name="email"
                   type="email" placeholder="john@example.com" />
                </div>


                <InputField label="03. What services do you need?" 
                 name="service"
                placeholder="Web Dev, AI, Video Editing..." />
                
                {/* 04. Message Area */}
                <div className="relative group pt-4">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 md:mb-4 group-focus-within:text-black transition-colors">
                    04. Tell us about your project
                  </label>
                  <div className="relative">
                    <textarea 
                    name="message"
                        rows="6"
                        placeholder="Describe your goals, timeline, and vision..."
                        className="w-full bg-transparent border-b border-gray-200 py-3 md:py-4 text-lg md:text-xl font-medium text-black placeholder-gray-300 focus:outline-none resize-none transition-colors"
                    ></textarea>
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-500 ease-out group-focus-within:w-full" />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 md:pt-8">
                   <button className="group relative w-full md:w-auto px-12 py-5 md:py-6 bg-black text-white rounded-full overflow-hidden flex items-center justify-center gap-5 transition-transform active:scale-95">
                      <div className="absolute inset-0 w-full h-full bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                      <span className="relative font-bold tracking-[0.2em] uppercase text-xs">Send Message</span>
                      <Send className="relative w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                   </button>
                </div>

             </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;