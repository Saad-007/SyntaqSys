import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- DATA: PROJECTS ---
const projects = [
  {
    id: 1,
    title: "Cyberpunk Fashion",
    client: "NEON VOGUE",
    category: "Video Editing",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    color: "group-hover:text-purple-500"
  },
  {
    id: 2,
    title: "SaaS Explainer 3D",
    client: "ORBITAL TECH",
    category: "Motion Graphics",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    color: "group-hover:text-cyan-500"
  },
  {
    id: 3,
    title: "Future Conference",
    client: "TEDx GLOBAL",
    category: "Event Coverage",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    color: "group-hover:text-green-500"
  },
  {
    id: 4,
    title: "Urban Fitness",
    client: "NIKE LAB",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    color: "group-hover:text-orange-500"
  }
];

// --- COMPONENT: 3D TILT PROJECT CARD ---
const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring Physics for smooth tilt
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      viewport={{ once: true }}
      style={{
        perspective: 1000
      }}
      // RESPONSIVE HEIGHT: h-[400px] on mobile, h-[600px] on desktop
      className="group w-full h-[400px] md:h-[600px] cursor-pointer"
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full w-full rounded-none overflow-hidden bg-white shadow-xl transition-shadow duration-500 group-hover:shadow-2xl"
      >
        {/* Image Scale Effect */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
           <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100 md:grayscale md:group-hover:grayscale-0"
          />
        </div>

        {/* Dark Overlay (Always visible on mobile for text readability, fade on desktop) */}
        <div className="absolute inset-0 bg-black/30 md:bg-black/20 md:group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />

        {/* --- FLOATING CONTENT (Moves in 3D) --- */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
          
          {/* Top Right Icon */}
          <div className="self-end translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
             <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center rounded-full">
                <ArrowUpRight className="text-white w-5 h-5 md:w-6 md:h-6" />
             </div>
          </div>

          {/* Bottom Content Area */}
          <div className="translate-z-10">
            {/* Category Label */}
            <div className="overflow-hidden mb-1 md:mb-2">
              <p className={`text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 delay-100 text-white/80`}>
                {project.category}
              </p>
            </div>

            {/* Title (Big & Bold) */}
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 md:mb-4 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
              {project.title}
            </h3>

            {/* Client Name & Line */}
            <div className="flex items-center gap-3 md:gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-200">
               <div className={`h-[2px] w-8 md:w-12 bg-white`} />
               <span className="text-xs md:text-sm font-mono text-gray-300 uppercase tracking-widest">
                 {project.client}
               </span>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

const Work = () => {
  return (
    <section id="work" className="py-20 md:py-32 bg-[#F5F5F7] relative overflow-hidden font-sans">
      
      {/* Background Decor (Subtle Light Leak) */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white rounded-full blur-[80px] md:blur-[100px] opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 md:w-12 h-[2px] bg-black/20" />
               <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black/40">Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-black uppercase tracking-tighter leading-[0.9]">
              Selected <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                Works.
              </span>
            </h2>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-3 px-8 py-4 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300 group"
          >
            <span className="font-bold tracking-widest text-sm uppercase">View All Projects</span>
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </motion.button>
        </div>

        {/* --- PROJECT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-12 flex md:hidden justify-center">
          <button className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full w-full justify-center shadow-lg active:scale-95 transition-transform">
            <span className="font-bold tracking-widest text-sm uppercase">View All Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Work;