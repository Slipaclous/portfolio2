'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  LogOut,
  PlusCircle,
  Pencil,
  Trash2
} from 'lucide-react';

export function AdminNav() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Administration
        </h2>
        <div className="space-y-1">
          <Link
            href="/admin/dashboard"
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive('/admin/dashboard') ? "bg-accent" : "transparent"
            )}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Tableau de bord
          </Link>
          <Link
            href="/admin/projects"
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive('/admin/projects') ? "bg-accent" : "transparent"
            )}
          >
            <FolderKanban className="mr-2 h-4 w-4" />
            Projets
          </Link>
          <Link
            href="/admin/settings"
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive('/admin/settings') ? "bg-accent" : "transparent"
            )}
          >
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </Link>
        </div>
      </div>
    </div>
  );
} 