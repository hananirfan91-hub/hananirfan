import { Link } from "react-router-dom";
import { Instagram, Facebook, ExternalLink } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/tearswithhanan/",
    icon: Instagram,
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@pathan_x_babarian565",
    icon: ExternalLink,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/HananIrfan001",
    icon: Facebook,
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 pb-24 md:pb-8">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Hanan Irfan</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              CS Student, AI Developer & Graphic Designer based in Rahim Yar Khan, Pakistan.
              Building innovative solutions and creative designs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                About
              </Link>
              <Link
                to="/projects"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hanan Irfan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
