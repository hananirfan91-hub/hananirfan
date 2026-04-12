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
        const uploadPromises = Array.from(additionalImageFiles).map(file => uploadImage(file as File));
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

  const handleSeedBlogPosts = async () => {
    setLoading(true);
    setMessage('Generating high-quality SEO blog posts...');
    try {
      const posts = [
        {
          title: 'The Reality of "Vibe Coding": Why Flow State Beats Rigid Planning',
          content: 'When I first started coding, I thought everything had to be meticulously planned. UML diagrams, strict agile sprints, and endless documentation. But over the past few years, especially balancing my studies at KFUEIT with freelance work, I discovered something different: Vibe Coding.\n\nVibe coding isn\'t about being sloppy. It\'s about getting into a flow state where the code just pours out of you. It\'s that feeling when you put on your headphones, load up your favorite playlist, and suddenly three hours have passed and you\'ve built an entire MVP.\n\nI\'ve found that over-planning often kills creativity. When I\'m building a new React component or setting up a Supabase backend, I prefer to start with a rough sketch and just start typing. The architecture reveals itself as I solve problems in real-time. This approach has drastically improved my delivery speed for clients.\n\nOf course, this doesn\'t mean ignoring best practices. Clean code, modularity, and scalability are still the foundation. But allowing yourself to code by "feel" and intuition—trusting your experience—can lead to some of the most innovative solutions. Have you ever tried vibe coding? Let me know your thoughts.',
          image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
          tags: ['Vibe Coding', 'Productivity', 'Development']
        },
        {
          title: 'Why I Chose Supabase over Firebase for My Latest Projects',
          content: 'For the longest time, Firebase was the undisputed king of Backend-as-a-Service (BaaS). It was easy to set up, had great real-time features, and integrated perfectly with modern frontend frameworks. But recently, I\'ve made a complete switch to Supabase, and I haven\'t looked back.\n\nThe main reason? PostgreSQL. Firebase\'s NoSQL database (Firestore) is fantastic for simple, document-based data. But the moment you need complex relationships—like linking users to multiple projects, tracking detailed analytics, and running complex queries—NoSQL becomes a massive headache.\n\nSupabase gives you the power of a full PostgreSQL database, but with the ease of use of Firebase. You get an auto-generated API, real-time subscriptions, and built-in authentication. Plus, writing SQL queries feels so much more powerful and flexible than chaining together Firestore methods.\n\nAnother huge factor for me is the open-source nature of Supabase. Knowing that I\'m not entirely locked into a proprietary ecosystem gives me peace of mind, especially when building scalable applications for my clients. If you haven\'t tried Supabase yet, I highly recommend spinning up a test project. It might just change your entire workflow.',
          image_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80',
          tags: ['Supabase', 'Database', 'Backend']
        },
        {
          title: 'The Intersection of Graphic Design and Frontend Development',
          content: 'A lot of people treat graphic design and web development as two completely separate fields. You have the designers who live in Figma and Illustrator, and the developers who live in VS Code. But as someone who does both, I can tell you that the magic happens when these two worlds collide.\n\nUnderstanding design principles—like typography, color theory, and visual hierarchy—makes you a significantly better frontend developer. You stop just "translating" a Figma file into CSS and start understanding *why* a certain padding is necessary, or *why* a specific shade of blue draws the user\'s eye to a call-to-action button.\n\nConversely, knowing how CSS and the DOM work makes you a better designer. You start designing with responsiveness in mind. You understand the constraints of the web, which prevents you from designing beautiful but impossible-to-build interfaces.\n\nFor my freelance projects, offering both design and development has been a game-changer. Clients love working with one person who can take their vision from a rough sketch all the way to a deployed, pixel-perfect React application. If you\'re a developer, spend a weekend learning basic design theory. It will elevate your work instantly.',
          image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80',
          tags: ['Design', 'Frontend', 'UI/UX']
        },
        {
          title: 'YouTube Automation: Is it still profitable in 2026?',
          content: 'YouTube automation has been a buzzword for years. The idea of running a "faceless" channel, outsourcing the scriptwriting, voiceover, and editing, and just collecting ad revenue sounds like a dream. But the landscape has changed drastically, and what worked in 2022 definitely doesn\'t work today.\n\nSo, is it still profitable? Yes, but the barrier to entry is much higher. You can\'t just slap together stock footage and a robotic text-to-speech voice anymore. The YouTube algorithm, and more importantly, the viewers, demand high-quality storytelling and engaging visuals.\n\nIn my experience managing automation pipelines, the key to success now is leveraging AI *correctly*. Using AI to brainstorm ideas, outline scripts, and even generate specific visual assets is incredibly powerful. But the final product needs a human touch. The pacing, the humor, the emotional hook—these are things AI still struggles with.\n\nIf you\'re looking to start a YouTube automation channel, focus on a hyper-specific niche. Invest in a good voiceover artist (or a highly advanced, trained AI voice model), and spend 80% of your effort on the thumbnail and the first 30 seconds of the video. That\'s where the battle for attention is won or lost.',
          image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
          tags: ['YouTube', 'Automation', 'Content Creation']
        },
        {
          title: 'Balancing University Life with Freelance Development',
          content: 'Being a 4th-semester student at KFUEIT while actively taking on freelance full-stack and design projects is... chaotic, to say the least. My days are a blur of lectures, assignments, client meetings, and late-night coding sessions. It\'s exhausting, but I wouldn\'t trade it for anything.\n\nThe biggest lesson I\'ve learned is the importance of ruthless time management. I used to rely on motivation to get things done, but motivation is fleeting. Now, I rely on systems. I block out specific hours for university work and specific hours for client work. When I\'m in "client mode," my phone is on Do Not Disturb, and I\'m fully locked in.\n\nAnother crucial aspect is setting expectations. I\'m very upfront with my clients about my schedule. I let them know that I might not be able to respond to an email immediately during the day, but I will always deliver the work on time. Surprisingly, most clients are incredibly understanding and respect the hustle.\n\nIf you\'re a student trying to build a freelance career, my advice is to start small. Don\'t take on massive projects that will overwhelm you. Build a portfolio, learn to manage your time, and remember that your education is still a priority. The real-world experience you gain from freelancing will make your university studies much more meaningful.',
          image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
          tags: ['Freelance', 'Student Life', 'Time Management']
        },
        {
          title: 'Why Tailwind CSS Won the Styling Wars',
          content: 'I remember the days of writing thousands of lines of custom CSS. BEM methodology, SASS variables, dealing with specificity nightmares... it was a struggle. Then came CSS-in-JS solutions like Styled Components, which were a step in the right direction but added JavaScript overhead.\n\nAnd then, I discovered Tailwind CSS. At first, looking at a div with 15 utility classes felt wrong. It felt messy. But after building one project with it, I was completely hooked. Tailwind CSS didn\'t just change how I style my apps; it changed how I think about design systems.\n\nThe beauty of Tailwind is its constraint-based design. Instead of picking any random hex code or pixel value, you\'re forced to choose from a carefully curated scale. This naturally leads to more consistent and professional-looking interfaces. Plus, the development speed is unmatched. I never have to leave my HTML/JSX file to write styles.\n\nYes, the markup can get a bit cluttered, but with component-based frameworks like React, that\'s rarely an issue since you\'re abstracting the messy parts into reusable components. Tailwind has officially won the styling wars in my book, and it\'s my default choice for every new project.',
          image_url: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80',
          tags: ['CSS', 'Tailwind', 'Frontend']
        },
        {
          title: 'The Power of Micro-Interactions in Web Design',
          content: 'Have you ever clicked a button on a website and felt a strange sense of satisfaction? Maybe it was a subtle color change, a smooth ripple effect, or a tiny bounce animation. These are micro-interactions, and they are the secret sauce of great user experiences.\n\nAs a developer and designer, I spend a lot of time thinking about how a website *feels*, not just how it looks. A static page is boring. But a page that reacts to your cursor, acknowledges your clicks, and guides your eye through subtle motion feels alive.\n\nI heavily rely on libraries like Framer Motion in my React projects to bring these interactions to life. It doesn\'t take much—a slight scale-up on hover, a smooth fade-in when scrolling down, or a satisfying loading spinner. These details might seem insignificant, but they collectively build trust and delight the user.\n\nHowever, there\'s a fine line between engaging and annoying. The key is subtlety. Animations should be fast (usually under 300ms) and purposeful. They shouldn\'t distract from the content; they should enhance it. Next time you\'re building a UI, ask yourself: "How can I make this interaction feel just a little bit better?"',
          image_url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80',
          tags: ['Design', 'UX', 'Animation']
        },
        {
          title: 'My Go-To Tech Stack for 2026',
          content: 'The web development landscape moves incredibly fast. What was industry standard two years ago is often considered legacy today. After experimenting with dozens of frameworks, databases, and deployment platforms, I\'ve finally settled on a tech stack that gives me the perfect balance of speed, scalability, and developer experience.\n\nFor the frontend, it\'s React with Vite. Create React App is dead, and Vite\'s instant server start and lightning-fast HMR make development an absolute joy. I pair this with Tailwind CSS for styling and Framer Motion for animations.\n\nFor the backend, I\'ve completely moved to Supabase. Having a full PostgreSQL database with instant APIs, real-time capabilities, and built-in auth saves me weeks of backend setup. It\'s robust enough for enterprise apps but easy enough for weekend side projects.\n\nFor deployment, Vercel is my platform of choice. The seamless GitHub integration, automatic preview deployments, and edge network performance are unmatched. This stack allows me to go from an idea to a deployed, production-ready application in record time. What\'s your go-to stack right now?',
          image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
          tags: ['Tech Stack', 'React', 'Supabase']
        },
        {
          title: 'Overcoming Imposter Syndrome as a Young Developer',
          content: 'Let\'s be honest: tech Twitter and LinkedIn can be incredibly intimidating. Every day, you see people launching successful startups, contributing to massive open-source projects, or landing jobs at FAANG companies. As an 18-year-old developer, it\'s easy to look at all that and think, "I\'m not good enough. I don\'t belong here."\n\nI\'ve struggled with imposter syndrome a lot. There are days when I stare at a bug for hours, feeling like a complete fraud. But over time, I\'ve realized that *everyone* feels this way. Even the senior developers I look up to spend half their day Googling error messages and reading documentation.\n\nThe turning point for me was accepting that I don\'t need to know everything. The tech industry is too vast for any one person to master it all. My value isn\'t in having every API memorized; it\'s in my ability to learn, adapt, and solve problems.\n\nIf you\'re dealing with imposter syndrome, my advice is to focus on your own progress. Look back at the code you wrote six months ago. You\'ll probably cringe at it, and that\'s a good thing! It means you\'ve grown. Keep building, keep learning, and remember that you deserve to be here just as much as anyone else.',
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
          tags: ['Mental Health', 'Career', 'Advice']
        },
        {
          title: 'Essential MS Office Skills Every Freelancer Needs',
          content: 'When people think of freelancing in tech, they usually think of coding, design, or marketing. But there\'s a set of "boring" skills that are absolutely crucial for running a successful freelance business: MS Office proficiency.\n\nYou might be a wizard at React, but if you can\'t put together a professional proposal, track your finances, or present your ideas clearly, you\'re going to struggle. \n\nExcel is arguably the most important tool in my administrative arsenal. I use it for tracking project hours, managing invoices, and forecasting my freelance income. Knowing how to use pivot tables, VLOOKUP, and basic macros saves me hours of manual data entry every month.\n\nWord and PowerPoint are equally important. A well-formatted, visually appealing project proposal in Word can be the difference between landing a client and getting ghosted. And when it comes to pitching a complex architecture or a new design system, a clean, concise PowerPoint deck is invaluable. Don\'t sleep on these fundamental tools—they are the backbone of the business side of freelancing.',
          image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
          tags: ['Freelance', 'Business', 'MS Office']
        }
      ];

      const { error } = await supabase.from('blog_posts').insert(posts);
      if (error) throw error;
      
      setMessage('Successfully generated 10 SEO blog posts!');
      fetchBlogPosts();
    } catch (error: any) {
      setMessage(error.message || 'Error generating blog posts.');
    } finally {
      setLoading(false);
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

        <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-800 pb-4 justify-between items-center">
          <div className="flex gap-4">
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
          {activeTab === 'blog' && blogPosts.length === 0 && (
            <button 
              onClick={handleSeedBlogPosts}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/30 transition-colors text-sm font-medium"
            >
              Generate 10 SEO Blog Posts
            </button>
          )}
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
