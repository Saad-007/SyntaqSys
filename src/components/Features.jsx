import React from 'react';
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Workflow, 
  Maximize, 
  Layers, 
  Plus
} from "lucide-react";

const Features = () => {
  const strategies = [
    {
      id: "01",
      title: "Operational Autonomy",
      description: "We engineer proprietary intelligence layers that remove human dependency from core workflows. Achieve a self-sustaining business model that operates with absolute precision.",
      icon: <Workflow size={24} />,
      size: "md:col-span-2",
      bg: "bg-white",
      isDark: false
    },
    {
      id: "02",
      title: "Scalable Infrastructure",
      description: "Architecture designed for the next decade of growth. High-integrity foundations that support exponential volume.",
      icon: <Maximize size={24} />,
      size: "md:col-span-1",
      bg: "bg-black",
      isDark: true
    },
    {
      id: "03",
      title: "Market Authority",
      description: "High-retention visual storytelling that commands attention. We bridge the gap between technical complexity and brand desirability.",
      icon: <Layers size={24} />,
      size: "md:col-span-1",
      bg: "bg-white",
      isDark: false
    },
    {
      id: "04",
      title: "Predictive Intelligence",
      description: "Transformation of raw data into high-level strategy. Gain total transparency over growth trajectories with custom-engineered monitoring environments.",
      icon: <BarChart3 size={24} />,
      size: "md:col-span-2",
      bg: "bg-white",
      isDark: false
    }
  ];

  return (
    <section className="py-24 md:py-40 bg-[#F5F5F7] px-6 font-sans relative z-20">
      <div className="container mx-auto max-w-7xl">
        
        {/* --- MINIMAL HEADER --- */}
        <div className="mb-24 md:mb-32 max-w-4xl text-black">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-black/30">
              Agency Expertise
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9]"
          >
            Scale. <br/>
            Automate. <br /> 
            Succeed.
          </motion.h2>
        </div>

        {/* --- THE BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strategies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`
                ${item.size} ${item.bg} 
                ${item.isDark ? 'text-white' : 'text-black'}
                group relative p-10 md:p-14 rounded-[2.5rem] 
                flex flex-col justify-between min-h-[400px] 
                border border-black/5 hover:border-black/10 transition-all duration-500
              `}
            >
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
                  {item.icon}
                </div>
                <Plus className={`${item.isDark ? 'opacity-20' : 'opacity-10'}`} size={20} />
              </div>
              
              <div className="relative">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 leading-none">
                  {item.title}
                </h3>
                <p className={`text-base md:text-lg leading-relaxed max-w-md font-medium ${item.isDark ? 'opacity-40' : 'opacity-50'}`}>
                  {item.description}
                </p>
                
                <div className="mt-12 flex items-center gap-3">
                   <div className={`h-[1px] w-8 ${item.isDark ? 'bg-white/30' : 'bg-black/20'}`} />
                   <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${item.isDark ? 'opacity-40' : 'opacity-30'}`}>Detail View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- REFINED CTA BANNER --- */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="mt-4 w-full p-12 md:p-20 bg-black rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-12 text-white overflow-hidden relative"
        >
          <div className="max-w-xl text-center md:text-left relative z-10">
            <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none text-white">
              Initiate <br/><span className="text-white/30">Expansion.</span>
            </h4>
            <p className="text-white/40 font-bold tracking-widest uppercase text-[10px]">
              Limited Partnership Openings for 2026.
            </p>
          </div>

          <div className="relative z-10">
            <button className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-full transition-all duration-300 hover:bg-[#F5F5F7] hover:px-14">
               Consult Agency
            </button>
          </div>
          
          {/* Subtle Background Shape */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
        </motion.div>
      </div>
    </section>
  );
};

export default Features;