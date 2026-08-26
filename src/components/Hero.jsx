import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Bot } from "lucide-react";

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

// --- SMOOTH 30 DEGREE ENTRANCE ---
const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    y: 150, 
    x: direction === 'left' ? -200 : 200, 
    rotate: direction === 'left' ? -30 : 30, 
    filter: "blur(20px)",
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
      duration: 1.4, 
      ease: [0.25, 1, 0.5, 1] 
    }
  })
};

// Gentle floating animation
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
    className={`
      flex flex-col md:flex-row items-center justify-center 
      gap-10 md:gap-32 
      origin-center transition-transform duration-700 ease-out 
      pt-24 md:pt-0 
      ${isZoomed ? 'scale-105 md:scale-125' : 'scale-100'}
    `}
  >
    
    {/* LEFT CARD: WEB & APP */}
    <motion.div 
      custom="left"
      variants={cardVariants}
      animate={!isZoomed ? floatAnimation : {}} 
      whileHover={{ scale: 1.05, rotate: -2, transition: { duration: 0.4 } }}
      className={`
        relative w-64 h-[350px] md:w-80 md:h-[500px] rounded-2xl overflow-hidden 
        bg-black shadow-2xl group shrink-0
        ${isZoomed ? 'border-[3px] border-cyan-400' : 'border-[3px] border-white/80'}
      `}
    >
      <motion.img 
        src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=800&q=80" 
        className="w-full h-full object-cover opacity-60"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.8 }}
        alt="Web & App Development"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/95" />
      <div className="absolute bottom-8 left-0 w-full text-center px-4">
        <motion.div 
          whileHover={{ y: -5 }}
          className="mb-3 inline-flex p-3 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30"
        >
           <Code2 size={24} className="text-cyan-400" />
        </motion.div>
        <h3 className="text-white font-black text-xl md:text-3xl uppercase tracking-tighter">
          Web &amp; App
        </h3>
        <p className="text-cyan-400 text-[10px] md:text-xs font-mono mt-1 tracking-[0.2em] uppercase opacity-90">
          Full-Stack Development
        </p>
      </div>
    </motion.div>

    {/* CENTER TEXT: BRAND IDENTITY */}
    <div className="flex flex-col items-center justify-center z-10 py-4 md:py-0">
      <motion.div variants={textVariants}>
        <span 
          className={`
            text-6xl md:text-9xl font-black text-black tracking-[0.1em] uppercase
            transition-all duration-500 text-center leading-none
            ${isZoomed ? 'text-transparent bg-clip-text bg-gradient-to-b from-black to-gray-500' : ''}
          `}
        >
          SYNTAQ
        </span>
      </motion.div>
      
      <motion.p 
        variants={textVariants}
        className="text-black/40 font-medium text-[10px] md:text-sm tracking-[0.4em] uppercase mt-4"
      >
        Digital Evolution Agency
      </motion.p>
    </div>

    {/* RIGHT CARD: AI AUTOMATION & VOICE AGENTS */}
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
      <motion.img 
        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" 
        className="w-full h-full object-cover opacity-60"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.8 }}
        alt="AI Automation & Voice Agents"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/95" />
      <div className="absolute bottom-8 left-0 w-full text-center px-4">
         <motion.div 
           whileHover={{ y: -5 }}
           className="mb-3 inline-flex p-3 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-400/30"
         >
            <Bot className="text-purple-400" size={24} />
         </motion.div>
         <h3 className="text-white font-black text-xl md:text-3xl uppercase tracking-tighter">
          AI Automation
        </h3>
        <p className="text-purple-400 text-[10px] md:text-xs font-mono mt-1 tracking-[0.2em] uppercase opacity-90">
          Voice Agents &amp; Assistants
        </p>
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

      {/* LAYER 1: REALITY */}
      <div className="relative z-10 pointer-events-none select-none">
         <HeroContent isZoomed={false} />
      </div>

      {/* LAYER 2: THE WATER BALL */}
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