'use client';

import { motion } from 'framer-motion';
import { SkillItem } from './SkillItem';
import { type SkillCategory } from '../data/skills';
import { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

interface SkillCardProps {
  category: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  skills: SkillCategory['skills'];
  inView: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function SkillCard({ category, icon: Icon, color, bgColor, skills, inView }: SkillCardProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <motion.article
      variants={itemVariants}
      className="group"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
      
      {/* Card */}
      <div className="relative h-full rounded-xl border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm p-6 group-hover:border-cyan-500/50 transition-all duration-500">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {/* Icon avec glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-3 rounded-lg bg-neutral-900 border border-neutral-800 group-hover:border-cyan-500/50 transition-colors duration-300">
              <Icon className="h-6 w-6 text-cyan-400" />
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              {t.skills.categories[category.toLowerCase().replace(' & ', '_') as keyof typeof t.skills.categories]}
            </h2>
            <p className="text-sm text-neutral-500 font-mono">
              {skills.length} {t.skills.technologies}
            </p>
          </div>
        </div>

        {/* Skills list */}
        <div className="space-y-2">
          {skills.map((skill, index) => (
            <SkillItem
              key={skill.name}
              skill={skill}
              color={color}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-700" />
      </div>
    </motion.article>
  );
}