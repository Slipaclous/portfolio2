'use client';

import { Home, Code2, FolderGit2, User, Mail, Github, Linkedin, Gamepad } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

interface SidebarProps {
  isMobile?: boolean;
  onNavigate?: () => void;
}

const menuItems = [
  { icon: Home, href: '/' },
  { icon: Code2, href: '/skills' },
  { icon: FolderGit2, href: '/projects' },
  { icon: User, href: '/about' },
  { icon: Mail, href: '/contact' },
  { icon: Gamepad, href: '/games' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'text-violet-400' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'text-blue-400' },
];

export default function Sidebar({ isMobile, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language];

  const handleClick = () => {
    if (isMobile && onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside className={cn(
      "h-screen w-64 bg-card border-r border-border p-6 text-card-foreground",
      isMobile ? "" : "fixed left-0 top-0 hidden md:block"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-2 ring-primary/20">
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <img src="images/no_padding-removebg-preview.png" alt="" />
          <div className="flex gap-2 mb-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.href}
                  variant="ghost"
                  size="icon"
                  asChild
                  className={`hover:${social.color}`}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon size={20} className={social.color} />
                  </a>
                </Button>
              );
            })}
          </div>
          <LanguageSwitcher />
        </div>
        
        <nav className="space-y-1 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const navKey = item.href === '/' ? 'home' : item.href.replace('/', '');
            const label = t.nav[navKey as keyof typeof t.nav];
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                )}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">© 2024 All rights reserved</p>
        </div>
      </div>
    </aside>
  );
}