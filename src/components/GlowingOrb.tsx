import { motion } from "framer-motion";

interface GlowingOrbProps {
  className?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "navy";
}

const sizes = {
  sm: "w-32 h-32",
  md: "w-64 h-64",
  lg: "w-96 h-96",
};

const colors = {
  primary: "from-primary/30 via-primary/10 to-transparent",
  accent: "from-accent/30 via-accent/10 to-transparent",
  navy: "from-navy/30 via-navy-light/10 to-transparent",
};

export const GlowingOrb = ({
  className = "",
  delay = 0,
  size = "md",
  color = "accent",
}: GlowingOrbProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [0.8, 1.1, 0.9, 1],
        opacity: [0, 0.6, 0.4, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        delay,
      }}
      className={`absolute rounded-full bg-gradient-radial ${sizes[size]} ${colors[color]} blur-3xl ${className}`}
    />
  );
};
