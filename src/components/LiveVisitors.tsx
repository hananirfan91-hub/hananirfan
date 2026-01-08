import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Eye } from "lucide-react";

export const LiveVisitors = () => {
  const [visitors, setVisitors] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    // Simulate live visitors (random between 3-15)
    setVisitors(Math.floor(Math.random() * 12) + 3);
    setViews(Math.floor(Math.random() * 100) + 150);

    // Update occasionally
    const interval = setInterval(() => {
      setVisitors((prev) => Math.max(2, prev + Math.floor(Math.random() * 3) - 1));
      setViews((prev) => prev + Math.floor(Math.random() * 5));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 px-3 py-2 bg-card/90 backdrop-blur-sm rounded-xl border border-border shadow-lg"
      >
        <div className="relative">
          <Users size={16} className="text-green-400" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
        <span className="text-sm font-medium">{visitors} online</span>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 px-3 py-2 bg-card/90 backdrop-blur-sm rounded-xl border border-border shadow-lg"
      >
        <Eye size={16} className="text-accent" />
        <span className="text-sm font-medium">{views} views</span>
      </motion.div>
    </motion.div>
  );
};
