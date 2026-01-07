import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Background music URL - using a royalty-free ambient track
  const musicUrl = "https://cdn.pixabay.com/audio/2024/11/28/audio_2c7f05ab65.mp3";

  useEffect(() => {
    // Handle user interaction to enable autoplay
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current) {
          audioRef.current.volume = 0.3;
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            // Autoplay blocked, user needs to click
          });
        }
      }
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-20 md:bottom-6 right-4 z-40 p-3 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg transition-colors"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
      >
        {isPlaying ? (
          <Volume2 size={20} className="animate-pulse" />
        ) : (
          <VolumeX size={20} />
        )}
      </motion.button>
    </>
  );
};
