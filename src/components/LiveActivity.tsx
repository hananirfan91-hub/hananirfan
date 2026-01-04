import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Eye, Clock, Zap, Globe, Activity } from "lucide-react";

const activities = [
  { icon: Eye, text: "Someone viewed your portfolio", location: "Lahore, PK" },
  { icon: Users, text: "New visitor from KFUEIT", location: "Rahim Yar Khan" },
  { icon: Globe, text: "Portfolio shared on LinkedIn", location: "Global" },
  { icon: Zap, text: "Project page visited", location: "Karachi, PK" },
  { icon: Activity, text: "Contact form interaction", location: "Dubai, UAE" },
  { icon: Eye, text: "Someone viewed Hadith Hub", location: "Islamabad, PK" },
  { icon: Users, text: "QuickWork page visitor", location: "Multan, PK" },
];

export const LiveActivity = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [visitorCount, setVisitorCount] = useState(127);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const activityInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    const countInterval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 10000);

    return () => {
      clearInterval(activityInterval);
      clearInterval(countInterval);
    };
  }, []);

  const activity = activities[currentActivity];
  const Icon = activity.icon;

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40 flex flex-col gap-3 items-end">
      {/* Live Visitor Count */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-lg rounded-full border border-border shadow-lg"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-sm font-medium text-foreground">
          {visitorCount} <span className="text-muted-foreground">visitors today</span>
        </span>
      </motion.div>

      {/* Activity Feed */}
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentActivity}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 px-4 py-3 bg-card/90 backdrop-blur-lg rounded-xl border border-border shadow-lg max-w-xs"
          >
            <div className="p-2 rounded-lg bg-accent/20">
              <Icon size={16} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{activity.text}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={10} />
                <span>Just now • {activity.location}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
