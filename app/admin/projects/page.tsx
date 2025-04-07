'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  PlusCircle, 
  Pencil, 
  Trash2,
  Eye,
  Search,
  Filter
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  technologies: string[];
  featured: boolean;
  createdAt: string;
}

export default function ProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFeatured, setFilterFeatured] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
    if (status === 'authenticated') {
      fetchProjects();
    }
  }, [status, router]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      console.log('Projets reçus:', data);
      setProjects(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    console.log('ID du projet à supprimer:', id);
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    try {
      const url = `/api/projects/${id}`;
      console.log('URL de suppression:', url);
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Réponse de l\'API:', response.status);
      const data = await response.json();
      console.log('Données de la réponse:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la suppression');
      }

      toast({
        title: "Projet supprimé",
        description: "Le projet a été supprimé avec succès.",
      });

      fetchProjects();
    } catch (error) {
      console.error('Erreur détaillée lors de la suppression:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du projet.",
      });
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterFeatured || project.featured;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Projets</h1>
        <Link href="/admin/projects/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau Projet
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des Projets</CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant={filterFeatured ? "default" : "outline"}
                onClick={() => setFilterFeatured(!filterFeatured)}
              >
                <Filter className="mr-2 h-4 w-4" />
                En vedette
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">Titre</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Technologies</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Statut</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b">
                    <td className="p-4 align-middle">
                      <div className="font-medium">{project.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {project.description.substring(0, 100)}...
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          project.featured
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {project.featured ? 'En vedette' : 'Standard'}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            console.log('Project ID:', project.id);
                            handleDelete(project.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 