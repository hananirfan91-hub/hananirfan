import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Section } from './ui/Section';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);
          
        if (error) throw error;
        if (data) setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Section id="projects">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            A selection of my recent work in AI, web development, and full-stack architecture.
          </p>
        </div>
        <Link to="/portfolio" className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2 transition-colors">
          View all Projects <ArrowRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading featured projects...</div>
      ) : projects.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link to={`/project/${project.id}`} key={project.id} className="glass-card overflow-hidden group hover-lift flex flex-col cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={project.image_url || 'https://picsum.photos/seed/placeholder/800/600'}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 mb-6 line-clamp-2 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags?.slice(0, 4).map((tag, j) => (
                    <span key={j} className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <span className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                    View Details <ExternalLink size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-500 py-12 glass-card">
          <p className="text-lg">No featured projects yet.</p>
        </div>
      )}
    </Section>
  );
}
