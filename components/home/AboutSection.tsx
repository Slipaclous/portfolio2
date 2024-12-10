'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Globe2, Smartphone, Code2, Database, Languages, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { language } = useLanguage();
  const t = translations[language];

  const skills = [
    { icon: Globe2, label: t.about.skills.bilingual, color: 'text-blue-500' },
    { icon: Smartphone, label: t.about.skills.responsive, color: 'text-purple-500' },
    { icon: Code2, label: t.about.skills.frontend, color: 'text-green-500' },
    { icon: Database, label: t.about.skills.backend, color: 'text-orange-500' },
    { icon: Languages, label: t.about.skills.frameworks, color: 'text-pink-500' },
    { icon: Lightbulb, label: t.about.skills.problemSolving, color: 'text-yellow-500' },
  ];

  return (
    <div className="min-h-screen flex items-center bg-background py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mx-auto px-6"
      >
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <CardContent className="p-8 pt-10">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  {t.about.title}
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-4 text-muted-foreground"
                >
                  {t.about.description.map((paragraph, index) => (
                    <p key={index} className="text-lg">{paragraph}</p>
                  ))}
                </motion.div>
              </div>

              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  {t.about.keySkills}
                </motion.h2>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="space-y-4"
                >
                  {skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.label}
                        variants={skillVariants}
                        className="flex items-center gap-4 p-4 rounded-lg bg-accent/50 hover:bg-accent/80 transition-all hover:translate-x-2"
                      >
                        <Icon className={`h-6 w-6 ${skill.color}`} />
                        <span className="font-medium">{skill.label}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}