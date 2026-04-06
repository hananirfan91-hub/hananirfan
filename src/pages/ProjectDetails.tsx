import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, Project } from '../lib/supabase';
import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
      if (data) setProject(data);
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center text-white">Project not found.</div>;

  return (
    <>
      <SEO title={`${project.title} | Portfolio`} description={project.description} />
      <Section id="project-details" className="pt-32">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Portfolio
        </Link>
        
        <div className="glass-card overflow-hidden mb-12 rounded-2xl">
          <img src={project.image_url} alt={project.title} className="w-full max-h-[600px] object-cover" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm border border-cyan-500/30">
                {project.category}
              </span>
              {project.tags?.map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4">Project Links</h3>
              <div className="space-y-4">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors">
                    <ExternalLink size={20} /> Live Preview
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors">
                    <Github size={20} /> Source Code
                  </a>
                )}
                {!project.live_url && !project.github_url && (
                  <p className="text-slate-500 text-sm">No external links available.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {project.additional_images && project.additional_images.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">Gallery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.additional_images.map((img, i) => (
                <div key={i} className="glass-card overflow-hidden rounded-xl">
                  <img src={img} alt={`${project.title} gallery ${i + 1}`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
