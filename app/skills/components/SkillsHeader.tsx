'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

export function SkillsHeader() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-6"
    >
      <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-purple-500">
        {t.skills.title}
      </h1>
      <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
        {t.skills.subtitle}
      </p>
    </motion.div>
  );
}