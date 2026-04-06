import { useState } from 'react';
import { Section } from './ui/Section';
import { Mail, MapPin, Instagram, Send, Facebook, Twitter, Youtube } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, text: '' });

    try {
      const { error } = await supabase.from('messages').insert([
        { name, email, message }
      ]);

      if (error) throw error;

      setStatus({ type: 'success', text: 'Message sent successfully!' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (error: any) {
      console.error("Supabase error:", error);
      if (error.message?.includes('schema cache') || error.message?.includes('does not exist')) {
        setStatus({ 
          type: 'error', 
          text: 'Database syncing... If this persists, please run "NOTIFY pgrst, \'reload schema\';" in your Supabase SQL Editor.' 
        });
      } else {
        setStatus({ type: 'error', text: error.message || 'Failed to send message.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 md:p-12 relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's build something <span className="text-gradient">amazing</span></h2>
            <p className="text-slate-400 mb-8 text-lg">
              Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-cyan-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium">hananirfan91@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-cyan-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="font-medium">Pakistan</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="https://instagram.com/tearswithhanan/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com/HananIrfan001" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/hananirfan91" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.youtube.com/@ancientmystery-0" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4" 
            onSubmit={handleSubmit}
          >
            {status.text && (
              <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                {status.text}
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                placeholder="Tell me about your project..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:-translate-y-1 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'} <Send size={18} />
            </button>
          </motion.form>
        </div>
      </motion.div>
    </Section>
  );
}
