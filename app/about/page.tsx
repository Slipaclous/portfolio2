'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gamepad2, Music4, Cat, Users } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from 'react';

const interests = [
  {
    key: 'gaming',
    icon: Gamepad2,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    size: 'lg'
  },
  {
    key: 'music',
    icon: Music4,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    size: 'sm'
  },
  {
    key: 'cats',
    icon: Cat,
    image: '/images/charles.jpg',
    size: 'sm'
  },
  {
    key: 'social',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    size: 'lg'
  }
];

export default function AboutPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {/* Label avec ligne */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
            <span className="text-cyan-400 text-sm font-mono tracking-wider uppercase">
              Interests
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            {t.interests.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-neutral-400 max-w-2xl"
          >
            {t.interests.subtitle}
          </motion.p>
        </motion.div>

        {/* Grid interests */}
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            const interestContent = t.interests[interest.key as keyof typeof t.interests];

            if (typeof interestContent === 'string') {
              console.error(`Unexpected translation format for key: ${interest.key}`);
              return null;
            }

            return (
              <motion.article
                key={interest.key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group ${interest.size === 'lg' ? 'md:col-span-2' : ''}`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                {/* Card */}
                <div className="relative h-full rounded-xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm overflow-hidden group-hover:border-cyan-500/50 transition-all duration-300">
                  {/* Image container */}
                  <div className="relative h-56 overflow-hidden">
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                    
                    {/* Image */}
                    <img
                      src={interest.image}
                      alt={interestContent.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Header sur image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="flex items-center gap-3">
                        {/* Icon avec glow */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-cyan-500/30 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="relative p-3 rounded-lg bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 group-hover:border-cyan-500/50 transition-colors">
                            <Icon className="h-5 w-5 text-cyan-400" />
                          </div>
                        </div>
                        
                        {/* Titre */}
                        <h2 className="text-2xl font-bold text-white">
                          {interestContent.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Description */}
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {interestContent.description}
                    </p>

                    {/* Details list */}
                    <ul className="space-y-2 pt-2">
                      {interestContent.details.map((detail: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, i: Key | null | undefined) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-neutral-400 group/item"
                        >
                          {/* Dot avec glow */}
                          <div className="relative mt-1.5">
                            <div className="absolute inset-0 bg-cyan-500/30 blur-sm rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            <span className="relative block h-1.5 w-1.5 rounded-full bg-cyan-500/50 group-hover/item:bg-cyan-400 transition-colors" />
                          </div>
                          
                          <span className="flex-1 group-hover/item:text-neutral-300 transition-colors">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom line effect */}
                  <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-700" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}