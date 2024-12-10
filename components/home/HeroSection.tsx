'use client';

import { Typewriter } from 'react-simple-typewriter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 back bg-top"
        style={{
          backgroundImage: 'url(/images/profiles.jpg)',
          backgroundSize: 'cover',
          filter: 'brightness(0.3)',
          
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          <span className="text-white">
            <Typewriter
              words={t.hero.roles}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}