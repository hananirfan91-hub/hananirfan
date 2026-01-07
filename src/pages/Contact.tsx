import { useState } from "react";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Mail, MapPin, Send, Instagram, Facebook, ExternalLink, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

const socialLinks = [
  {
    name: "Instagram",
    handle: "@tearswithhanan",
    url: "https://instagram.com/tearswithhanan/",
    icon: Instagram,
    color: "from-pink-500 to-purple-500",
  },
  {
    name: "TikTok",
    handle: "@pathan_x_babarian565",
    url: "https://tiktok.com/@pathan_x_babarian565",
    icon: ExternalLink,
    color: "from-gray-700 to-gray-900",
  },
  {
    name: "Facebook",
    handle: "HananIrfan001",
    url: "https://facebook.com/HananIrfan001",
    icon: Facebook,
    color: "from-blue-500 to-blue-700",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    // Reset form after delay
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Hanan Irfan | Hire Web Developer & Designer - Rahim Yar Khan</title>
        <meta
          name="description"
          content="Get in touch with Hanan Irfan for web development, AI projects, and graphic design work. Based in Rahim Yar Khan, Pakistan. Quick response guaranteed!"
        />
        <meta
          name="keywords"
          content="contact Hanan Irfan, hire web developer Pakistan, Rahim Yar Khan developer, freelance designer contact"
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-navy/20 text-accent rounded-full text-sm font-medium border border-navy/30 mb-6">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a project idea, question, or just want to say hello? 
              I'd love to hear from you. Fill out the form or reach out on social media.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="border-gradient rounded-2xl p-8 bg-card">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle className="text-green-500 mb-4" size={48} />
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                        placeholder="Your message..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-navy-light text-primary-foreground rounded-xl font-medium transition-all duration-300 glow-sm hover:glow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              {/* Info Cards */}
              <AnimatedSection delay={100}>
                <div className="border-gradient rounded-2xl p-8 bg-card">
                  <h2 className="text-2xl font-bold mb-6">Contact Info</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-navy/30 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-accent" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <a href="mailto:hananirfan91@gmail.com" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                          hananirfan91@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-navy/30 flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-accent" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Location</h3>
                        <p className="text-muted-foreground text-sm">Rahim Yar Khan, Pakistan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Social Links */}
              <AnimatedSection delay={200}>
                <div className="border-gradient rounded-2xl p-8 bg-card">
                  <h2 className="text-2xl font-bold mb-6">Follow Me</h2>
                  <div className="space-y-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-muted transition-all duration-300 group"
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center`}>
                            <Icon className="text-white" size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium group-hover:text-accent transition-colors">
                              {social.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{social.handle}</p>
                          </div>
                          <ExternalLink className="text-muted-foreground group-hover:text-accent transition-colors" size={18} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
      </Layout>
    </>
  );
};

export default Contact;
