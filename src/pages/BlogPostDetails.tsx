import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, BlogPost } from '../lib/supabase';
import { SEO } from '../components/SEO';
import { Section } from '../components/ui/Section';
import { ArrowLeft, Calendar } from 'lucide-react';

export function BlogPostDetails() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
        if (error) throw error;
        if (data) setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center text-white">Blog post not found.</div>;

  return (
    <>
      <SEO title={`${post.title} | Blog`} description={post.content.substring(0, 150)} />
      <Section id="blog-details" className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
            <ArrowLeft size={20} /> Back to Blog
          </Link>
          
          {post.image_url && (
            <div className="glass-card overflow-hidden mb-12 rounded-2xl">
              <img src={post.image_url} alt={post.title} className="w-full max-h-[500px] object-cover" />
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-medium text-cyan-400 mb-4">
              <Calendar size={16} />
              {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <div className="prose prose-invert prose-lg max-w-none">
              {/* Simple rendering for now, can be upgraded to markdown later if needed */}
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                {post.content}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
