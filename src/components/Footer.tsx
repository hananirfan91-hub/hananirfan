import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-12 mt-12 bg-[#0b1120]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white mb-4 block">
            Hanan<span className="text-cyan-400">.</span>
          </Link>
          <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
            I am a passionate Full-Stack Developer and Graphic Designer based in Pakistan. I specialize in building highly scalable applications, beautiful user interfaces, and automated digital workflows that solve complex business problems.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/hananirfan2026" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://tiktok.com/@pathan_x_babrian565" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors font-bold">
              TK
            </a>
            <a href="https://facebook.com/HananIrfan001" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors">
              <Facebook size={18} />
            </a>
            <a href="https://x.com/hananirfan91" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="https://www.youtube.com/@ancientmystery-0" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors">
              <Youtube size={18} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <Link to="/about" className="hover:text-cyan-400 transition-colors">About Me</Link>
            <Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
            <Link to="/portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</Link>
            <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-slate-800/50 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Hanan Irfan. All rights reserved.
      </div>
    </footer>
  );
}
