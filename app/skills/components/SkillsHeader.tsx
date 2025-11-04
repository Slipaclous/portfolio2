'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

export function SkillsHeader() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="mb-16">
      {/* Label avec ligne */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
        <span className="text-cyan-400 text-sm font-mono tracking-wider uppercase">
          Skills
        </span>
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-6xl font-bold text-white mb-6"
      >
        {t.skills.title}
      </motion.h1>

      {/* Sous-titre */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-neutral-400 max-w-2xl"
      >
        {t.skills.subtitle}
      </motion.p>
    </div>
  );
}