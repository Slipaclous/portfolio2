'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

const projects = [
  {
    title: 'Rent a Book',
    description: 'The current business i work for , working now on upgrading it to the last version of prestashop and reworking the design aswell',
    image: 'images/rentabook.png',
    tags: ['Prestashop', 'PHP', 'CSS', 'JavaScript'],
    demo: 'https://www.rentabook.be/fr/',
  },{
    title: 'Bosmans tyres',
    description: 'My first solo project for a tyres garage',
    image: 'images/logo-pneus.png',
    tags: ['NextJS', 'Bilingual', 'TailwindCSS'],
    github: 'https://github.com/Slipaclous/bosmans-2.0',
    demo: 'https://www.bosmansbandenpneus.com',
  },{
    title: 'Bruxelles-propreté',
    description: 'I worked with a team on this website during my business internship , made in drupal',
    image: 'images/arpgan.png',
    tags: ['Drupal', 'Bootstrap', 'CSS'],
    demo: 'https://arp-gan.be/fr',
  },{
    title: 'Fifty-one Enghien',
    description: 'Website for the fifty-one club Enghien. Made for my graduation project',
    image: '/images/fiftyone.png',
    tags: ['Symfony', 'JavaScript', 'MySQL', 'CSS', 'Sass'],
    github: 'https://github.com/Slipaclous/fiftyone',
    demo: 'https://fiftyone-enghien.com',
  }
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
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center gap-3 mb-4 bg-primary/10 px-6 py-2 rounded-full">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-primary font-medium">{t.projects.title}</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          {t.projects.title}
        </h1>
        <p className="text-muted-foreground text-lg lg:text-xl max-w-3xl mx-auto">
          {t.projects.subtitle}
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8"
      >
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={projectVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="flex flex-col h-full overflow-hidden group border border-border/60 hover:border-primary/50 shadow-sm hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm">
              <div className="aspect-video relative overflow-hidden flex justify-center items-center bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-primary/20 to-transparent transition-opacity duration-300" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-contain w-[60%] h-auto transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center rounded-full bg-primary/20 px-2 py-1 text-xs text-primary">
                    {project.tags[0]}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 lg:line-clamp-3 text-muted-foreground/80">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-secondary/70 text-secondary-foreground rounded-md text-xs font-medium border border-border/40 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto pt-6 space-x-3">
                {project.github && (
                  <Button variant="outline" size="sm" className="flex-1 border-border/60 hover:border-primary/50 hover:bg-primary/5" asChild>
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
                )}
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" asChild>
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

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-16 text-center"
      >
        
      </motion.div>
    </div>
  );
}