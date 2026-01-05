import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  User,
  MapPin,
  Calendar,
  Award,
  Code,
  Palette,
  Brain,
  Globe,
  Heart,
  Star,
  Zap,
  Eye,
  Clock,
  TrendingUp,
  MessageCircle,
  Share2,
  Coffee,
  BookOpen,
  Laptop,
} from "lucide-react";
import { Helmet } from "react-helmet";
import profileImage from "@/assets/profile-new.png";

// Simulated real-time data
const useRealTimeStats = () => {
  const [stats, setStats] = useState({
    profileViews: 1247,
    projectsViewed: 89,
    connectionsToday: 12,
    activeNow: 3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        profileViews: prev.profileViews + Math.floor(Math.random() * 3),
        projectsViewed: prev.projectsViewed + Math.floor(Math.random() * 2),
        connectionsToday: prev.connectionsToday + (Math.random() > 0.7 ? 1 : 0),
        activeNow: Math.max(1, prev.activeNow + (Math.random() > 0.5 ? 1 : -1)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};

const achievements = [
  { icon: Award, title: "Top Developer", description: "Recognized for excellence", color: "from-yellow-500 to-orange-500" },
  { icon: Star, title: "5-Star Rating", description: "Client satisfaction", color: "from-purple-500 to-pink-500" },
  { icon: Zap, title: "Fast Delivery", description: "Always on time", color: "from-blue-500 to-cyan-500" },
  { icon: Heart, title: "Community Love", description: "500+ followers", color: "from-red-500 to-pink-500" },
];

const timeline = [
  { year: "2024", title: "Founded QuickWorks IT Center", description: "Started my own IT business" },
  { year: "2023", title: "AI Development Journey", description: "Began learning ML & AI" },
  { year: "2022", title: "Joined KFUEIT", description: "Started CS degree" },
  { year: "2021", title: "First Web Project", description: "Built my first website" },
];

const interests = [
  { icon: Coffee, label: "Coffee Lover" },
  { icon: BookOpen, label: "Continuous Learner" },
  { icon: Laptop, label: "Tech Enthusiast" },
  { icon: Globe, label: "Global Mindset" },
];

const Profile = () => {
  const stats = useRealTimeStats();
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "achievements">("overview");

  return (
    <>
      <Helmet>
        <title>Hanan Irfan Profile | CS Student, AI Developer, Designer - Rahim Yar Khan</title>
        <meta
          name="description"
          content="View Hanan Irfan's professional profile - Computer Science student at KFUEIT, AI Developer, and Graphic Designer from Rahim Yar Khan, Pakistan. Connect with me!"
        />
        <meta
          name="keywords"
          content="Hanan Irfan profile, KFUEIT student, AI developer Rahim Yar Khan, graphic designer Pakistan, web developer portfolio"
        />
      </Helmet>

      <Layout>
        {/* Hero Profile Header */}
        <section className="relative py-20 bg-gradient-hero overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, delay: 4 }}
              className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <AnimatedSection>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-accent/50 shadow-2xl">
                    <img
                      src={profileImage}
                      alt="Hanan Irfan - Professional Profile Photo"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Online Indicator */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background animate-pulse" />
                </motion.div>
              </AnimatedSection>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <AnimatedSection delay={100}>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <h1 className="text-3xl md:text-5xl font-bold">Hanan Irfan</h1>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Award className="text-accent" size={28} />
                    </motion.div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={200}>
                  <p className="text-lg text-accent font-medium mb-4">
                    CS Student • AI Developer • Graphic Designer
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-2">
                      <MapPin size={16} className="text-accent" />
                      Rahim Yar Khan, Pakistan
                    </span>
                    <span className="flex items-center gap-2">
                      <Globe size={16} className="text-accent" />
                      KFUEIT
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={16} className="text-accent" />
                      Active Now
                    </span>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={400}>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <a
                      href="/contact"
                      className="px-6 py-3 bg-gradient-to-r from-accent to-blue-500 text-accent-foreground rounded-xl font-medium shadow-lg shadow-accent/30 hover:shadow-xl transition-all"
                    >
                      <MessageCircle className="inline mr-2" size={18} />
                      Contact Me
                    </a>
                    <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium border border-border hover:bg-secondary/80 transition-all">
                      <Share2 className="inline mr-2" size={18} />
                      Share Profile
                    </button>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Real-Time Stats */}
        <section className="py-8 border-b border-border bg-card/50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Eye, value: stats.profileViews, label: "Profile Views", live: true },
                { icon: Code, value: stats.projectsViewed, label: "Projects Viewed", live: true },
                { icon: TrendingUp, value: stats.connectionsToday, label: "New Connections", live: true },
                { icon: User, value: stats.activeNow, label: "Viewing Now", live: true },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="p-3 rounded-lg bg-accent/10">
                    <stat.icon className="text-accent" size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      {stat.live && (
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-4 border-b border-border sticky top-16 bg-background/95 backdrop-blur-lg z-30">
          <div className="container mx-auto px-6">
            <div className="flex gap-2">
              {(["overview", "timeline", "achievements"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl font-medium capitalize transition-all ${
                    activeTab === tab
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* About */}
                <AnimatedSection>
                  <div className="p-8 rounded-2xl bg-card border border-border">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <User className="text-accent" size={24} />
                      About Me
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      I'm a passionate Computer Science student at KFUEIT with a love for creating
                      innovative digital solutions. My expertise spans web development, AI/ML, and
                      graphic design, allowing me to build comprehensive products from concept to launch.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <span
                          key={interest.label}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full text-sm"
                        >
                          <interest.icon size={14} className="text-accent" />
                          {interest.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                {/* Skills */}
                <AnimatedSection delay={100}>
                  <div className="p-8 rounded-2xl bg-card border border-border">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Zap className="text-accent" size={24} />
                      Skills
                    </h2>
                    <div className="space-y-4">
                      {[
                        { icon: Code, label: "Web Development", level: 90 },
                        { icon: Palette, label: "Graphic Design", level: 85 },
                        { icon: Brain, label: "AI & Machine Learning", level: 75 },
                      ].map((skill) => (
                        <div key={skill.label}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="flex items-center gap-2 font-medium">
                              <skill.icon size={16} className="text-accent" />
                              {skill.label}
                            </span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-accent to-blue-500 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            )}

            {activeTab === "timeline" && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <Clock className="text-accent" size={24} />
                  My Journey
                </h2>
                <div className="relative border-l-2 border-accent/30 pl-8 space-y-8">
                  {timeline.map((item, index) => (
                    <AnimatedSection key={item.year} delay={index * 100}>
                      <motion.div
                        whileHover={{ x: 10 }}
                        className="relative"
                      >
                        <div className="absolute -left-10 w-4 h-4 bg-accent rounded-full border-4 border-background" />
                        <span className="text-accent font-bold text-lg">{item.year}</span>
                        <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </motion.div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <AnimatedSection key={achievement.title} delay={index * 100}>
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="p-6 rounded-2xl bg-card border border-border text-center"
                    >
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${achievement.color} p-4 shadow-lg`}
                      >
                        <achievement.icon className="text-white w-full h-full" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Profile;
