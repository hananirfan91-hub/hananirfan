import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import adImage from "@/assets/ad-banner.png";

interface AdBannerProps {
  className?: string;
}

export const AdBanner = ({ className = "" }: AdBannerProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Switch to video after 5 seconds
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [showVideo]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`relative w-full max-w-[728px] h-[90px] mx-auto overflow-hidden shadow-lg border border-border ${className}`}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 z-20 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        aria-label="Close ad"
      >
        <X size={14} />
      </button>

      {/* Ad Label */}
      <span className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-black/50 text-white text-[10px] font-medium">
        AD
      </span>

      <AnimatePresence mode="wait">
        {!showVideo ? (
          <motion.a
            key="image"
            href="https://wa.me/923106359235"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="block w-full h-full"
          >
            <img
              src={adImage}
              alt="Lahore Book Mart - A Book Bazaar with a Lahori Soul"
              className="w-full h-full object-cover"
            />
          </motion.a>
        ) : (
          <motion.a
            key="video"
            href="https://wa.me/923106359235"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="block w-full h-full"
          >
            <video
              ref={videoRef}
              src="https://quickworkitcenter.lovable.app/lahore-bookmart-video.mp4"
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </motion.a>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
