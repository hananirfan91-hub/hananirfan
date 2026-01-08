import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectCard } from "@/components/ProjectCard";
import { CommunityProjects } from "@/components/CommunityProjects";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Sparkles, Rocket } from "lucide-react";
import projectBabarazam from "@/assets/project-babarazam.jpg";
import projectHadith from "@/assets/project-hadith.jpg";
import projectQuickwork from "@/assets/project-quickwork.jpg";

const projects = [
  {
    title: "Babar Azam Tribute",
    description: "A comprehensive tribute website dedicated to Pakistan's cricket sensation Babar Azam. Features include career statistics, photo gallery, match highlights, and an interactive fan community section. Built with modern web technologies for optimal performance.",
    image: projectBabarazam,
    link: "https://babarazam.lovable.app/",
    tags: ["React", "Tailwind CSS", "Sports", "Fan Site"],
  },
  {
    title: "Hadith Wisdom Hub",
    description: "An Islamic knowledge platform providing authenticated Hadith collections from major books including Sahih Bukhari and Sahih Muslim. Features beautiful typography, search functionality, and categorized browsing for spiritual learning.",
    image: projectHadith,
    link: "https://hadithwisdomhub.lovable.app/",
    tags: ["React", "API Integration", "Education", "Islamic"],
  },
  {
    title: "QuickWork IT Center",
    description: "Professional business website for QuickWork IT Center, offering computer repair services, web development, and tech solutions. Includes service listings, contact forms, and testimonials section for the local community.",
    image: projectQuickwork,
    link: "https://quickworkitcenter.lovable.app/",
    tags: ["Business", "Services", "Web Design", "Local"],
  },
];

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Projects by Hanan Irfan | Web Development Portfolio - Rahim Yar Khan</title>
        <meta
          name="description"
          content="Explore web development projects by Hanan Irfan including Babar Azam Tribute, Hadith Wisdom Hub, QuickWork IT Center. React, TypeScript, modern web apps."
        />
        <meta
          name="keywords"
          content="Hanan Irfan projects, web development Pakistan, React portfolio, Babar Azam website, QuickWork IT Center"
        />
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6"
              >
                <Sparkles size={16} className="animate-pulse" />
                Portfolio
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                My <span className="text-gradient">Projects</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                A collection of web applications and designs I've created, showcasing my skills 
                in development, design, and problem-solving.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <AnimatedSection key={project.title} delay={index * 100}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Community Projects Section */}
        <CommunityProjects />

        {/* More Projects Coming */}
        <section className="py-20 bg-gradient-to-r from-accent/5 via-transparent to-accent/5">
          <div className="container mx-auto px-6">
            <AnimatedSection className="text-center max-w-2xl mx-auto">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block p-4 bg-accent/10 rounded-2xl mb-6"
              >
                <Rocket className="text-accent" size={32} />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">More Projects Coming Soon</h2>
              <p className="text-muted-foreground">
                I'm constantly working on new projects and exploring different technologies. 
                Check back soon for more updates, or follow me on social media to stay informed.
              </p>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Projects;
