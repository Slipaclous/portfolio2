import {
  Code2,
  Database,
  GitBranch,
  Layout,
  Palette,
  Globe2,
  Server,
  Braces,
  Store,
  FileCode2,
  Blocks,
  Cpu,
  Box,
  Hammer,
} from 'lucide-react';

export interface Skill {
  name: string;
  icon: typeof Code2;
}

export interface SkillCategory {
  category: string;
  icon: typeof Layout;
  color: string;
  bgColor: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: Layout,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    skills: [
      { name: 'HTML', icon: FileCode2 },
      { name: 'CSS', icon: Palette },
      { name: 'JavaScript', icon: Braces },
      { name: 'React', icon: Code2 },
      { name: 'Next.js', icon: Box },
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    skills: [
      { name: 'PHP', icon: Code2 },
      { name: 'Symfony', icon: Blocks },
      { name: 'SQL', icon: Database },
    ],
  },
  {
    category: 'Cms',
    icon: Store,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    skills: [
      { name: 'PrestaShop', icon: Store },
      { name: 'Drupal', icon: Globe2 },
    ],
  },
  {
    category: 'Tools',
    icon: Hammer,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    skills: [
      { name: 'Git', icon:GitBranch},
      { name: 'Bootstrap', icon: Palette },
      { name: 'Tailwind', icon: Palette },
      { name: 'SASS', icon: Palette },
      { name: 'AI Integration', icon: Cpu },
    ],
  },
];