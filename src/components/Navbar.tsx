import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
          Hanan<span className="text-cyan-400">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.href ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ShieldAlert size={16} /> Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-full bg-slate-800 text-white text-sm font-medium border border-slate-700 hover:border-red-500/50 hover:bg-slate-800/80 transition-all hover-glow"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-2.5 rounded-full bg-slate-800 text-white text-sm font-medium border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/80 transition-all hover-glow"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-t border-slate-800 py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-base font-medium transition-colors ${
                location.pathname === link.href ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-base font-medium text-purple-400 hover:text-purple-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          {user ? (
            <button
              onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
              className="text-left text-base font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-base font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login / Signup
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
