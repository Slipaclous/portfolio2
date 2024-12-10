'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Gamepad2, Music4, Cat, Users } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

const interests = [
  {
    key: 'gaming',
    icon: Gamepad2,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    size: 'lg'
  },
  {
    key: 'music',
    icon: Music4,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    size: 'sm'
  },
  {
    key: 'cats',
    icon: Cat,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    image: '/images/charles.jpg',
    size: 'sm'
  },
  {
    key: 'social',
    icon: Users,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
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
    <div className="min-h-screen py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
          {t.interests.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.interests.subtitle}
        </p>
      </motion.div>

      <div 
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4"
      >
        {interests.map((interest, index) => {
          const Icon = interest.icon;
          const interestContent = t.interests[interest.key as keyof typeof t.interests];
          
          return (
            <motion.div
              key={interest.key}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${interest.size === 'lg' ? 'md:col-span-2' : ''}`}
            >
              <Card className="group h-full hover:shadow-xl transition-all duration-500 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <img
                      src={interest.image}
                      alt={interestContent.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                      <div className="flex items-center gap-3 text-white">
                        <div className={`p-2 rounded-lg ${interest.bgColor}`}>
                          <Icon className={`h-6 w-6 ${interest.color}`} />
                        </div>
                        <h2 className="text-xl font-semibold">{interestContent.title}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4">{interestContent.description}</p>
                    <ul className="space-y-2">
                      {interestContent.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${interest.bgColor}`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}