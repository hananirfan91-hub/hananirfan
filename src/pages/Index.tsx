import { Link } from "react-router-dom";
import { ArrowRight, Code, Palette, Brain, ChevronDown, Sparkles, Rocket, ExternalLink, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectCard } from "@/components/ProjectCard";
import { ParticleBackground } from "@/components/ParticleBackground";
import { LiveActivity } from "@/components/LiveActivity";
import { TypeWriter } from "@/components/TypeWriter";
import { GlowingOrb } from "@/components/GlowingOrb";
import profileImage from "@/assets/profile-cropped.png";
import projectBabarazam from "@/assets/project-babarazam.jpg";
import projectHadith from "@/assets/project-hadith.jpg";
import projectQuickwork from "@/assets/project-quickwork.jpg";

const skills = [
  { icon: Code, label: "Web Development", description: "React, TypeScript, Modern CSS", color: "from-blue-500 to-cyan-400" },
  { icon: Brain, label: "AI Development", description: "Machine Learning, Python", color: "from-purple-500 to-pink-500" },
  { icon: Palette, label: "Graphic Design", description: "UI/UX, Brand Identity", color: "from-orange-500 to-yellow-500" },
];

const featuredProjects = [
  {
    title: "Babar Azam Tribute",
    description: "A tribute website dedicated to Pakistan's cricket star Babar Azam, featuring stats, gallery, and fan community.",
    image: projectBabarazam,
    link: "https://babarazam.lovable.app/",
    tags: ["React", "Design", "Sports"],
  },
  {
    title: "Hadith Wisdom Hub",
    description: "An Islamic knowledge platform providing authenticated Hadith collections with beautiful presentation and search.",
    image: projectHadith,
    link: "https://hadithwisdomhub.lovable.app/",
    tags: ["React", "API", "Education"],
  },
  {
    title: "QuickWork IT Center",
    description: "Professional IT services website for computer repairs, web development, and tech solutions.",
    image: projectQuickwork,
    link: "https://quickworkitcenter.lovable.app/",
    tags: ["Business", "Services", "Web"],
  },
];

const stats = [
  { value: "3+", label: "Live Projects" },
  { value: "50+", label: "Happy Clients" },
  { value: "2+", label: "Years Experience" },
  { value: "100%", label: "Dedication" },
];

const Index = () => {
  return (
    <Layout>
      <ParticleBackground />
      <LiveActivity />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Orbs */}
        <GlowingOrb className="top-1/4 left-1/4" size="lg" color="navy" delay={0} />
        <GlowingOrb className="bottom-1/4 right-1/4" size="md" color="accent" delay={2} />
        <GlowingOrb className="top-1/2 right-1/3" size="sm" color="primary" delay={4} />

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/20 to-navy/20 text-accent rounded-full text-sm font-medium border border-accent/30 backdrop-blur-sm">
                  <Sparkles size={14} className="animate-pulse" />
                  CS Student • AI Developer • Designer
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Hi, I'm{" "}
                  <span className="text-gradient bg-gradient-to-r from-accent via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                    Hanan Irfan
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-lg"
              >
                <TypeWriter
                  words={[
                    "Building innovative digital experiences",
                    "Creating AI-powered solutions",
                    "Designing stunning interfaces",
                    "Studying at KFUEIT",
                  ]}
                  className="font-medium"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link
                  to="/projects"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-blue-500 hover:from-accent/90 hover:to-blue-400 text-accent-foreground rounded-xl font-medium transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-1"
                >
                  <Rocket size={18} className="group-hover:rotate-12 transition-transform" />
                  View Projects
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary/50 hover:bg-secondary text-secondary-foreground rounded-xl font-medium transition-all duration-300 border border-border hover:border-accent/50 backdrop-blur-sm hover:-translate-y-1"
                >
                  Get in Touch
                </Link>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/50"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="flex justify-center relative"
            >
              {/* Spinning Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-72 h-72 md:w-88 md:h-88 lg:w-[420px] lg:h-[420px] rounded-full border border-dashed border-accent/30"
                />
              </div>
              
              {/* Glowing Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-radial from-accent/30 via-primary/20 to-transparent rounded-full blur-2xl animate-pulse" />
              </div>

              {/* Profile Container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-accent/50 shadow-2xl shadow-accent/30"
              >
                <img
                  src={profileImage}
                  alt="Hanan Irfan - Computer Science student and developer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-4 p-3 bg-card/80 backdrop-blur-sm rounded-xl border border-border shadow-lg"
              >
                <Code className="text-accent" size={24} />
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-0 p-3 bg-card/80 backdrop-blur-sm rounded-xl border border-border shadow-lg"
              >
                <Brain className="text-purple-400" size={24} />
              </motion.div>
              <motion.div
                animate={{ y: [-5, 15, -5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute bottom-0 right-10 p-3 bg-card/80 backdrop-blur-sm rounded-xl border border-border shadow-lg"
              >
                <Palette className="text-orange-400" size={24} />
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Scroll to explore</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className="text-accent" size={28} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <motion.a
              href="https://692093f818c89.site123.me/articles/how-hanan-irfan-and-quickworks-it-center-are-empowering-small-businesses-in-the-digital-age"
              target="_blank"
              rel="noopener noreferrer"
              className="group block max-w-4xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-card via-card to-secondary/50 border border-border hover:border-accent/50 transition-all duration-500 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/20 to-navy/20 border border-accent/30">
                    <Newspaper className="text-accent" size={32} />
                  </div>
                  
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full mb-4">
                      FEATURED ARTICLE
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                      How Hanan Irfan and QuickWorks IT Center Are Empowering Small Businesses in the Digital Age
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Technology is a tool for human progress. Our job is to make sure that tool is sharp, reliable, and in the right hands.
                    </p>
                    <span className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                      Read the full article
                      <ExternalLink size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4"
            >
              My Expertise
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What I Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combining technical expertise with creative vision to deliver exceptional results.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <AnimatedSection key={skill.label} delay={index * 150}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative p-8 rounded-3xl bg-gradient-to-br from-card to-secondary/30 border border-border hover:border-accent/50 transition-all duration-500 overflow-hidden"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-accent/5 to-transparent" />
                    
                    <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${skill.color} p-4 shadow-lg`}>
                      <Icon className="text-white w-full h-full" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{skill.label}</h3>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4"
              >
                My Work
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl">
                A selection of my recent work spanning web development and design.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group"
            >
              View All
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 100}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <ProjectCard {...project} />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/30 via-primary/20 to-navy/30" />
        <GlowingOrb className="top-0 left-1/4" size="lg" color="accent" delay={0} />
        <GlowingOrb className="bottom-0 right-1/4" size="md" color="navy" delay={2} />
        
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-accent text-sm font-medium mb-6"
            >
              <Sparkles size={14} />
              Ready to collaborate?
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Let's Build Something{" "}
              <span className="text-gradient">Amazing</span> Together
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Have a project in mind? I'd love to hear about it and discuss how we can work together.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-accent to-blue-500 hover:from-accent/90 hover:to-blue-400 text-accent-foreground rounded-2xl font-medium text-lg transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/50"
              >
                Start a Conversation
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
