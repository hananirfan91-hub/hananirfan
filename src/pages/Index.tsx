import { Link } from "react-router-dom";
import { ArrowRight, Code, Palette, Brain, ChevronDown } from "lucide-react";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectCard } from "@/components/ProjectCard";
import profileImage from "@/assets/profile.png";
import projectBabarazam from "@/assets/project-babarazam.jpg";
import projectHadith from "@/assets/project-hadith.jpg";
import projectQuickwork from "@/assets/project-quickwork.jpg";

const skills = [
  { icon: Code, label: "Web Development", description: "React, TypeScript, Modern CSS" },
  { icon: Brain, label: "AI Development", description: "Machine Learning, Python" },
  { icon: Palette, label: "Graphic Design", description: "UI/UX, Brand Identity" },
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

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-navy/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 text-center md:text-left">
              <AnimatedSection>
                <span className="inline-block px-4 py-2 bg-navy/20 text-accent rounded-full text-sm font-medium border border-navy/30">
                  CS Student • AI Developer • Designer
                </span>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Hi, I'm{" "}
                  <span className="text-gradient">Hanan Irfan</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                  Building innovative digital experiences through code, AI, and creative design. 
                  Currently studying Computer Science at KFUEIT.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    to="/projects"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-navy-light text-primary-foreground rounded-xl font-medium transition-all duration-300 glow-sm hover:glow-md"
                  >
                    View Projects <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary hover:bg-muted text-secondary-foreground rounded-xl font-medium transition-all duration-300 border border-border"
                  >
                    Get in Touch
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* Profile Image */}
            <AnimatedSection className="flex justify-center" delay={200} animation="scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-navy/20 rounded-full blur-2xl scale-110" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-navy/50 glow-md">
                  <img
                    src={profileImage}
                    alt="Hanan Irfan - Computer Science student and developer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
            <ChevronDown className="text-muted-foreground" size={32} />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combining technical expertise with creative vision to deliver exceptional results.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <AnimatedSection key={skill.label} delay={index * 100}>
                  <div className="border-gradient rounded-2xl p-8 bg-card hover-lift text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-navy/30 flex items-center justify-center">
                      <Icon className="text-accent" size={28} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{skill.label}</h3>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl">
                A selection of my recent work spanning web development and design.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
            >
              View All <ArrowRight size={18} />
            </Link>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 100}>
                <ProjectCard {...project} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-navy">
        <div className="container mx-auto px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Have a project in mind? I'd love to hear about it and discuss how we can work together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-medium text-lg transition-all duration-300 glow-md hover:glow-lg"
            >
              Start a Conversation <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
