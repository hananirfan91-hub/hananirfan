import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { About as AboutSection } from '../components/About';
import { Projects as ProjectsSection } from '../components/Projects';
import { Section } from '../components/ui/Section';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

export function Home() {
  return (
    <>
      <SEO 
        title="Full Stack Developer & Graphic Designer Portfolio" 
        description="Hanan Irfan - Developer, Full Stack Developer, Graphic Designer, Vibe Coder, and YouTube Automation Expert." 
      />
      
      {/* Section 1: Hero */}
      <Hero />
      
      {/* Section 2: About Snippet */}
      <AboutSection />
      
      {/* Section 3: Featured Services */}
      <Section id="home-services" className="bg-slate-900/30" animation="slide-left">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Expertise</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Delivering top-tier solutions across multiple domains.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {['Full Stack Development', 'Graphic Design', 'YouTube Automation'].map((service, i) => (
            <div key={i} className="glass-card p-8 text-center hover-lift">
              <h3 className="text-xl font-bold text-white mb-3">{service}</h3>
              <p className="text-slate-400 mb-6">Advanced, modern, and stylish execution tailored to your needs.</p>
              <Link to="/services" className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-2">
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 4: Featured Projects */}
      <ProjectsSection />

      {/* Section 5: Testimonials / Stats */}
      <Section id="home-stats" animation="scale-up">
        <div className="glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {[
              { label: 'Projects Delivered', value: '50+' },
              { label: 'Happy Clients', value: '30+' },
              { label: 'Years Experience', value: '4+' },
              { label: 'Lines of Code', value: '1M+' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Section 5.5: Frequently Asked Questions */}
      <Section id="home-faq" className="bg-slate-900/40" animation="slide-right">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">
              Common questions about my development process, freelance services, and technical stack.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6 md:p-8 text-left">
              <h3 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">What technologies do you use for Full Stack Web Development?</h3>
              <p className="text-slate-400 leading-relaxed">
                My primary technology stack revolves around the modern JavaScript ecosystem. For frontend development, I exclusively use React.js and Next.js, meticulously styled with Tailwind CSS and animated using Framer Motion. This ensures lightening fast load times and an incredibly engaging user interface. For the backend, I leverage Node.js for custom server-side logic and heavily rely on Supabase (PostgreSQL) for scalable, secure database architecture and real-time data synchronization.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 text-left">
              <h3 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">How do you approach a new graphic design project?</h3>
              <p className="text-slate-400 leading-relaxed">
                I believe that excellent graphic design is rooted deeply in psychology and clear communication. Every design project begins with a comprehensive discovery phase where I try to understand the exact target demographic, the core brand identity, and the precise business goals. I begin with low-fidelity wireframing and mood boarding, eventually moving into high-fidelity UI/UX design using industry-standard tools like Figma and Adobe Illustrator. I prioritize accessibility and intuitive user journeys over pure aesthetics.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 text-left">
              <h3 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">What exactly is "Vibe Coding" and how does it benefit clients?</h3>
              <p className="text-slate-400 leading-relaxed">
                "Vibe Coding" is a modern development philosophy where developers enter an uninterrupted state of intense mental flow. Instead of spending weeks in rigid, corporate planning meetings drafting UML diagrams, I focus on rapid, intuitive prototyping. By leveraging AI-assisted coding tools and relying on deep, internalized engineering experience, I can build functional Minimum Viable Products (MVPs) in a fraction of the time. This drastically reduces overall development costs for my clients while delivering highly functional software much faster to the market.
              </p>
            </div>

            <div className="glass-card p-6 md:p-8 text-left">
              <h3 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">What is included in your YouTube Automation services?</h3>
              <p className="text-slate-400 leading-relaxed">
                Running a highly profitable YouTube channel in 2026 requires rigorous systems, not just sporadic video uploads. My YouTube Automation services encompass the entire content creation pipeline. I provide highly orchestrated workflows including AI-accelerated script generation tailored for high audience retention, dynamic video editing pipelines that utilize motion graphics, meticulously A/B tested thumbnail design methodologies, and rigorous SEO metadata optimization to systematically manipulate the YouTube recommendation algorithm for maximum organic traffic and revenue generation.
              </p>
            </div>
            
            <div className="glass-card p-6 md:p-8 text-left">
              <h3 className="text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">Do you take on international freelance clients?</h3>
              <p className="text-slate-400 leading-relaxed">
                Yes, absolutely. Despite being based in Pakistan and currently pursuing my studies at KFUEIT, I work completely asynchronously with international clients spanning multiple time zones across North America, Europe, and the Middle East. I maintain incredibly strict communication protocols, ensuring my clients are always updated on project milestones. Code quality and delivery deadlines are universally respected, completely independent of geographic location.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 6: CTA */}
      <Section id="home-cta" className="text-center" animation="fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to start your next project?</h2>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Let's collaborate to build something extraordinary. From vibe coding to full-stack architecture.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-1">
          Get in Touch <ArrowRight size={18} />
        </Link>
      </Section>
    </>
  );
}
