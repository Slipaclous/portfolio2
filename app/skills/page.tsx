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
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
  {/* Background gradient with subtle noise */}
  <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/20 to-background opacity-90 backdrop-blur-sm" />
  {/* Optional subtle overlay */}
  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
  
  {/* Content */}
  <div className="relative h-full p-8 md:p-12">
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
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
  );
}