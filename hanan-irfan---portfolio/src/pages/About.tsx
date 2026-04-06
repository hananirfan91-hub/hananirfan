import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { Experience } from '../components/Experience';
import { Skills } from '../components/Skills';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Zap } from 'lucide-react';

export function About() {
  return (
    <>
      <SEO 
        title="About Me" 
        description="Learn more about Hanan Irfan, a passionate Full Stack Developer, Graphic Designer, and Vibe Coder." 
      />
      
      {/* Section 1: Hero About */}
      <Section id="about-hero" className="pt-32 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          About <span className="text-gradient">Hanan Irfan</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          I am an 18-year-old multidisciplinary creator and a 4th-semester student at KFUEIT in RYK, blending the logical world of Full Stack Development with the creative realm of Graphic Design. I build digital experiences that are not only functional but visually stunning.
        </p>
      </Section>

      {/* Section 2: My Philosophy */}
      <Section id="about-philosophy" className="bg-slate-900/30">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 hover-lift">
            <Code className="text-cyan-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-3">Clean Code</h3>
            <p className="text-slate-400">Writing maintainable, scalable, and optimized code is my priority. I believe in architecture that stands the test of time.</p>
          </div>
          <div className="glass-card p-8 hover-lift">
            <Palette className="text-purple-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-3">Pixel Perfect</h3>
            <p className="text-slate-400">Design is not just how it looks, but how it works. I craft intuitive and engaging user interfaces.</p>
          </div>
          <div className="glass-card p-8 hover-lift">
            <Zap className="text-yellow-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-3">Vibe Coding</h3>
            <p className="text-slate-400">Bringing energy and flow state into development. Rapid prototyping and delivering high-quality results fast.</p>
          </div>
        </div>
      </Section>

      {/* Section 3: Skills */}
      <Skills />

      {/* Section 4: Experience / Journey */}
      <Experience />

      {/* Section 5: Personal Interests */}
      <Section id="about-interests">
        <div className="glass-card p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Beyond the Screen</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            When I'm not coding or designing, I'm exploring the latest in AI, managing YouTube automation channels, and mastering MS Office tools to streamline workflows.
          </p>
        </div>
      </Section>

      {/* Section 6: CTA */}
      <Section id="about-cta" className="text-center pb-32">
        <h2 className="text-3xl font-bold text-white mb-6">Want to know more?</h2>
        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-800 text-white font-semibold border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all hover-glow">
          Download Resume <ArrowRight size={18} />
        </Link>
      </Section>
    </>
  );
}
