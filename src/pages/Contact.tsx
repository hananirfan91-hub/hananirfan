import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { Contact as ContactForm } from '../components/Contact';
import { MessageSquare, Clock, Globe } from 'lucide-react';

export function Contact() {
  return (
    <>
      <SEO 
        title="Contact" 
        description="Get in touch with Hanan Irfan for freelance projects, collaborations, or job opportunities." 
      />
      
      {/* Section 1: Hero */}
      <Section id="contact-hero" className="pt-32 pb-12 text-center" animation="fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Get in <span className="text-gradient">Touch</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Have a project in mind or just want to say hi? I'm always open to discussing new opportunities.
        </p>
      </Section>

      {/* Section 2: Contact Info Cards */}
      <Section id="contact-info" className="py-4" animation="slide-left">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-8 text-center hover-lift">
            <MessageSquare className="text-cyan-400 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Chat with me</h3>
            <p className="text-slate-400">hananirfan91@gmail.com</p>
          </div>
          <div className="glass-card p-8 text-center hover-lift">
            <Globe className="text-purple-400 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Location</h3>
            <p className="text-slate-400">Pakistan (Remote Worldwide)</p>
          </div>
          <div className="glass-card p-8 text-center hover-lift">
            <Clock className="text-yellow-400 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Working Hours</h3>
            <p className="text-slate-400">Flexible / Project-based</p>
          </div>
        </div>
      </Section>

      {/* Section 3: Contact Form Component */}
      <ContactForm />

      {/* Section 4: FAQ */}
      <Section id="contact-faq" className="bg-slate-900/30" animation="slide-right">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: "Are you available for freelance work?", a: "Yes, I am currently accepting new freelance projects." },
            { q: "What is your typical response time?", a: "I usually respond within 24-48 hours." },
            { q: "Do you work with international clients?", a: "Absolutely! I have experience working with clients globally." }
          ].map((faq, i) => (
            <div key={i} className="glass-card p-6">
              <h4 className="text-lg font-bold text-white mb-2">{faq.q}</h4>
              <p className="text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 5: Map / Visual Placeholder */}
      <Section id="contact-map" animation="scale-up">
        <div className="w-full h-64 glass-card rounded-2xl overflow-hidden relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/1200/400')] opacity-20 bg-cover bg-center mix-blend-overlay" />
          <p className="text-2xl font-bold text-slate-500 relative z-10">Based in Pakistan, working globally.</p>
        </div>
      </Section>
    </>
  );
}
