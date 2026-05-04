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
          <div className="text-slate-400 text-lg leading-relaxed mb-6 space-y-4">
            <p>
              I'm Hanan Irfan, an 18-year-old multidisciplinary developer and student at Khwaja Fareed University of Engineering and Information Technology (KFUEIT) in Rahim Yar Khan, Pakistan. Currently in my 4th semester, I have dedicated myself to mastering the intersection of robust backend engineering, beautiful frontend interfaces, and cutting-edge data architecture.
            </p>
            <p>
              My journey in the tech world began with a deep curiosity for how things work behind the screens. I quickly realized that writing clean, performant code was only half the battle; the other half is presenting that information in a way that is intuitive, accessible, and visually striking. That realization pushed me to master not just software development frameworks like React, Node.js, and Supabase, but also professional graphic design principles.
            </p>
            <p>
              Today, I specialize in combining the analytical power of Artificial Intelligence with the creative finesse of Full Stack Development. Whether it's training a neural network, architecting a highly scalable backend architecture, designing a pixel-perfect user interface, or automating complex workflows for YouTube content creators, I thrive on building end-to-end digital experiences that solve real-world problems.
            </p>
            <p>
              Beyond traditional coding, I am a firm believer in the "Vibe Coding" philosophy—getting into a deep state of flow where rapid prototyping and creative problem-solving take over. My goal with every project, big or small, is to deliver web applications that not only function flawlessly under heavy traffic but also provide an incredibly engaging experience for the end-user.
            </p>
          </div>
          
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
