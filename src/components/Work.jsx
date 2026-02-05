import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

// --- STEP 1: IMPORT YOUR LOCAL IMAGES HERE ---
import shopImage from '../assets/image/shopplus.png';
import resumeImage from '../assets/image/resume.png';
import TeamsynImage from '../assets/image/Teamsyn.png';
// Then use 'shopImage' in the projects array below instead of the URL.

// --- DATA: REAL PROJECTS ---
const projects = [
  {
    id: 1,
    title: "ShopPlus Ecosystem",
    client: "E-COMMERCE",
    category: "Full Stack Platform",
    description: "A comprehensive e-commerce solution with real-time inventory and AI recommendations.",
    image: shopImage, // Replace with local import
    color: "group-hover:text-purple-500"
  },
  {
    id: 2,
    title: "Resume AI Architect",
    client: "ED-TECH",
    category: "NLP & Scoring Engine",
    description: "AI-powered tool that analyzes resumes and provides actionable scoring and feedback.",
    image: resumeImage, // Replace with local import
    color: "group-hover:text-cyan-500"
  },
  {
    id: 3,
    title: "TeamSync Live",
    client: "SAAS PRODUCT",
    category: "Video & Whiteboard",
    description: "Collaborative whiteboard with real-time video transcription and diagram generation.",
    image: TeamsynImage, // Replace with local import
    color: "group-hover:text-green-500"
  },
  {
    id: 4,
    title: "Viral Ad Campaigns",
    client: "GROWTH MARKETING",
    category: "Paid Media Strategy",
    description: "High-conversion ad creatives designed for social dominance.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with local import
    color: "group-hover:text-orange-500"
  }
];

// --- COMPONENT: 3D TILT PROJECT CARD ---
const ProjectCard = ({ project, index, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

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
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
      className="group w-full h-[400px] md:h-[600px] cursor-pointer"
      onClick={() => onClick(project)}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full w-full rounded-none overflow-hidden bg-white shadow-xl transition-shadow duration-500 group-hover:shadow-2xl"
      >
        {/* Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
           <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 md:bg-black/20 md:group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
          <div className="self-end translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
             <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center rounded-full">
                <ArrowUpRight className="text-white w-5 h-5 md:w-6 md:h-6" />
             </div>
          </div>

          <div className="translate-z-10">
            <p className={`text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/80 mb-2`}>
              {project.category}
            </p>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              {project.title}
            </h3>
            <div className="flex items-center gap-3">
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

// --- MAIN WORK COMPONENT ---
const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="work" className="py-20 md:py-32 bg-[#F5F5F7] relative overflow-hidden font-sans">
      
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white rounded-full blur-[80px] md:blur-[100px] opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 md:w-12 h-[2px] bg-black/20" />
               <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black/40">Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-black uppercase tracking-tighter leading-[0.9]">
              Selected <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Works.</span>
            </h2>
          </motion.div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={setSelectedProject} // Pass the click handler
            />
          ))}
        </div>
      </div>

      {/* --- IMAGE SHOWCASE MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50">
              <X size={32} />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} // Prevent close on clicking content
            >
              {/* Image Container */}
              <div className="w-full aspect-video md:aspect-[21/9] bg-black">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base max-w-xl">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-white/80 text-xs font-mono uppercase tracking-widest">
                    {selectedProject.client}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Work;