import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectCard } from "@/components/ProjectCard";
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
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-navy/20 text-accent rounded-full text-sm font-medium border border-navy/30 mb-6">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
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
                <ProjectCard {...project} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* More Projects Coming */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">More Projects Coming Soon</h2>
            <p className="text-muted-foreground">
              I'm constantly working on new projects and exploring different technologies. 
              Check back soon for more updates, or follow me on social media to stay informed.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
