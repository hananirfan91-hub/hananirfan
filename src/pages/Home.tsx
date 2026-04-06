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
        title="Home" 
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
