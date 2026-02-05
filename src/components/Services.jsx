import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Cpu, Globe, Video, Play, X, Instagram, Megaphone } from "lucide-react";

// --- IMPORT LOCAL VIDEOS ---
import myVideo1 from '../assets/video/minimal.mp4'; 
import myVideo2 from '../assets/video/Newcar.mp4';
import myVideo3 from '../assets/video/New.mp4';

// --- DATA: SERVICES ---
const services = [
  {
    id: "01",
    title: "AI Automation",
    description: "Intelligent agents & workflows that replace manual labor.",
    tags: ["LLM Integration", "Chatbots", "Python"],
    icon: <Cpu className="w-5 h-5" />,
    // video: myVideo1, 
    image: "https://plus.unsplash.com/premium_photo-1682002216092-efdf11860aa1?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "02",
    title: "Web Engineering",
    description: "High-performance SaaS & E-Commerce platforms.",
    tags: ["React.js", "Node.js", "Next.js"],
    icon: <Globe className="w-5 h-5" />,
    // video: myVideo3,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "03",
    title: "Cinematic Editing",
    description: "High-retention video assets for social dominance.",
    tags: ["Premiere", "After Effects", "Sound"],
    icon: <Video className="w-5 h-5" />,
    // video: null, 
    // FIXED: Direct Link to AE Image
    image: "https://images.unsplash.com/photo-1740174459694-4da6669ef2b0?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "04",
    title: "Growth Marketing",
    description: "Paid Ads & Social Media Management to scale your brand.",
    tags: ["Meta Ads", "YouTube Growth", "Content Strategy"],
    icon: <Megaphone className="w-5 h-5" />,
    // video: null,
    // Image representing ads/analytics
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  }
];

// --- DATA: VIDEO SAMPLES ---
const videoSamples = [
  { 
    id: 1, 
    title: "Viral Minimal", 
    client: "Agency",
    videoSrc: myVideo1, 
    thumbnail: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop", 
    stats: "2.4M"
  },
  { 
    id: 2, 
    title: "Tech Launch", 
    client: "Sony",
    videoSrc: myVideo2,
    thumbnail: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2670&auto=format&fit=crop",
    stats: "850K"
  },
  { 
    id: 3, 
    title: "Luxury Travel", 
    client: "Ritz",
    videoSrc: myVideo3,
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2574&auto=format&fit=crop",
    stats: "1.2M"
  }
];

// --- COMPONENT: 3D TILT VIDEO CARD ---
const TiltCard = ({ video, onClick, isHovered, onHover, onLeave }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const videoRef = useRef(null);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseEnter = () => {
    onHover();
    if(videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeave();
    if(videoRef.current) {
        videoRef.current.pause();
    }
  };

  return (
    <motion.div
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        opacity: isHovered ? 1 : 0.6, 
        filter: isHovered ? "blur(0px) grayscale(0%)" : "blur(2px) grayscale(100%)",
        scale: isHovered ? 1.05 : 1
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative w-[280px] h-[500px] md:w-[320px] md:h-[560px] rounded-2xl cursor-pointer perspective-1000 shrink-0"
    >
       <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
          />
          <video
            ref={videoRef}
            src={video.videoSrc}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className={`w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-all duration-300 ${isHovered ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
                <Play className="w-6 h-6 fill-white text-white ml-1" />
             </div>
          </div>
          <div className="absolute top-4 right-4 z-20">
             <div className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full flex items-center gap-1 border border-white/10">
                <Instagram className="w-3 h-3 text-pink-500" />
                <span className="text-[10px] font-bold tracking-wider text-white">{video.stats}</span>
             </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
             <p className="text-purple-400 text-xs font-mono mb-1 tracking-widest uppercase">{video.client}</p>
             <h3 className="text-2xl font-black uppercase leading-none text-white">{video.title}</h3>
          </div>
       </div>
    </motion.div>
  );
};

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);

  return (
    <section id="services" className="bg-[#F5F5F7] font-sans relative">
      
      {/* PART 1: SERVICES LIST */}
      <div className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-white rounded-full blur-[120px] opacity-60 pointer-events-none translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          {/* Header */}
          <div className="mb-12 md:mb-24">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
               viewport={{ once: true }}
               className="flex items-center gap-3 mb-6"
             >
                <div className="w-12 h-[2px] bg-black/20" />
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-black/40">Our Expertise</span>
             </motion.div>
             <motion.h2 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
               viewport={{ once: true }}
               className="text-5xl md:text-8xl font-black text-black uppercase tracking-tighter leading-[0.9] max-w-5xl"
             >
               Digital <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                 Architecture.
               </span>
             </motion.h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-32">
            
            {/* Left: List (Scrollable / Expandable) */}
            <div className="w-full lg:w-1/2 flex flex-col">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  // Interaction: Hover on Desktop, Click on Mobile
                  onMouseEnter={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                  className="group relative border-t border-black/10 last:border-b py-8 md:py-10 cursor-pointer transition-all duration-300"
                >
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex gap-4 md:gap-8 w-full">
                      <span className={`text-sm font-mono mt-2 transition-colors duration-300 ${activeService === index ? 'text-cyan-600' : 'text-gray-300'}`}>/{service.id}</span>
                      <div className="flex-1">
                        <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tight transition-colors duration-300 ${activeService === index ? 'text-black' : 'text-gray-300'}`}>
                          {service.title}
                        </h3>
                        
                        {/* EXPANDABLE CONTENT */}
                        <motion.div 
                          initial={false}
                          animate={{ height: activeService === index ? "auto" : 0, opacity: activeService === index ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-6 text-gray-500 max-w-md leading-relaxed text-lg">{service.description}</p>
                          <div className="flex flex-wrap gap-2 mt-6">
                            {service.tags.map((tag) => (
                              <span key={tag} className="px-3 py-1 bg-white border border-black/5 rounded-full text-xs font-bold uppercase tracking-wider text-gray-600">{tag}</span>
                            ))}
                          </div>

                          {/* --- MOBILE VISUAL (Hidden on Desktop) --- */}
                          <div className="mt-8 rounded-xl overflow-hidden shadow-xl lg:hidden w-full aspect-video relative bg-black">
                             {service.video ? (
                                <video 
                                  src={service.video}
                                  autoPlay 
                                  loop 
                                  muted 
                                  playsInline 
                                  className="w-full h-full object-cover"
                                />
                             ) : (
                                <img 
                                  src={service.image} 
                                  alt={service.title}
                                  className="w-full h-full object-cover"
                                />
                             )}
                             {/* Overlay for Mobile */}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                             <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                                {service.icon}
                                <span className="text-xs font-bold uppercase tracking-widest">Preview</span>
                             </div>
                          </div>

                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Arrow (Rotates on Active) */}
                    <div className={`transition-transform duration-500 ${activeService === index ? 'rotate-45 translate-x-2' : 'rotate-0'}`}>
                       <ArrowUpRight className={`w-6 h-6 md:w-8 md:h-8 ${activeService === index ? 'text-cyan-600' : 'text-gray-200'}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Sticky Visual (Desktop Only) */}
            <div className="hidden lg:block w-1/2 relative h-[700px]">
               <div className="sticky top-32 w-full h-full">
                  <div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/40">
                     <AnimatePresence mode='wait'>
                       <motion.div 
                          key={activeService}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="absolute inset-0 w-full h-full"
                       >
                          {services[activeService].video ? (
                             <video 
                                src={services[activeService].video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                             />
                          ) : (
                             <img 
                                src={services[activeService].image}
                                className="w-full h-full object-cover"
                                alt={services[activeService].title}
                             />
                          )}
                       </motion.div>
                     </AnimatePresence>
                     
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                     <div className="absolute bottom-10 left-10">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
                           {services[activeService].icon}
                           <span className="font-bold tracking-widest uppercase text-sm">{services[activeService].title}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: VERTICAL CONTENT STUDIO */}
      <div className="py-20 md:py-32 bg-[#050505] relative overflow-hidden text-white">
         <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center mb-16 md:mb-20">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-300">Vertical Studio</span>
               </div>
               <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                  Short Form <br/> <span className="text-purple-600">Dominance.</span>
               </h2>
            </div>
            
            {/* Scrollable Container on Mobile */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 perspective-[2000px]">
               {videoSamples.map((video) => (
                  <TiltCard 
                    key={video.id}
                    video={video}
                    isHovered={hoveredVideoId === video.id || hoveredVideoId === null}
                    onHover={() => setHoveredVideoId(video.id)}
                    onLeave={() => setHoveredVideoId(null)}
                    onClick={() => setSelectedVideo(video)}
                  />
               ))}
            </div>
         </div>
      </div>

      {/* PART 3: VIDEO MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50">
              <X size={32} />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-sm aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl relative border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
               <video 
                  src={selectedVideo.videoSrc} 
                  poster={selectedVideo.thumbnail}
                  className="w-full h-full object-cover"
                  autoPlay
                  controls
                  loop
               />
               <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                  <h3 className="text-xl font-bold text-white">{selectedVideo.title}</h3>
                  <p className="text-xs text-gray-300 uppercase tracking-widest">{selectedVideo.client}</p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Services;