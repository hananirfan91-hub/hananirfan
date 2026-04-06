import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { supabase, BlogPost } from '../lib/supabase';
import { Calendar, ArrowRight } from 'lucide-react';

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        if (data) setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <SEO 
        title="Blog" 
        description="Read my latest thoughts, tutorials, and updates on web development, AI, and design." 
      />
      
      <Section id="blog-header" className="pt-32 pb-12 text-center" animation="fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          My <span className="text-gradient">Blog</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Thoughts, tutorials, and updates on web development, AI, and design.
        </p>
      </Section>

      <Section id="blog-grid" className="pt-0" animation="fade-up">
        {loading ? (
          <div className="text-center text-slate-400 py-20">Loading posts...</div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="glass-card overflow-hidden group hover-lift flex flex-col cursor-pointer">
                {post.image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={post.image_url}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 mb-3">
                    <Calendar size={14} />
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{post.title}</h3>
                  <p className="text-slate-400 mb-6 flex-grow text-sm line-clamp-3">{post.content.replace(/<[^>]*>?/gm, '')}</p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <span className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                      Read More <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 py-20 glass-card">
            <p className="text-lg">No blog posts yet.</p>
            <p className="text-sm mt-2">Check back later for updates!</p>
          </div>
        )}
      </Section>
    </>
  );
}
