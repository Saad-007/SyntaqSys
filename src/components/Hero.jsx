import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, Cpu } from "lucide-react";
import myEditingVideo from '../assets/video/Newcar.mp4'; 

// --- ANIMATION VARIANTS ---
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

// --- UPDATED: SMOOTH 30 DEGREE ENTRANCE ---
const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    // Start from further down
    y: 150, 
    // Slide in from further out
    x: direction === 'left' ? -200 : 200, 
    // The specific 30 degree rotation you asked for
    rotate: direction === 'left' ? -30 : 30, 
    filter: "blur(20px)",
    scale: 0.8
  }),
  visible: (direction) => ({
    opacity: 1,
    y: 0,
    x: 0,
    // Settle at a slight angle for style (or use 0 for perfectly straight)
    rotate: direction === 'left' ? -6 : 6, 
    filter: "blur(0px)",
    scale: 1,
    transition: {
      // Custom Bezier curve for "Beautiful/Smooth" motion
      duration: 1.4, 
      ease: [0.25, 1, 0.5, 1] 
    }
  })
};

const floatAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

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
    // RESPONSIVE LAYOUT: flex-col on mobile, flex-row on desktop
    className={`
      flex flex-col md:flex-row items-center justify-center 
      gap-10 md:gap-32 
      origin-center transition-transform duration-700 ease-out 
      pt-24 md:pt-0 
      ${isZoomed ? 'scale-105 md:scale-125' : 'scale-100'}
    `}
  >
    
    {/* LEFT CARD: AUTOMATION */}
    <motion.div 
      custom="left"
      variants={cardVariants}
      animate={!isZoomed ? floatAnimation : {}} 
      whileHover={{ scale: 1.05, rotate: -2, transition: { duration: 0.4 } }}
      className={`
        relative w-64 h-[350px] md:w-80 md:h-[500px] rounded-2xl overflow-hidden 
        bg-black shadow-2xl group shrink-0
        ${isZoomed ? 'border-[3px] border-green-400' : 'border-[3px] border-white/80'}
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
      <div className="absolute bottom-8 left-0 w-full text-center px-4">
        <motion.div 
          whileHover={{ y: -5 }}
          className="mb-3 inline-flex p-3 rounded-none bg-green-500/20 backdrop-blur-md border border-green-400/30"
        >
           <Cpu size={24} className="text-green-400" />
        </motion.div>
        <h3 className="text-white font-black text-xl md:text-3xl uppercase tracking-widest leading-none">
          Automation
        </h3>
        <p className="text-green-400 text-[10px] md:text-sm font-mono mt-2 tracking-widest opacity-80">AI WORKFLOWS</p>
      </div>
    </motion.div>

    {/* CENTER TEXT: SYNTAQ */}
    <motion.div 
      variants={textVariants}
      className="flex items-center justify-center z-10 py-4 md:py-0"
    >
      <span 
        className={`
          text-6xl md:text-8xl font-black text-black tracking-[0.15em] md:tracking-[0.25em] pl-[0.15em] uppercase
          drop-shadow-sm transition-all duration-500 text-center leading-none
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
        relative w-64 h-[350px] md:w-80 md:h-[500px] rounded-2xl overflow-hidden 
        bg-black shadow-2xl group shrink-0
        ${isZoomed ? 'border-[3px] border-purple-500' : 'border-[3px] border-white/80'}
      `}
    >
      <motion.video 
        src={myEditingVideo}
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-cover opacity-80"
        whileHover={{ scale: 1.15 }} 
        transition={{ duration: 0.8 }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
      <div className="absolute bottom-8 left-0 w-full text-center px-4">
         <motion.div 
           whileHover={{ y: -5 }}
           className="mb-3 inline-flex p-3 rounded-none bg-purple-500/20 backdrop-blur-md border border-purple-400/30 pl-5"
         >
            <Play className="text-white fill-current" size={24} />
         </motion.div>
         <h3 className="text-white font-black text-xl md:text-3xl uppercase tracking-widest leading-none">
          Video Edit
        </h3>
        <p className="text-purple-400 text-[10px] md:text-sm font-mono mt-2 tracking-widest opacity-80">CINEMATIC CUTS</p>
      </div>
    </motion.div>
  </motion.div>
);

const Hero = () => {
  const containerRef = useRef(null);
  const [hideLens, setHideLens] = useState(false);

  // --- MOUSE TRACKING ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 200, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const innerX = useTransform(mouseX, (val) => -val);
  const innerY = useTransform(mouseY, (val) => -val);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    x.set(clientX - innerWidth / 2);
    y.set(clientY - innerHeight / 2);

    // Hide lens if near the navbar (top 120px)
    if (clientY < 120) {
       setHideLens(true);
    } else {
       setHideLens(false);
    }
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      // RESPONSIVE HEIGHT: Auto on mobile to fit content, Screen on desktop
      className="relative w-full min-h-screen md:h-screen bg-[#F5F5F7] overflow-hidden flex flex-col items-center justify-center font-sans py-20 md:py-0"
    >
      
      {/* --- BACKGROUND DECOR --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
         <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] bg-white rounded-full blur-[80px] md:blur-[120px] opacity-100" />
      </motion.div>

      {/* =========================================================
          LAYER 1: REALITY
      ========================================================= */}
      <div className="relative z-10 pointer-events-none select-none">
         <HeroContent isZoomed={false} />
      </div>


      {/* =========================================================
          LAYER 2: THE WATER BALL (Z-Index 30 to sit below Navbar)
      ========================================================= */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className={`
            fixed md:absolute z-30 
            w-48 h-48 md:w-96 md:h-96 
            pointer-events-none 
            transition-opacity duration-300 
            ${hideLens ? 'opacity-0' : 'opacity-100'}
            hidden md:block 
        `}
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
           
           className="relative w-full h-full overflow-hidden bg-[#F5F5F7] shadow-[inset_15px_15px_40px_rgba(255,255,255,1),_inset_-15px_-15px_40px_rgba(0,0,0,0.1),_10px_20px_50px_rgba(0,0,0,0.2)] border-[2px] border-white/40"
        >
          {/* CONTENT INSIDE */}
          <motion.div 
            style={{ x: innerX, y: innerY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-screen h-screen"
          >
             <HeroContent isZoomed={true} />
          </motion.div>

          {/* REFLECTIONS */}
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