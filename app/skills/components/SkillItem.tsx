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
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/90 transition-all duration-300 hover:shadow-md hover:scale-105 backdrop-blur-sm">
        <div className={`p-2 rounded-md bg-background/90 transition-all duration-300 ring-1 ring-border/50 group-hover:ring-primary/50 ${color}`}>
          {Icon && <Icon className={`h-5 w-5 ${color} transition-colors duration-300 group-hover:scale-110`} />}
        </div>
        <span className="font-medium text-base group-hover:text-primary transition-colors duration-200">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}