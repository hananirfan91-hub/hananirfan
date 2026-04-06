import { Section } from './ui/Section';
import { ExternalLink, ArrowRight } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: 'Nexus AI - Content Generator',
      desc: 'An intelligent platform that generates high-quality marketing copy and blog posts using fine-tuned LLMs.',
      image: 'https://picsum.photos/seed/ai1/800/600?blur=2',
      tags: ['React', 'Python', 'OpenAI', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Visionary - Image Analysis',
      desc: 'Computer vision dashboard for real-time object detection and classification in manufacturing pipelines.',
      image: 'https://picsum.photos/seed/vision/800/600?blur=2',
      tags: ['TypeScript', 'PyTorch', 'Django', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'FinTech Analytics Platform',
      desc: 'A comprehensive financial dashboard with predictive charting and real-time data visualization.',
      image: 'https://picsum.photos/seed/finance/800/600?blur=2',
      tags: ['Next.js', 'Node.js', 'D3.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'E-Commerce AI Recommender',
      desc: 'Smart recommendation engine integrated into a modern e-commerce storefront, boosting sales by 25%.',
      image: 'https://picsum.photos/seed/ecommerce/800/600?blur=2',
      tags: ['React', 'Express', 'TensorFlow', 'Redis'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  return (
    <Section id="projects">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            A selection of my recent work in AI, web development, and full-stack architecture.
          </p>
        </div>
        <a href="/portfolio" className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2 transition-colors">
          View all Projects <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <div key={i} className="glass-card overflow-hidden group hover-lift">
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-slate-400 mb-6 line-clamp-2">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, j) => (
                  <span key={j} className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a href={project.liveUrl} className="flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors">
                  <ExternalLink size={16} /> Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
