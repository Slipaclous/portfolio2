'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

const projects = [
  {
    title: 'Fifty-one Enghien',
    description: 'Website for the fifty-one club Enghien. Made for my graduation project',
    image: '/images/fiftyone.png',
    tags: ['Symfony , javascript , MySQL,CSS,Sass'],
    github: 'https://github.com/Slipaclous/fiftyone',
    demo: 'https://fiftyone-enghien.com',
  },
  {
    title: 'Bosmans tyres',
    description: 'My first solo project for a tyres garage',
    image: 'images/logo-pneus.png',
    tags: ['NextJS , bilingual, tailwindCSS'],
    github: 'https://github.com/Slipaclous/bosmans-2.0',
    demo: 'https://www.bosmansbandenpneus.com',
  },
  {
    title: 'Bruxelles-propreté',
    description: 'I worked with a team on this website during my business internship , made in drupal',
    image: 'images/arpgan.png',
    tags: ['Drupal , bootstrap , CSS'],
    demo: 'https://arp-gan.be/fr',
  },
  {
    title: 'Rent a Book',
    description: 'The current business i work for , working now on upgrading it to the last version of prestashop and rewxorking the design aswell',
    image: 'images/rentabook.png',
    tags: ['Prestashop, php , CSS , javascript'],
    demo: 'https://www.rentabook.be/fr/ecoles',
  },
];

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

export default function ProjectsPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl lg:text-5xl font-bold">{t.projects.title}</h1>
        </div>
        <p className="text-muted-foreground text-lg lg:text-xl max-w-3xl mx-auto">
          {t.projects.subtitle}
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={projectVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="flex flex-col h-full overflow-hidden group">
              <div className="aspect-video relative overflow-hidden flex justify-center items-center">
                <div className="absolute inset-0 group-hover:bg-primary/0 transition-colors duration-300" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-contain w-[50%] h-auto transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 lg:line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs lg:text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto pt-6 space-x-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    {t.projects.viewCode}
                  </a>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t.projects.viewDemo}
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
