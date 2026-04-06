import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase, Project } from '../lib/supabase';
import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { Trash2 } from 'lucide-react';

export function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
    } else if (isAdmin) {
      fetchProjects();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.from('projects').insert([
        {
          title,
          description,
          category,
          image_url: imageUrl,
          live_url: liveUrl,
        }
      ]);

      if (error) throw error;
      
      setMessage('Project added successfully!');
      setTitle('');
      setDescription('');
      setImageUrl('');
      setLiveUrl('');
      fetchProjects();
    } catch (error: any) {
      setMessage(error.message || 'Error adding project. Make sure the "projects" table exists in Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      fetchProjects();
    } catch (error: any) {
      setMessage(error.message || 'Error deleting project.');
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <>
      <SEO title="Admin Dashboard" description="Admin only area" />
      <Section id="admin" className="pt-32">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-slate-400">Welcome back, Hanan. Manage your portfolio projects here.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Project Form */}
          <div className="lg:col-span-1 glass-card p-6 h-fit">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Project</h2>
            
            {message && (
              <div className="p-4 mb-6 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-cyan-300 text-sm">
                {message}
              </div>
            )}

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none">
                  <option>Web Development</option>
                  <option>Graphic Design</option>
                  <option>AI/ML</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Image URL</label>
                <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Live URL (Optional)</label>
                <input type="url" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-500 transition-colors">
                {loading ? 'Adding...' : 'Add Project'}
              </button>
            </form>
          </div>

          {/* Project List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Manage Projects</h2>
            <div className="space-y-4">
              {projects.length === 0 ? (
                <div className="glass-card p-8 text-center text-slate-400">No projects found.</div>
              ) : (
                projects.map(project => (
                  <div key={project.id} className="glass-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={project.image_url} alt={project.title} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h3 className="text-white font-bold">{project.title}</h3>
                        <p className="text-sm text-slate-400">{project.category}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(project.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
