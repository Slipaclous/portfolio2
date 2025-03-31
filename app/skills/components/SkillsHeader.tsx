'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

export function SkillsHeader() {
  const { language } = useLanguage();
  const t = translations[language];

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={titleVariants}
      className="text-center py-8 md:py-12"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-purple-500">
        {t.skills.title.split('').map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto"
      >
        {t.skills.subtitle}
      </motion.p>
    </motion.div>
  );
}