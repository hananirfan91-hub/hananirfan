import { Section } from './ui/Section';
import { Briefcase, GraduationCap } from 'lucide-react';

export function Experience() {
  const timeline = [
    {
      type: 'work',
      title: 'Developer',
      org: 'TechNova Solutions',
      date: '2024 - Present',
      desc: 'Leading the integration of LLMs into enterprise SaaS products. Developed custom RAG pipelines and optimized model inference.',
    },
    {
      type: 'work',
      title: 'Full Stack Developer',
      org: 'Freelance',
      date: '2022 - 2024',
      desc: 'Built and delivered over 20+ web applications for international clients using React, Node.js, and Tailwind CSS.',
    },
    {
      type: 'edu',
      title: 'BS Computer Science',
      org: 'University Name',
      date: '2019 - 2023',
      desc: 'Specialized in Artificial Intelligence and Machine Learning. Graduated with honors.',
    },
    {
      type: 'work',
      title: 'Graphic Designer',
      org: 'Creative Agency',
      date: '2020 - 2022',
      desc: 'Designed brand identities, marketing materials, and UI/UX wireframes for various startups.',
    },
  ];

  return (
    <Section id="experience">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Journey</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          My professional and educational timeline.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="relative border-l border-slate-700/50 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2 space-y-12">
          {timeline.map((item, i) => (
            <div key={i} className={`relative flex flex-col md:flex-row items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-[-21px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full glass flex items-center justify-center z-10 border-cyan-500/30 text-cyan-400">
                {item.type === 'work' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
              </div>

              {/* Content */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}>
                <div className="glass-card p-6 hover-lift">
                  <span className="text-sm font-medium text-cyan-400 mb-2 block">{item.date}</span>
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <h4 className="text-slate-300 font-medium mb-4">{item.org}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
