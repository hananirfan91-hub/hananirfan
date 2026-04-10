import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { Experience } from '../components/Experience';
import { Skills } from '../components/Skills';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Code, 
  Palette, 
  Zap, 
  Download, 
  Coffee, 
  Target, 
  Globe,
  Sparkles,
  Award,
  Users,
  Clock,
  Heart,
  Mail,
  ChevronRight,
  Star,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  const [counts, setCounts] = useState({ projects: 0, clients: 0, experience: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateValue('projects', 0, 50, 2000);
            animateValue('clients', 0, 30, 2000);
            animateValue('experience', 0, 3, 2000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateValue = (key: string, start: number, end: number, duration: number) => {
    const increment = (end - start) / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCounts(prev => ({ ...prev, [key]: end }));
        clearInterval(timer);
      } else {
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }
    }, 16);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <SEO 
        title="About Hanan Irfan | Full Stack Developer & UI/UX Designer"
        description="18-year-old Full Stack Developer and Graphic Designer from KFUEIT. Specializing in React, Node.js, and creating stunning digital experiences."
        keywords="Hanan Irfan, Full Stack Developer, Graphic Designer, React Developer, Node.js, UI/UX Design, KFUEIT"
      />
      
      {/* Section 1: Hero About */}
      <Section id="about-hero" className="pt-32 pb-16 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
              <Sparkles className="inline w-4 h-4 mr-2" />
              Building Digital Excellence
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About{" "}
            <span className="text-gradient bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Hanan Irfan
            </span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            I am an 18-year-old multidisciplinary creator and a 4th-semester student at KFUEIT in RYK, blending the logical world of Full Stack Development with the creative realm of Graphic Design. I build digital experiences that are not only functional but visually stunning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link 
              to="/projects" 
              className="group px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
            >
              View My Work
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="group px-6 py-3 rounded-full bg-slate-800 text-white font-semibold border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </Section>

      {/* Section 2: Stats Counter */}
      <Section id="about-stats" className="py-16" ref={statsRef}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="glass-card p-8 text-center hover-lift">
            <Briefcase className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2">
              <span className="stat-number">{counts.projects}</span>+
            </div>
            <p className="text-slate-400">Projects Completed</p>
          </div>
          <div className="glass-card p-8 text-center hover-lift">
            <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2">
              <span className="stat-number">{counts.clients}</span>+
            </div>
            <p className="text-slate-400">Happy Clients</p>
          </div>
          <div className="glass-card p-8 text-center hover-lift">
            <Clock className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2">
              <span className="stat-number">{counts.experience}</span>+
            </div>
            <p className="text-slate-400">Years Experience</p>
          </div>
        </motion.div>
      </Section>

      {/* Section 3: My Philosophy */}
      <Section id="about-philosophy" className="py-16 bg-slate-900/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            My <span className="text-gradient">Philosophy</span>
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Code className="text-cyan-400" size={32} />,
              title: "Clean Code",
              description: "Writing maintainable, scalable, and optimized code is my priority. I believe in architecture that stands the test of time.",
              color: "cyan"
            },
            {
              icon: <Palette className="text-purple-400" size={32} />,
              title: "Pixel Perfect",
              description: "Design is not just how it looks, but how it works. I craft intuitive and engaging user interfaces that delight users.",
              color: "purple"
            },
            {
              icon: <Zap className="text-yellow-400" size={32} />,
              title: "Vibe Coding",
              description: "Bringing energy and flow state into development. Rapid prototyping and delivering high-quality results fast.",
              color: "yellow"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-8 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Section 4: What I Do */}
      <Section id="about-services" className="py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            What I <span className="text-gradient">Do</span>
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
            Combining technical expertise with creative vision to deliver exceptional digital solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Full Stack Development",
              description: "Building scalable web applications with React, Node.js, and modern databases. From frontend interfaces to backend APIs.",
              icon: <Globe className="w-6 h-6" />,
              tags: ["React", "Node.js", "MongoDB", "TypeScript"]
            },
            {
              title: "UI/UX Design",
              description: "Creating intuitive and beautiful user interfaces that enhance user experience and drive engagement.",
              icon: <Palette className="w-6 h-6" />,
              tags: ["Figma", "Adobe XD", "Prototyping", "Wireframing"]
            },
            {
              title: "Graphic Design",
              description: "Crafting stunning visual content for brands, social media, and marketing materials that tell your story.",
              icon: <Star className="w-6 h-6" />,
              tags: ["Photoshop", "Illustrator", "Branding", "Social Media"]
            },
            {
              title: "Performance Optimization",
              description: "Optimizing web applications for speed, SEO, and better user experience across all devices.",
              icon: <TrendingUp className="w-6 h-6" />,
              tags: ["SEO", "Web Vitals", "Lazy Loading", "Caching"]
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 hover:border-cyan-500/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section 5: Skills */}
      <Skills />

      {/* Section 6: Experience / Journey */}
      <Experience />

      {/* Section 7: Achievements */}
      <Section id="about-achievements" className="py-16 bg-slate-900/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Achievements & <span className="text-gradient">Recognition</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Award className="w-8 h-8" />, title: "Best Developer Award", desc: "Recognized for outstanding contributions in web development" },
            { icon: <Target className="w-8 h-8" />, title: "100% Client Satisfaction", desc: "Maintained perfect rating across all completed projects" },
            { icon: <Heart className="w-8 h-8" />, title: "Community Contributor", desc: "Active contributor to open-source projects and developer communities" }
          ].map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-cyan-400 mb-4 flex justify-center">{achievement.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
              <p className="text-slate-400 text-sm">{achievement.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section 8: Personal Interests */}
      <Section id="about-interests" className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Coffee className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">Beyond the Screen</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
                When I'm not coding or designing, I'm exploring the latest in AI, managing YouTube automation channels, and mastering MS Office tools to streamline workflows. I believe in continuous learning and pushing the boundaries of what's possible.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {["AI Enthusiast", "Content Creator", "Tech Blogger", "MS Office Expert"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Section 9: CTA */}
      <Section id="about-cta" className="text-center py-16 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Have a project in mind? Let's create something amazing together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/contact" 
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              <Mail size={18} />
              Get In Touch
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-800 text-white font-semibold border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all"
            >
              <Download size={18} />
              Download Resume
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </div>
        </motion.div>
      </Section>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}
