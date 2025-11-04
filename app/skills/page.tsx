'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from './data/skills';
import { SkillCard } from './components/SkillCard';
import { SkillsHeader } from './components/SkillsHeader';

export default function SkillsPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(34, 211, 238, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} 
        />
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SkillsHeader />
          
          <motion.div
            ref={ref}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {skills.map((category) => (
              <SkillCard
                key={category.category}
                category={category.category}
                icon={category.icon}
                color={category.color}
                bgColor={category.bgColor}
                skills={category.skills}
                inView={inView}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}