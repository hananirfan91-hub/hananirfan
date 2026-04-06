import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase, Project, BlogPost } from '../lib/supabase';
import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { Trash2, Edit2, Upload, X } from 'lucide-react';

export function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form state (Shared)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');

  // Form state (Projects)
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [additionalImageFiles, setAdditionalImageFiles] = useState<FileList | null>(null);
  const [existingAdditionalImages, setExistingAdditionalImages] = useState<string[]>([]);

  // Form state (Blog)
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/');
    } else if (isAdmin) {
      fetchProjects();
      fetchBlogPosts();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  const fetchBlogPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setBlogPosts(data);
  };

  const uploadImage = async (file: File, bucket: string = 'project-images') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleAddOrUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let finalImageUrl = existingImageUrl;
      let finalAdditionalImages = [...existingAdditionalImages];

      if (mainImageFile) {
        finalImageUrl = await uploadImage(mainImageFile);
      } else if (!existingImageUrl && !editingId) {
        throw new Error('Please select a main image.');
      }

      if (additionalImageFiles && additionalImageFiles.length > 0) {
        const uploadPromises = Array.from(additionalImageFiles).map(file => uploadImage(file));
        const newImageUrls = await Promise.all(uploadPromises);
        finalAdditionalImages = [...finalAdditionalImages, ...newImageUrls];
      }

      const projectData = {
        title,
        description,
        category,
        image_url: finalImageUrl,
        live_url: liveUrl,
        github_url: githubUrl,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        additional_images: finalAdditionalImages,
      };

      if (editingId) {
        const { error } = await supabase.from('projects').update(projectData).eq('id', editingId);
        if (error) throw error;
        setMessage('Project updated successfully!');
      } else {
        const { error } = await supabase.from('projects').insert([projectData]);
        if (error) throw error;
        setMessage('Project added successfully!');
      }
      
      resetForm();
      fetchProjects();
    } catch (error: any) {
      setMessage(error.message || 'Error saving project.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let finalImageUrl = existingImageUrl;

      if (mainImageFile) {
        finalImageUrl = await uploadImage(mainImageFile, 'project-images'); // Reusing bucket for simplicity
      }

      const postData = {
        title,
        content,
        image_url: finalImageUrl,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      };

      if (editingId) {
        const { error } = await supabase.from('blog_posts').update(postData).eq('id', editingId);
        if (error) throw error;
        setMessage('Blog post updated successfully!');
      } else {
        const { error } = await supabase.from('blog_posts').insert([postData]);
        if (error) throw error;
        setMessage('Blog post added successfully!');
      }
      
      resetForm();
      fetchBlogPosts();
    } catch (error: any) {
      setMessage(error.message || 'Error saving blog post.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setCategory(project.category);
    setLiveUrl(project.live_url || '');
    setGithubUrl(project.github_url || '');
    setTags(project.tags ? project.tags.join(', ') : '');
    setExistingImageUrl(project.image_url);
    setExistingAdditionalImages(project.additional_images || []);
    setMainImageFile(null);
    setAdditionalImageFiles(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditBlogPost = (post: BlogPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setTags(post.tags ? post.tags.join(', ') : '');
    setExistingImageUrl(post.image_url || '');
    setMainImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      fetchProjects();
    } catch (error: any) {
      setMessage(error.message || 'Error deleting project.');
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      fetchBlogPosts();
    } catch (error: any) {
      setMessage(error.message || 'Error deleting blog post.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setContent('');
    setCategory('Web Development');
    setLiveUrl('');
    setGithubUrl('');
    setTags('');
    setMainImageFile(null);
    setAdditionalImageFiles(null);
    setExistingImageUrl('');
    setExistingAdditionalImages([]);
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <>
      <SEO title="Admin Dashboard" description="Admin only area" />
      <Section id="admin" className="pt-32">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-slate-400">Welcome back, Hanan. Manage your portfolio and blog here.</p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-slate-800 pb-4">
          <button 
            onClick={() => { setActiveTab('projects'); resetForm(); }}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'projects' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Manage Projects
          </button>
          <button 
            onClick={() => { setActiveTab('blog'); resetForm(); }}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'blog' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            Manage Blog
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1 glass-card p-6 h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? `Edit ${activeTab === 'projects' ? 'Project' : 'Post'}` : `Add New ${activeTab === 'projects' ? 'Project' : 'Post'}`}
              </h2>
              {editingId && (
                <button onClick={resetForm} className="text-slate-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              )}
            </div>
            
            {message && (
              <div className="p-4 mb-6 rounded-lg bg-slate-800/50 border border-cyan-500/30 text-cyan-300 text-sm">
                {message}
              </div>
            )}

            <form onSubmit={activeTab === 'projects' ? handleAddOrUpdateProject : handleAddOrUpdateBlogPost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none" />
              </div>

              {activeTab === 'projects' && (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none">
                    <option>Web Development</option>
                    <option>Graphic Design</option>
                    <option>AI/ML</option>
                    <option>Other</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Tags (comma separated)</label>
                <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="React, Node.js, Tailwind" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none" />
              </div>

              {activeTab === 'projects' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none resize-none" />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Content</label>
                  <textarea value={content} onChange={e => setContent(e.target.value)} required rows={10} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none resize-none" />
                </div>
              )}
              
              <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/30">
                <label className="block text-sm font-medium text-slate-400 mb-2">Main Image {activeTab === 'blog' && '(Optional)'}</label>
                {existingImageUrl && !mainImageFile && (
                  <img src={existingImageUrl} alt="Current main" className="w-full h-32 object-cover rounded-lg mb-2 opacity-70" />
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setMainImageFile(e.target.files ? e.target.files[0] : null)} 
                  className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30" 
                />
              </div>

              {activeTab === 'projects' && (
                <>
                  <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/30">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Additional Gallery Images</label>
                    {existingAdditionalImages.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto mb-2 pb-2">
                        {existingAdditionalImages.map((img, i) => (
                          <img key={i} src={img} alt={`Gallery ${i}`} className="w-16 h-16 object-cover rounded-lg opacity-70 shrink-0" />
                        ))}
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={e => setAdditionalImageFiles(e.target.files)} 
                      className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-400 hover:file:bg-blue-500/30" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Live URL (Optional)</label>
                    <input type="url" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">GitHub URL (Optional)</label>
                    <input type="url" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-cyan-500 outline-none" />
                  </div>
                </>
              )}
              
              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-500 transition-colors flex items-center justify-center gap-2">
                {loading ? 'Saving...' : editingId ? `Update ${activeTab === 'projects' ? 'Project' : 'Post'}` : `Add ${activeTab === 'projects' ? 'Project' : 'Post'}`}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Manage {activeTab === 'projects' ? 'Projects' : 'Blog Posts'}</h2>
            <div className="space-y-4">
              {activeTab === 'projects' ? (
                projects.length === 0 ? (
                  <div className="glass-card p-8 text-center text-slate-400">No projects found.</div>
                ) : (
                  projects.map(project => (
                    <div key={project.id} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={project.image_url} alt={project.title} className="w-20 h-20 object-cover rounded-lg" />
                        <div>
                          <h3 className="text-white font-bold text-lg">{project.title}</h3>
                          <p className="text-sm text-cyan-400 mb-1">{project.category}</p>
                          <div className="flex gap-2">
                            {project.tags?.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">{tag}</span>
                            ))}
                            {project.tags && project.tags.length > 3 && <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">+{project.tags.length - 3}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button onClick={() => handleEditProject(project)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                          <Edit2 size={20} />
                        </button>
                        <button onClick={() => handleDeleteProject(project.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                )
              ) : (
                blogPosts.length === 0 ? (
                  <div className="glass-card p-8 text-center text-slate-400">No blog posts found.</div>
                ) : (
                  blogPosts.map(post => (
                    <div key={post.id} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {post.image_url && <img src={post.image_url} alt={post.title} className="w-20 h-20 object-cover rounded-lg" />}
                        <div>
                          <h3 className="text-white font-bold text-lg">{post.title}</h3>
                          <p className="text-sm text-slate-400 mb-1">{new Date(post.created_at).toLocaleDateString()}</p>
                          <div className="flex gap-2">
                            {post.tags?.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button onClick={() => handleEditBlogPost(post)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                          <Edit2 size={20} />
                        </button>
                        <button onClick={() => handleDeleteBlogPost(post.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
