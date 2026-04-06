import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { Monitor, PenTool, Youtube, FileSpreadsheet, Sparkles, Server } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: <Monitor size={40} className="text-blue-400" />,
      title: "Full Stack Development",
      desc: "End-to-end web applications using React, Node.js, and Supabase. Scalable, secure, and blazing fast.",
      features: ["Custom Web Apps", "API Development", "Database Design", "Performance Optimization"]
    },
    {
      icon: <PenTool size={40} className="text-purple-400" />,
      title: "Graphic Design",
      desc: "Striking visual identities, UI/UX design, and marketing materials that capture attention.",
      features: ["Logo Design", "UI/UX Wireframing", "Social Media Posts", "Brand Identity"]
    },
    {
      icon: <Youtube size={40} className="text-red-400" />,
      title: "YouTube Automation",
      desc: "Setting up and managing automated content pipelines for YouTube channels to maximize growth.",
      features: ["Script Generation", "Video Editing Pipelines", "Thumbnail Design", "SEO Optimization"]
    },
    {
      icon: <FileSpreadsheet size={40} className="text-green-400" />,
      title: "MS Office Expert",
      desc: "Advanced data analysis, automated spreadsheets, and professional presentations.",
      features: ["Excel Macros/VBA", "Data Visualization", "PowerPoint Pitch Decks", "Word Formatting"]
    },
    {
      icon: <Sparkles size={40} className="text-cyan-400" />,
      title: "Vibe Coder",
      desc: "Rapid prototyping and bringing ideas to life with modern AI tools and flow-state development.",
      features: ["MVP Development", "AI Integration", "Rapid Prototyping", "Creative Coding"]
    },
    {
      icon: <Server size={40} className="text-orange-400" />,
      title: "Backend & Cloud",
      desc: "Robust server architectures and cloud deployments ensuring 99.9% uptime.",
      features: ["Supabase / Firebase", "AWS / GCP", "Serverless Functions", "Security Audits"]
    }
  ];

  return (
    <>
      <SEO 
        title="Services" 
        description="Professional services by Hanan Irfan: Full Stack Development, Graphic Design, YouTube Automation, MS Office, and more." 
      />
      
      {/* Section 1: Hero */}
      <Section id="services-hero" className="pt-32 pb-12 text-center" animation="fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          My <span className="text-gradient">Services</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Comprehensive digital solutions tailored to elevate your brand and streamline your operations.
        </p>
      </Section>

      {/* Section 2 & 3: Services Grid */}
      <Section id="services-grid" animation="fade-up">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="glass-card p-8 hover-lift flex flex-col h-full">
              <div className="mb-6 bg-slate-800/50 w-20 h-20 rounded-2xl flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 mb-6 flex-grow">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 4: Workflow */}
      <Section id="services-workflow" className="bg-slate-900/30" animation="slide-right">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">How I Work</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            { step: '01', title: 'Discovery', desc: 'Understanding your goals and requirements.' },
            { step: '02', title: 'Strategy', desc: 'Planning the architecture and design.' },
            { step: '03', title: 'Execution', desc: 'Building and designing with precision.' },
            { step: '04', title: 'Delivery', desc: 'Testing, deployment, and handover.' },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="text-5xl font-black text-slate-800 mb-4">{item.step}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 5: Pricing / Packages (Placeholder) */}
      <Section id="services-pricing" animation="scale-up">
        <div className="glass-card p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Custom Packages Available</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            Every project is unique. Contact me for a custom quote tailored specifically to your needs and budget.
          </p>
        </div>
      </Section>

      {/* Section 6: CTA */}
      <Section id="services-cta" className="text-center pb-32" animation="fade-in">
        <h2 className="text-4xl font-bold text-white mb-8">Let's discuss your project</h2>
        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-1">
          Get a Quote
        </a>
      </Section>
    </>
  );
}
