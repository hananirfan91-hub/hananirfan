import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up' | 'none';
}

export function Section({ id, children, className = '', animation = 'fade-up' }: SectionProps) {
  const getAnimationProps = () => {
    switch (animation) {
      case 'fade-in':
        return { initial: { opacity: 0 }, whileInView: { opacity: 1 } };
      case 'slide-left':
        return { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 } };
      case 'slide-right':
        return { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 } };
      case 'scale-up':
        return { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 } };
      case 'none':
        return { initial: { opacity: 1 }, whileInView: { opacity: 1 } };
      case 'fade-up':
      default:
        return { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } };
    }
  };

  const animProps = getAnimationProps();

  return (
    <section id={id} className={`py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
      <motion.div
        {...animProps}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
