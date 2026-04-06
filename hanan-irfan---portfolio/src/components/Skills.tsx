import { Section } from './ui/Section';

export function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion', 'Redux'],
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB'],
    },
    {
      title: 'AI / ML',
      skills: ['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Computer Vision', 'NLP'],
    },
    {
      title: 'Design & Tools',
      skills: ['Figma', 'Adobe Photoshop', 'Illustrator', 'MS Office', 'Git', 'Docker'],
    },
  ];

  return (
    <Section id="skills">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          A comprehensive toolkit spanning across the entire stack, from pixel-perfect interfaces to intelligent algorithms.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, i) => (
          <div key={i} className="glass-card p-6 hover-lift">
            <h3 className="text-xl font-semibold text-white mb-6 pb-4 border-b border-slate-700/50">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, j) => (
                <span
                  key={j}
                  className="px-3 py-1.5 bg-slate-800/80 text-slate-300 text-sm rounded-lg border border-slate-700/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
