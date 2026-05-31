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
   <script async="async" data-cfasync="false" src="https://pl29602072.effectivecpmnetwork.com/9345448e07685198efa511951caeb991/invoke.js"></script>
<div id="container-9345448e07685198efa511951caeb991"></div>

    <script>
      <script>
  atOptions = {
    'key' : '552d6ea1254e9e00e9fa39e6dd144509',
    'format' : 'iframe',
    'height' : 60,
    'width' : 468,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/552d6ea1254e9e00e9fa39e6dd144509/invoke.js"></script>

  atOptions = {
    'key' : '552d6ea1254e9e00e9fa39e6dd144509',
    'format' : 'iframe',
    'height' : 60,
    'width' : 468,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/552d6ea1254e9e00e9fa39e6dd144509/invoke.js"></script>

<meta name="google-site-verification" content="eSTHTvGHIOtQW35ieoaJ0WTSIiqrDlokaHYB94BDvLQ" />
    <meta charset="UTF-8" />
    <link rel="icon" type="image/jpeg" href="data:image/jpeg;base64,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" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Hanan Irfan is a Full Stack Developer, Graphic Designer, and AI Expert. View my portfolio, services, and blog." />
    <link rel="apple-touch-icon" href="/favicon.ico" />
    <title>Hanan Irfan | Full Stack Developer & Graphic Designer Portfolio</title>
    <style>
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    </style>
