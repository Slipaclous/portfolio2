'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};
export function SkillCard({ category, icon: Icon, color, bgColor, skills, inView }: SkillCardProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <motion.div
      variants={itemVariants}
      className="h-full transform transition-transform duration-300 hover:-translate-y-2"
      whileHover={{ scale: 1.02 }}
    >
      <Card
        className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-300 relative bg-gradient-to-br from-background to-accent/10 border border-border/50"
        aria-label={`Category: ${category}`}
      >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none ${bgColor} mix-blend-overlay`} />
        <div className={`absolute top-0 left-0 w-2 h-full ${bgColor} opacity-75 group-hover:opacity-100 transition-opacity`} />
        <CardContent className="p-5">
          <div className="flex items-center gap-4 mb-5">
            <div className={`p-3 rounded-xl ${bgColor} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative shadow-md`}>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-70" />
              <Icon className={`h-7 w-7 ${color}`} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                {t.skills.categories[category.toLowerCase().replace(' & ', '_') as keyof typeof t.skills.categories]}
              </h2>
              <p className="text-sm text-muted-foreground">
                {skills.length} {t.skills.technologies}
              </p>
            </div>
          </div>
          <div className="grid gap-3">
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
        </CardContent>
      </Card>
    </motion.div>
  );
}