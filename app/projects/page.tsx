'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

// Données des projets (inchangées)
const projects = [
  {
    title: 'Rent a Book',
    description: 'The current business i work for , working now on upgrading it to the last version of prestashop and reworking the design aswell',
    image: 'images/rentabook.png',
    tags: ['Prestashop', 'PHP', 'CSS', 'JavaScript'],
    demo: 'https://www.rentabook.be/fr/ecoles',
  },
  {
    title: 'Bosmans tyres',
    description: 'My first solo project for a tyres garage',
    image: 'images/logo-pneus.png',
    tags: ['NextJS', 'Bilingual', 'TailwindCSS'],
    github: 'https://github.com/Slipaclous/bosmans-2.0',
    demo: 'https://www.bosmansbandenpneus.com',
  },
  {
    title: 'Bruxelles-propreté',
    description: 'I worked with a team on this website during my business internship , made in drupal',
    image: 'images/arpgan.png',
    tags: ['Drupal', 'Bootstrap', 'CSS'],
    demo: 'https://arp-gan.be/fr',
  },
  {
    title: 'Fifty-one Enghien',
    description: 'Website for the fifty-one club Enghien. Made for my graduation project',
    image: '/images/fiftyone.png',
    tags: ['Symfony', 'JavaScript', 'MySQL', 'CSS', 'Sass'],
    github: 'https://github.com/Slipaclous/fiftyone',
    demo: 'https://fiftyone-enghien.com',
  }
];

// Variants pour le conteneur et les projets (inchangés)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Variants pour l'animation lettre par lettre
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

export default function ProjectsPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-16 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Header avec animation lettre par lettre */}
      <motion.div
        ref={headerRef}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        variants={titleVariants}
        className="text-center mb-20 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center justify-center gap-3 mb-6 bg-primary/10 px-6 py-2 rounded-full border border-primary/20 shadow-sm"
        >
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <span className="text-primary font-medium">{t.projects.title}</span>
        </motion.div>
        
        {/* Animation lettre par lettre pour le titre */}
        <motion.h1
          variants={titleVariants}
          className="text-5xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-600 pb-2"
        >
          {t.projects.title.split('').map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative"
        >
          <p className="text-muted-foreground text-lg lg:text-xl max-w-3xl mx-auto relative z-10">
            {t.projects.subtitle}
          </p>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full blur-sm"></div>
        </motion.div>
      </motion.div>

      {/* Grid des projets (inchangée) */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 relative z-10"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={projectVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="flex flex-col h-full overflow-hidden group border border-border/60 hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-gradient-to-b hover:from-card/90 hover:to-card/60 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary/0 to-primary/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10"></div>
              <div className="aspect-video relative overflow-hidden flex justify-center items-center bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-primary/20 to-transparent transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative z-10"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-contain w-[65%] h-auto transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md group-hover:drop-shadow-lg"
                  />
                  <div className="absolute -inset-x-10 -bottom-12 h-20 bg-gradient-to-t from-background/40 to-transparent blur-md z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="inline-flex items-center rounded-full bg-primary/30 px-3 py-1 text-xs font-medium text-primary shadow-sm">
                    {project.tags[0]}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2 relative">
                <CardTitle className="text-xl lg:text-2xl group-hover:text-primary transition-colors flex items-center">
                  <span className="relative">
                    {project.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>
                </CardTitle>
                <CardDescription className="line-clamp-2 lg:line-clamp-3 text-muted-foreground/80 mt-2 group-hover:text-muted-foreground transition-colors">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative pb-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                      className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground rounded-md text-xs font-medium border border-border/30 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              </CardContent>
              <CardFooter className="mt-auto pt-4 space-x-3 relative z-10">
                {project.github && (
                  <Button variant="outline" size="sm" className="flex-1 border-border/60 hover:border-primary/70 hover:bg-primary/5 shadow-sm transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center group/btn"
                    >
                      <Github className="mr-2 h-4 w-4 group-hover/btn:text-primary transition-colors" />
                      <span className="relative overflow-hidden">
                        <span className="inline-block transform transition-transform duration-300 group-hover/btn:translate-y-full">
                          {t.projects.viewCode}
                        </span>
                        <span className="absolute top-0 left-0 inline-block transform -translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 text-primary">
                          {t.projects.viewCode}
                        </span>
                      </span>
                    </a>
                  </Button>
                )}
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 shadow-sm transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-mid" asChild>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center group/demo"
                  >
                    <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/demo:rotate-12" />
                    <span className="relative overflow-hidden">
                      <span className="inline-block transform transition-transform duration-300 group-hover/demo:translate-y-full">
                        {t.projects.viewDemo}
                      </span>
                      <span className="absolute top-0 left-0 inline-block transform -translate-y-full group-hover/demo:translate-y-0 transition-transform duration-300">
                        {t.projects.viewDemo}
                      </span>
                    </span>
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}