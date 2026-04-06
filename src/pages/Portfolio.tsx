import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { supabase, Project } from '../lib/supabase';
import { ExternalLink } from 'lucide-react';

export function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      if (data) setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to empty array if table doesn't exist yet
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Web Development', 'Graphic Design', 'AI/ML', 'Other'];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <>
      <SEO 
        title="Portfolio" 
        description="Explore the diverse portfolio of Hanan Irfan, featuring web development, graphic design, and AI projects." 
      />
      
      {/* Section 1: Hero */}
      <Section id="portfolio-hero" className="pt-32 pb-12 text-center" animation="fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          My <span className="text-gradient">Portfolio</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          A showcase of my latest projects, ranging from full-stack web applications to creative graphic designs.
        </p>
      </Section>

      {/* Section 2: Filters */}
      <Section id="portfolio-filters" className="py-4" animation="slide-left">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Section>

      {/* Section 3: Dynamic Projects Grid */}
      <Section id="portfolio-grid" className="pt-0" animation="fade-up">
        {loading ? (
          <div className="text-center text-slate-400 py-20">Loading projects...</div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link to={`/project/${project.id}`} key={project.id} className="glass-card overflow-hidden group hover-lift flex flex-col cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={project.image_url || 'https://picsum.photos/seed/placeholder/800/600'}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-medium text-cyan-400 mb-2">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 mb-6 flex-grow text-sm line-clamp-3">{project.description}</p>
                  
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
          <div className="text-center text-slate-500 py-20 glass-card">
            <p className="text-lg">No projects found for this category.</p>
            <p className="text-sm mt-2">Check back later or login as admin to add some!</p>
          </div>
        )}
      </Section>

      {/* Section 5: Case Studies (Placeholder) */}
      <Section id="portfolio-casestudies" className="bg-slate-900/30" animation="slide-right">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">In-Depth Case Studies</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
            Detailed breakdowns of my most complex projects are coming soon.
          </p>
        </div>
      </Section>

      {/* Section 6: CTA */}
      <Section id="portfolio-cta" className="text-center pb-32" animation="scale-up">
        <h2 className="text-3xl font-bold text-white mb-6">Impressed by what you see?</h2>
        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-1">
          Let's Work Together
        </a>
      </Section>
    </>
  );
}
