'use client';

import { motion } from 'framer-motion';
import { type Skill } from '../data/skills';

interface SkillItemProps {
  skill: Skill;
  color: string;
  index: number;
  inView: boolean;
}

export function SkillItem({ skill, color, index, inView }: SkillItemProps) {
  const Icon = skill.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/80 transition-all duration-300 hover:translate-x-2 backdrop-blur-sm">
        <div className={`p-1.5 rounded-lg bg-background/80 transition-all duration-300 ring-1 ring-border ${color}`}>
          {Icon && <Icon className={`h-4 w-4 ${color} transition-colors duration-300`} />}
        </div>
        <span className="font-medium text-base group-hover:text-primary transition-colors">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}