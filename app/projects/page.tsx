'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';
import { Project } from '@/lib/projectTypes';

const projects: Project[] = [
  {
    title: 'MG Event',
    descriptionKey: 'mgEvent',
    image: '/images/no_padding-removebg-preview.png',
    tags: ['NextJS', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    demo: 'https://mgevent-ycs5.vercel.app',
  },
  {
    title: 'Amarea Wedding Planner',
    descriptionKey: 'amarea',
    image: '/images/amarea.png',
    tags: ['NextJS', 'TailwindCSS', 'React'],
    demo: 'https://amarea.vercel.app',
  },
  {
    title: 'Cabinet Podologie Leonardi',
    descriptionKey: 'leonardi',
    image: '/images/JPL-removebg-preview.png',
    tags: ['NextJS', 'TailwindCSS', 'React'],
    demo: 'https://www.leonardi-podologue.com',
  },
  {
    title: 'Rent a Book',
    descriptionKey: 'rentabook',
    image: 'images/rentabook.png',
    tags: ['Prestashop', 'PHP', 'CSS', 'JavaScript'],
    demo: 'https://www.rentabook.be/fr/ecoles',
  },
  {
    title: 'Bosmans Tyres',
    descriptionKey: 'bosmans',
    image: 'images/logo-pneus.png',
    tags: ['NextJS', 'Bilingual', 'TailwindCSS'],
    github: 'https://github.com/Slipaclous/bosmans-2.0',
    demo: 'https://www.bosmansbandenpneus.com',
  },
  {
    title: 'Bruxelles-propreté',
    descriptionKey: 'bruxelles',
    image: 'images/arpgan.png',
    tags: ['Drupal', 'Bootstrap', 'CSS'],
    demo: 'https://arp-gan.be/fr',
  },
  {
    title: 'Fifty-one Enghien',
    descriptionKey: 'fiftyone',
    image: '/images/fiftyone.png',
    tags: ['Symfony', 'JavaScript', 'MySQL', 'CSS', 'Sass'],
    github: 'https://github.com/Slipaclous/fiftyone',
    demo: 'https://fiftyone-enghien.com',
  }
];

export default function ProjectsPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
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
              Portfolio
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            {t.projects.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-neutral-400 max-w-2xl"
          >
            {t.projects.subtitle}
          </motion.p>
        </motion.div>

        {/* Grid projets - 2 colonnes équilibrées */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

              {/* Card */}
              <div className="relative h-full rounded-xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm overflow-hidden group-hover:border-cyan-500/50 transition-all duration-300">
                {/* Image container avec meilleur contraste */}
                <div className="relative h-48 flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800/50 border-b border-neutral-800 group-hover:border-cyan-500/30 transition-colors duration-300">
                  {/* Background pattern subtil */}
                  <div 
                    className="absolute inset-0 opacity-5" 
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgb(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(255, 255, 255, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }} 
                  />
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="relative z-10 max-h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge techno */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-neutral-700">
                    <span className="text-xs font-mono text-cyan-400">
                      {project.tags[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Titre */}
                  <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">
                    {t.projects[project.descriptionKey]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(1).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-neutral-900/80 text-neutral-400 border border-neutral-800 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 font-medium text-sm"
                    >
                      {t.projects.viewDemo}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 text-sm font-medium text-neutral-400 hover:text-neutral-300"
                      >
                        <Github className="h-4 w-4" />
                          {t.projects.viewCode}
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom line effect */}
                <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-500" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="relative group inline-block">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card */}
            <div className="relative rounded-xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm p-10 group-hover:border-cyan-500/50 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-3 text-white">
                {t.projects.cta?.title || 'Un projet en tête ?'}
              </h3>
              <p className="text-neutral-400 mb-6">
                {t.projects.cta?.subtitle || 'Discutons-en autour d\'un café ☕'}
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/50 font-medium hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300">
                {t.projects.cta?.button || 'Me contacter'}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}