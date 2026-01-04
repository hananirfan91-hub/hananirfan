import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GraduationCap, MapPin, Calendar, Code, Palette, Brain, Award } from "lucide-react";
import profileImage from "@/assets/profile.png";

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Khwaja Fareed University of Engineering and Information Technology (KFUEIT)",
    location: "Rahim Yar Khan, Pakistan",
    period: "Current",
    icon: GraduationCap,
  },
];

const skills = {
  development: ["React.js", "TypeScript", "JavaScript", "Python", "HTML/CSS", "Tailwind CSS", "Node.js", "Git"],
  design: ["UI/UX Design", "Graphic Design", "Adobe Creative Suite", "Figma", "Brand Identity", "Motion Graphics"],
  ai: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "TensorFlow", "PyTorch"],
};

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <AnimatedSection className="flex justify-center md:order-2" animation="scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-navy/20 rounded-3xl blur-2xl scale-105" />
                <div className="relative w-72 h-96 md:w-80 md:h-[28rem] rounded-3xl overflow-hidden border border-navy/50 glow-md">
                  <img
                    src={profileImage}
                    alt="Hanan Irfan - Computer Science student at KFUEIT"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Content */}
            <div className="space-y-6 md:order-1">
              <AnimatedSection>
                <span className="inline-block px-4 py-2 bg-navy/20 text-accent rounded-full text-sm font-medium border border-navy/30">
                  About Me
                </span>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Hanan <span className="text-gradient">Irfan</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin size={16} className="text-accent" />
                    Rahim Yar Khan, Pakistan
                  </span>
                  <span className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-accent" />
                    KFUEIT
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a passionate Computer Science student at Khwaja Fareed University of Engineering 
                  and Information Technology (KFUEIT), combining my love for technology with creative design. 
                  My journey in tech spans across AI development, web development, and graphic design, 
                  allowing me to create comprehensive digital solutions.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding or designing, you'll find me exploring the latest in artificial 
                  intelligence, contributing to open-source projects, or sharing knowledge through 
                  my social media platforms. I believe in continuous learning and pushing the 
                  boundaries of what's possible with technology.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Building a strong foundation in computer science and technology.
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {education.map((edu, index) => {
              const Icon = edu.icon;
              return (
                <AnimatedSection key={edu.degree} delay={index * 100}>
                  <div className="border-gradient rounded-2xl p-8 bg-card">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-xl bg-navy/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-accent" size={24} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-accent font-medium">{edu.institution}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <MapPin size={14} />
                            {edu.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar size={14} />
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A diverse skill set spanning development, design, and artificial intelligence.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Development */}
            <AnimatedSection>
              <div className="border-gradient rounded-2xl p-8 bg-card h-full">
                <div className="w-14 h-14 rounded-xl bg-navy/30 flex items-center justify-center mb-6">
                  <Code className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Development</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.development.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Design */}
            <AnimatedSection delay={100}>
              <div className="border-gradient rounded-2xl p-8 bg-card h-full">
                <div className="w-14 h-14 rounded-xl bg-navy/30 flex items-center justify-center mb-6">
                  <Palette className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Design</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.design.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* AI */}
            <AnimatedSection delay={200}>
              <div className="border-gradient rounded-2xl p-8 bg-card h-full">
                <div className="w-14 h-14 rounded-xl bg-navy/30 flex items-center justify-center mb-6">
                  <Brain className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI & Machine Learning</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.ai.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
