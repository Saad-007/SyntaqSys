import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";

// --- STEP 1: IMPORT YOUR LOCAL IMAGES HERE ---
import shopImage from '../assets/image/shopplus.png';
import resumeImage from '../assets/image/resume.png';
import TeamsynImage from '../assets/image/Teamsyn.png';

// --- DATA: REAL PROJECTS (CASE STUDY STRUCTURE) ---
const projects = [
  {
    id: 1,
    title: "Social Genius",
    client: "IOS APP",
    category: "AI Text Analyzer",
    year: "2025",
    role: "Full-Stack Development",
    description: "A production-ready iOS application that evaluates text message emotional risk and generates real-time 'Aura Scores.'",
    challenge: "Users wanted a fast, private way to gauge the emotional tone of conversations before sending — without exposing their messages to a slow or unreliable third-party service.",
    solution: "Built a React Native + Expo app on top of a secure Node.js & Supabase backend, using OpenAI to score message risk in real time. Subscriptions were handled through RevenueCat for seamless auto-renewal.",
    stack: ["React Native", "Expo", "Node.js", "Supabase", "OpenAI", "RevenueCat"],
    results: [
      { label: "Platform", value: "iOS" },
      { label: "Response Time", value: "<2s" },
      { label: "Monetization", value: "Subscriptions" }
    ],
    image: "/social-genius.png",
    link: "https://apps.apple.com/us/app/social-genius-text-analyzer/id6776793403",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    title: "ApplyMax",
    client: "AI CAREER TOOL",
    category: "Resume & ATS Copilot",
    year: "2025",
    role: "Product & Engineering",
    description: "An intelligent AI copilot that cross-references your resume with target job listings.",
    challenge: "Job seekers were losing opportunities to ATS filters that silently rejected qualified candidates over formatting and keyword mismatches.",
    solution: "Built an AI engine that flags mismatches, scores ATS compatibility, and auto-generates tailored resumes and cover letters for each job listing — turning a manual, hours-long task into minutes.",
    stack: ["Next.js", "OpenAI", "PostgreSQL", "Stripe"],
    results: [
      { label: "Time Saved", value: "~3 hrs/app" },
      { label: "ATS Scoring", value: "Real-time" },
      { label: "Status", value: "Live" }
    ],
    image: "/applymax.png",
    link: "https://www.applymax.online/",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "BodyMax",
    client: "FITNESS TECH",
    category: "Multimodal AI Assessment",
    year: "2025",
    role: "Full-Stack Development",
    description: "A multimodal AI pipeline that analyzes user-uploaded physique images for fitness evaluation.",
    challenge: "Generic fitness apps couldn't give users personalized, visual feedback on their actual physique — only generic templates and calculators.",
    solution: "Integrated the GPT-4o API to analyze uploaded images and generate accurate, personalized fitness evaluations, backed by a hybrid Supabase & Firebase database and an interactive Framer Motion frontend.",
    stack: ["GPT-4o API", "Supabase", "Firebase", "Framer Motion"],
    results: [
      { label: "AI Model", value: "GPT-4o Vision" },
      { label: "Analysis Time", value: "<10s" },
      { label: "Status", value: "Live" }
    ],
    image: "/bodymax.png",
    link: "https://bodymaxx.online/",
    color: "from-orange-500 to-amber-500"
  },
  {
    id: 4,
    title: "ShopPlus Ecosystem",
    client: "E-COMMERCE",
    category: "Full Stack Platform",
    year: "2024",
    role: "Full-Stack Development",
    description: "A comprehensive MERN stack e-commerce solution with real-time inventory and AI recommendations.",
    challenge: "The client needed a scalable storefront with a real admin backend — not a template — including live inventory tracking and personalized product discovery.",
    solution: "Built a full MERN stack platform with secure authentication, a detailed admin dashboard, real-time inventory management, and an AI-driven recommendation engine to boost average order value.",
    stack: ["MongoDB", "Express", "React", "Node.js", "AI Recommendations"],
    results: [
      { label: "Stack", value: "MERN" },
      { label: "Admin Panel", value: "Custom Built" },
      { label: "Inventory", value: "Real-time" }
    ],
    image: shopImage,
    link: "",
    color: "from-purple-500 to-fuchsia-500"
  },
  {
    id: 5,
    title: "Resume AI Architect",
    client: "ED-TECH",
    category: "NLP & Scoring Engine",
    year: "2024",
    role: "AI Engineering",
    description: "An advanced AI-powered resume builder and analyzer with actionable scoring and feedback.",
    challenge: "Candidates had no objective way to know if their resume was actually competitive before submitting it — feedback was vague or nonexistent.",
    solution: "Built an NLP scoring engine that evaluates resumes against role-specific benchmarks and returns clear, actionable feedback to help candidates improve before they apply.",
    stack: ["Python", "NLP", "OpenAI", "React"],
    results: [
      { label: "Engine", value: "Custom NLP" },
      { label: "Feedback", value: "Actionable" },
      { label: "Status", value: "Live" }
    ],
    image: resumeImage,
    link: "",
    color: "from-cyan-500 to-teal-500"
  },
  {
    id: 6,
    title: "TeamSync Live",
    client: "SAAS PRODUCT",
    category: "Video & Whiteboard",
    year: "2024",
    role: "Full-Stack Development",
    description: "A real-time collaborative platform integrating a shared whiteboard with AI meeting summaries.",
    challenge: "Remote teams were losing context between calls — no single place combined live collaboration with an accurate record of what was discussed.",
    solution: "Combined a shared real-time whiteboard with Whisper audio transcription and Ollama-powered AI summary generation, giving teams a searchable record of every session automatically.",
    stack: ["WebRTC", "Whisper", "Ollama", "Node.js"],
    results: [
      { label: "Transcription", value: "Real-time" },
      { label: "Summaries", value: "AI-generated" },
      { label: "Status", value: "Live" }
    ],
    image: TeamsynImage,
    link: "",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 7,
    title: "Viral Ad Campaigns",
    client: "GROWTH MARKETING",
    category: "Paid Media Strategy",
    year: "2024",
    role: "Growth & Creative Strategy",
    description: "High-conversion ad creatives designed for social dominance and rapid audience scaling.",
    challenge: "The client's paid campaigns were burning budget with low engagement and no clear creative direction across platforms.",
    solution: "Developed a testing framework for high-conversion ad creatives across Meta and YouTube, iterating fast on hooks and formats to maximize ROI and scale winning campaigns.",
    stack: ["Meta Ads", "YouTube Ads", "Creative Strategy"],
    results: [
      { label: "Platforms", value: "Meta / YouTube" },
      { label: "Focus", value: "ROI Scaling" },
      { label: "Approach", value: "Rapid Testing" }
    ],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "",
    color: "from-orange-500 to-red-500"
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
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
           <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          />
        </div>

        <div className="absolute inset-0 bg-black/30 md:bg-black/20 md:group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />

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

// --- CASE STUDY MODAL ---
const CaseStudyModal = ({ project, onClose, onNext, onPrev }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-8"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white transition-colors z-[110] bg-black/50 p-2.5 rounded-full backdrop-blur-md"
      >
        <X size={24} />
      </button>

      {/* Prev / Next Navigation */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-[110] bg-black/50 p-3 rounded-full backdrop-blur-md"
      >
        <ArrowLeft size={22} />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-[110] bg-black/50 p-3 rounded-full backdrop-blur-md"
      >
        <ArrowRight size={22} />
      </button>

      <motion.div
        key={project.id}
        initial={{ scale: 0.95, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 220 }}
        className="relative w-full h-full md:h-auto md:max-w-6xl md:max-h-[90vh] overflow-y-auto bg-[#0A0A0A] md:rounded-2xl shadow-2xl border border-white/10 flex flex-col scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image */}
        <div className="relative w-full shrink-0 aspect-video md:aspect-[21/9] bg-black overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent`} />
          <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6">
            <p className="text-white/60 text-xs md:text-sm font-mono uppercase tracking-[0.2em] mb-2">
              {project.category} · {project.year}
            </p>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 p-6 md:p-12">
          
          {/* Left: Case Study Copy */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">The Challenge</p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">The Solution</p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">{project.solution}</p>
            </div>

            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 px-6 py-3 bg-white text-black text-xs md:text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors shadow-lg"
              >
                View Live <ExternalLink size={16} />
              </a>
            )}
          </div>

          {/* Right: Meta Info Sidebar */}
          <div className="flex flex-col gap-8 md:border-l md:border-white/10 md:pl-10">
            
            {/* Info */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Client</p>
                <p className="text-white text-sm font-mono">{project.client}</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Role</p>
                <p className="text-white text-sm font-mono">{project.role}</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Year</p>
                <p className="text-white text-sm font-mono">{project.year}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-medium text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Highlights</p>
              <div className="flex flex-col gap-3">
                {project.results.map((r) => (
                  <div key={r.label} className="flex justify-between items-baseline border-b border-white/5 pb-2">
                    <span className="text-gray-500 text-xs uppercase tracking-wider">{r.label}</span>
                    <span className="text-white text-sm font-bold font-mono">{r.value}</span>
                  </div>
                ))}
              </div>
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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const handleNext = () => {
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* --- CASE STUDY MODAL --- */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <CaseStudyModal 
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>

    </section>
  );
};

export default Work;