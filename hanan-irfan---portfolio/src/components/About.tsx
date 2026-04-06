import { Section } from './ui/Section';
import { Code2, BrainCircuit, Palette, FileText } from 'lucide-react';
import { PROFILE_IMAGE } from '../assets/profileImage';
import { motion } from 'motion/react';

export function About() {
  const stats = [
    { label: 'Years Experience', value: '4+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '30+' },
  ];

  const highlights = [
    {
      icon: <BrainCircuit className="text-cyan-400" size={24} />,
      title: 'AI Development',
      desc: 'Integrating LLMs, computer vision, and predictive models into modern applications.',
    },
    {
      icon: <Code2 className="text-blue-400" size={24} />,
      title: 'Full Stack Web',
      desc: 'Building scalable, responsive, and performant web apps with React and Node.js.',
    },
    {
      icon: <Palette className="text-purple-400" size={24} />,
      title: 'UI/UX & Design',
      desc: 'Crafting intuitive interfaces and striking graphic designs that engage users.',
    },
    {
      icon: <FileText className="text-green-400" size={24} />,
      title: 'MS Office Expert',
      desc: 'Advanced data analysis, automation, and presentation design.',
    },
  ];

  return (
    <Section id="about">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 md:hidden flex justify-center">
            <img 
              src={PROFILE_IMAGE} 
              alt="Hanan Irfan" 
              className="w-48 h-48 rounded-2xl object-cover border-2 border-slate-700 shadow-lg"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bridging the gap between <span className="text-gradient">Design & Intelligence</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            I'm Hanan Irfan, an 18-year-old multidisciplinary developer and student at KFUEIT in RYK, currently in my 4th semester. I specialize in combining the analytical power of Artificial Intelligence with the creative finesse of Full Stack Development and Graphic Design.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Whether it's training a neural network, architecting a scalable backend, designing a pixel-perfect user interface, or automating workflows, I thrive on building end-to-end digital experiences that solve real problems.
          </p>
          
          <div className="flex gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4">
          <motion.div 
            className="hidden md:block mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={PROFILE_IMAGE} 
              alt="Hanan Irfan" 
              className="w-full h-64 rounded-2xl object-cover border-2 border-slate-700 shadow-lg"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </motion.div>
          {highlights.map((item, i) => (
            <motion.div 
              key={i} 
              className="glass-card p-6 flex gap-4 hover-lift"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="p-3 rounded-xl bg-slate-800/50 h-fit">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
