'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Send, Linkedin, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

const contactMethods = [
  {
    icon: Mail,
    title: 'email',
    value: 'gauthier.minor@gmail.com',
    href: 'mailto:gauthier.minor@gmail.com',
  },
  {
    icon: Linkedin,
    title: 'social',
    value: 'LinkedIn Profile',
    href: 'https://be.linkedin.com/in/gauthier-minor-a0a4a229b',
    external: true,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { language } = useLanguage();
  const t = translations[language];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-6">
      <div className="max-w-4xl mx-auto">
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
              Contact
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            {t.contact.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-neutral-400"
          >
            {t.contact.subtitle || 'Discutons de votre projet'}
          </motion.p>
        </motion.div>

        {/* Contact methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                {/* Card */}
                <a
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  className="relative block p-5 rounded-lg border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm group-hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon avec glow */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-3 rounded-lg bg-neutral-900 border border-neutral-800 group-hover:border-cyan-500/50 transition-colors">
                        <Icon className="h-5 w-5 text-cyan-400" />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                        {method.value}
                        {method.external && <ExternalLink className="h-3 w-3" />}
                      </div>
                    </div>
                  </div>

                  {/* Bottom line effect */}
                  <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-500" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Form */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10" />

          {/* Card */}
          <div className="relative rounded-xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm p-8 group-hover:border-cyan-500/50 transition-colors duration-500">
            {/* Form header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {t.contact.form.title}
              </h2>
              <p className="text-sm text-neutral-400">
                {t.contact.form.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300">
                    {t.contact.form.name}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/50 border border-neutral-800 text-white placeholder:text-neutral-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder={t.contact.form.namePlaceholder || 'Votre nom'}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                    {t.contact.form.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/50 border border-neutral-800 text-white placeholder:text-neutral-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder={t.contact.form.emailPlaceholder || 'votre@email.com'}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-900/50 border border-neutral-800 text-white placeholder:text-neutral-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                  placeholder={t.contact.form.messagePlaceholder || 'Parlez-moi de votre projet...'}
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/50 font-medium hover:bg-cyan-500/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    {t.contact.form.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t.contact.form.send}
                  </>
                )}
              </button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-cyan-400 flex items-center gap-2"
                >
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  {t.contact.form.success}
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400 flex items-center gap-2"
                >
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  {t.contact.form.error}
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}