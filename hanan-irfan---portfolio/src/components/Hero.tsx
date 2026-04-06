import { motion } from 'motion/react';
import { ArrowRight, Code, Sparkles, Paintbrush } from 'lucide-react';
import { PROFILE_IMAGE } from '../assets/profileImage';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Hero() {
  const [text, setText] = useState('');
  const fullText = "Hanan Irfan";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-cyan-500/30 text-cyan-300 text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight min-h-[120px] md:min-h-[160px]"
          >
            Hi, I'm <br />
            <span className="text-gradient">{text}</span>
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-1 align-middle"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-slate-400 font-medium mb-8 max-w-lg leading-relaxed"
          >
            Building AI-powered digital experiences. I blend code, design, and intelligence to create products that stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <span className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-sm text-slate-300 flex items-center gap-2 hover:border-cyan-500/50 transition-colors cursor-default">
              <Sparkles size={16} className="text-cyan-400" /> Developer
            </span>
            <span className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-sm text-slate-300 flex items-center gap-2 hover:border-blue-500/50 transition-colors cursor-default">
              <Code size={16} className="text-blue-400" /> Full Stack
            </span>
            <span className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-sm text-slate-300 flex items-center gap-2 hover:border-purple-500/50 transition-colors cursor-default">
              <Paintbrush size={16} className="text-purple-400" /> Graphic Design
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="/portfolio"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-1"
            >
              View Projects <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full glass text-white font-semibold flex items-center justify-center gap-2 hover:bg-slate-800/80 transition-all hover:-translate-y-1"
            >
              Hire Me
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Image & Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative hidden lg:flex justify-center items-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          
          <div className="relative w-80 h-80 xl:w-96 xl:h-96 rounded-3xl overflow-hidden border-2 border-slate-700/50 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="absolute inset-0 bg-slate-900/20 z-10 hover:bg-transparent transition-colors duration-300" />
            <img 
              src={PROFILE_IMAGE} 
              alt="Hanan Irfan" 
              className="w-full h-full object-cover"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>

          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 glass-card p-4 rounded-2xl border-cyan-500/30 shadow-lg"
          >
            <div className="text-cyan-400 font-bold text-xl">18</div>
            <div className="text-slate-400 text-xs">Years Old</div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 glass-card p-4 rounded-2xl border-blue-500/30 shadow-lg"
          >
            <div className="text-blue-400 font-bold text-xl">KFUEIT</div>
            <div className="text-slate-400 text-xs">4th Semester</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
