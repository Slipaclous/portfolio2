'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe2, Smartphone, Code2, Database, Languages, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { language } = useLanguage();
  const t = translations[language];

  const skills = [
    { icon: Globe2, label: t.about.skills.bilingual },
    { icon: Smartphone, label: t.about.skills.responsive },
    { icon: Code2, label: t.about.skills.frontend },
    { icon: Database, label: t.about.skills.backend },
    { icon: Languages, label: t.about.skills.frameworks },
    { icon: Lightbulb, label: t.about.skills.problemSolving },
  ];

  return (
    <div className="min-h-screen flex items-center py-20 px-6 bg-[#0a0a0a]">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
              <span className="text-cyan-400 text-sm font-mono tracking-wider uppercase">
                About
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              {t.about.title}
            </motion.h1>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {t.about.description.map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-lg text-neutral-400 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}

              {/* Decorative element */}
              <div className="flex items-center gap-2 pt-4">
                <div className="h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-500" />
                <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-transparent" />
              </div>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8">
                {t.about.keySkills}
              </h2>
              
              <div className="grid grid-cols-1 gap-3">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="group relative"
                    >
                      {/* Border glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                      
                      {/* Card */}
                      <div className="relative flex items-center gap-4 p-4 rounded-lg border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm group-hover:border-cyan-500/50 group-hover:translate-x-2 transition-all duration-300">
                        {/* Icon with glow */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <Icon className="relative h-5 w-5 text-cyan-400" />
                        </div>
                        
                        {/* Label */}
                        <span className="font-medium text-neutral-300 group-hover:text-white transition-colors">
                          {skill.label}
                        </span>

                        {/* Decorative line */}
                        <div className="ml-auto h-px w-0 group-hover:w-8 bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-500" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Bottom decorative grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 relative h-32 overflow-hidden rounded-lg border border-neutral-900"
          >
            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(to right, rgb(34, 211, 238, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgb(34, 211, 238, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />
            
            {/* Scanning line effect */}
            <motion.div
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}