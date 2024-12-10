'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Phone, Send, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

const contactMethods = [
  {
    icon: Mail,
    title: 'email',
    value: 'gauthier.minor@gmail.com',
    href: 'mailto:gauthier.minor@gmail.com',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Linkedin,
    title: 'social',
    value: 'LinkedIn Profile',
    href: 'https://be.linkedin.com/in/gauthier-minor-a0a4a229b',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          {t.contact.title}
        </h1>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${method.bgColor} transform group-hover:scale-110 transition-all duration-300`}>
                        <Icon className={`h-6 w-6 ${method.color}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg capitalize mb-1">
                          {t.contact[method.title as keyof typeof t.contact]}
                        </h3>
                        <a
                          href={method.href}
                          target={method.external ? "_blank" : undefined}
                          rel={method.external ? "noopener noreferrer" : undefined}
                          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                        >
                          {method.value}
                          {method.external && <ExternalLink className="h-3 w-3" />}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl font-bold mb-2">
                {t.contact.form.title}
              </CardTitle>
              <p className="text-muted-foreground">
                {t.contact.form.subtitle}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t.contact.form.name}
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-accent/50 border-accent"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t.contact.form.email}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-accent/50 border-accent"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t.contact.form.message}
                  </label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-accent/50 border-accent resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  size="lg"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {t.contact.form.send}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}