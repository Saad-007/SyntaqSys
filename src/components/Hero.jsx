import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, Cpu } from "lucide-react";
import myEditingVideo from '../assets/video/Newcar.mp4'; // Change to your actual file name
// --- ANIMATION VARIANTS ---
// Orchestrates the entrance timing (Text first, then cards)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    }
  }
};

// Advanced Card Reveal: slides up, rotates into place, and unblurs
const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    y: 100,
    x: direction === 'left' ? -100 : 100,
    rotate: direction === 'left' ? -25 : 25,
    filter: "blur(15px)",
    scale: 0.8
  }),
  visible: (direction) => ({
    opacity: 1,
    y: 0,
    x: 0,
    rotate: direction === 'left' ? -6 : 6,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
      mass: 0.8
    }
  })
};

// Continuous floating animation for the cards
const floatAnimation = {
  y: [-8, 8, -8],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Premium Text Reveal: Scales down while blurring in
const textVariants = {
  hidden: { opacity: 0, scale: 1.2, filter: "blur(20px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

// --- CONTENT COMPONENT ---
const HeroContent = ({ isZoomed = false }) => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className={`flex items-center justify-center gap-12 md:gap-32 origin-center transition-transform duration-700 ease-out ${isZoomed ? 'scale-125' : 'scale-100'}`}
  >
    
    {/* LEFT CARD: AUTOMATION */}
    <motion.div 
      custom="left"
      variants={cardVariants}
      animate={!isZoomed ? floatAnimation : {}} // Only float when not zoomed for stability
      whileHover={{ scale: 1.05, rotate: -2, transition: { duration: 0.4 } }}
      className={`
        relative w-64 md:w-80 h-[400px] md:h-[500px] rounded-2xl overflow-hidden 
        bg-black shadow-2xl group
        ${isZoomed ? 'border-[4px] border-green-400' : 'border-[4px] border-white/80'}
      `}
    >
      <motion.img 
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" 
        className="w-full h-full object-cover opacity-80"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.8 }}
        alt="Automation"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
      <div className="absolute bottom-10 left-0 w-full text-center px-4">
        <motion.div 
          whileHover={{ y: -5 }}
          className="mb-4 inline-flex p-4 rounded-none bg-green-500/20 backdrop-blur-md border border-green-400/30"
        >
           <Cpu size={28} className="text-green-400" />
        </motion.div>
        <h3 className="text-white font-black text-2xl md:text-3xl uppercase tracking-widest leading-none">
          Automation
        </h3>
        <p className="text-green-400 text-xs md:text-sm font-mono mt-2 tracking-widest opacity-80">AI WORKFLOWS</p>
      </div>
    </motion.div>

    {/* CENTER TEXT: SYNTAQ */}
    <motion.div 
      variants={textVariants}
      className="flex items-center justify-center w-[300px] md:w-[600px] z-10"
    >
      <span 
        className={`
          text-5xl md:text-8xl font-black text-black tracking-[0.25em] pl-[0.25em] uppercase
          drop-shadow-sm transition-all duration-500
          ${isZoomed ? 'drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-black to-gray-600' : ''}
        `}
      >
        SYNTAQ
      </span>
    </motion.div>

   {/* RIGHT CARD: VIDEO EDITING */}
    <motion.div 
      custom="right"
      variants={cardVariants}
      animate={!isZoomed ? { ...floatAnimation, transition: { ...floatAnimation.transition, delay: 1 } } : {}} 
      whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.4 } }}
      className={`
        relative w-64 md:w-80 h-[400px] md:h-[500px] rounded-2xl overflow-hidden 
        bg-black shadow-2xl group
        ${isZoomed ? 'border-[4px] border-purple-500' : 'border-[4px] border-white/80'}
      `}
    >
      {/* --- VIDEO ELEMENT REPLACING IMAGE --- */}
      <motion.video 
        src={myEditingVideo}       // Your imported local video
        autoPlay                   // Plays automatically
        loop                       // Loops forever
        muted                      // Required for autoplay to work
        playsInline                // Better support for mobile
        className="w-full h-full object-cover opacity-80"
        whileHover={{ scale: 1.15 }} // Kept your zoom animation!
        transition={{ duration: 0.8 }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
      <div className="absolute bottom-10 left-0 w-full text-center px-4">
         <motion.div 
           whileHover={{ y: -5 }}
           className="mb-4 inline-flex p-4 rounded-none bg-purple-500/20 backdrop-blur-md border border-purple-400/30 pl-5"
         >
            <Play className="text-white fill-current" size={24} />
         </motion.div>
         <h3 className="text-white font-black text-2xl md:text-3xl uppercase tracking-widest leading-none">
          Video Edit
        </h3>
        <p className="text-purple-400 text-xs md:text-sm font-mono mt-2 tracking-widest opacity-80">CINEMATIC CUTS</p>
      </div>
    </motion.div>
  </motion.div>
);

const Hero = () => {
  const containerRef = useRef(null);

  // --- MOUSE TRACKING ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smoother Spring Physics (Critically damped to prevent wobble/lag)
  const springConfig = { damping: 35, stiffness: 200, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // INVERSE TRANSFORM: Pins the zoomed content
  const innerX = useTransform(mouseX, (val) => -val);
  const innerY = useTransform(mouseY, (val) => -val);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    x.set(clientX - innerWidth / 2);
    y.set(clientY - innerHeight / 2);
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen bg-[#F5F5F7] overflow-hidden flex flex-col items-center justify-center font-sans"
    >
      
      {/* --- BACKGROUND DECOR --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
         <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[1200px] h-[1200px] bg-white rounded-full blur-[120px] opacity-100" />
      </motion.div>

      {/* =========================================================
          LAYER 1: REALITY (Sharp, Fully Visible)
      ========================================================= */}
      <div className="relative z-10 pointer-events-none select-none">
         <HeroContent isZoomed={false} />
      </div>


      {/* =========================================================
          LAYER 2: THE WATER BALL (The Lens)
      ========================================================= */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="absolute z-50 w-72 h-72 md:w-96 md:h-96 pointer-events-none"
      >
        <motion.div 
           animate={{
             borderRadius: [
                "50% 50% 50% 50% / 50% 50% 50% 50%", 
                "55% 45% 55% 45% / 55% 45% 55% 45%", 
                "50% 50% 50% 50% / 50% 50% 50% 50%"  
             ],
             rotate: [0, 5, -5, 0]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           
           // === THE MAGIC CSS ===
           className="relative w-full h-full overflow-hidden bg-[#F5F5F7] shadow-[inset_15px_15px_40px_rgba(255,255,255,1),_inset_-15px_-15px_40px_rgba(0,0,0,0.1),_10px_20px_50px_rgba(0,0,0,0.2)] border-[2px] border-white/40"
        >
          {/* CONTENT INSIDE (Zoomed & Pinned) */}
          <motion.div 
            style={{ x: innerX, y: innerY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-screen h-screen"
          >
             <HeroContent isZoomed={true} />
          </motion.div>

          {/* === WATER SHINE & REFLECTIONS === */}
          <div className="absolute top-10 left-12 w-32 h-16 bg-gradient-to-br from-white to-transparent opacity-90 rounded-full blur-[5px] rotate-[-25deg]" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-40 h-2 bg-white opacity-50 rounded-full blur-[3px]" />
          <div className="absolute bottom-12 right-14 w-20 h-20 bg-white opacity-30 rounded-full blur-[12px]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-full" />
          
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;