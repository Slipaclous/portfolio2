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
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group/item"
    >
      <div className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-neutral-800 hover:bg-neutral-900/50 transition-all duration-300">
        {/* Icon */}
        {Icon && (
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
            <Icon className="relative h-4 w-4 text-cyan-400/70 group-hover/item:text-cyan-400 transition-colors" />
          </div>
        )}

        {/* Label */}
        <span className="text-sm font-medium text-neutral-300 group-hover/item:text-white transition-colors">
          {skill.name}
        </span>

        {/* Decorative dot */}
        <div className="ml-auto h-1 w-1 rounded-full bg-cyan-500/30 group-hover/item:bg-cyan-400 group-hover/item:shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300" />
      </div>
    </motion.div>
  );
}