'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  technologies: string[];
  featured: boolean;
}

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState<Project>({
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    githubUrl: '',
    demoUrl: '',
    technologies: [],
    featured: false,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
    if (status === 'authenticated' && params.id !== 'new') {
      fetchProject();
    } else if (params.id === 'new') {
      setLoading(false);
    }
  }, [status, router, params.id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`);
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error('Erreur lors de la récupération du projet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const method = params.id === 'new' ? 'POST' : 'PUT';
      const url = params.id === 'new' ? '/api/projects' : `/api/projects/${params.id}`;

      console.log('Envoi des données:', {
        method,
        url,
        project: {
          ...project,
          technologies: project.technologies || [],
          featured: Boolean(project.featured),
        }
      });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...project,
          technologies: project.technologies || [],
          featured: Boolean(project.featured),
        }),
      });

      const data = await response.json();
      console.log('Réponse du serveur:', {
        status: response.status,
        data
      });

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la sauvegarde');
      }

      router.push('/admin/projects');
    } catch (error) {
      console.error('Erreur détaillée lors de la sauvegarde:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim());
    setProject(prev => ({ ...prev, technologies }));
  };

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
        <h1 className="text-3xl font-bold">
          {params.id === 'new' ? 'Nouveau Projet' : 'Modifier le Projet'}
        </h1>
        <Button variant="outline" onClick={() => router.push('/admin/projects')}>
          Annuler
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du Projet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={project.title}
                onChange={(e) => setProject(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={project.description}
                onChange={(e) => setProject(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL de l'Image</Label>
              <Input
                id="imageUrl"
                value={project.imageUrl || ''}
                onChange={(e) => setProject(prev => ({ ...prev, imageUrl: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUrl">URL GitHub</Label>
              <Input
                id="githubUrl"
                value={project.githubUrl || ''}
                onChange={(e) => setProject(prev => ({ ...prev, githubUrl: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demoUrl">URL de la Démo</Label>
              <Input
                id="demoUrl"
                value={project.demoUrl || ''}
                onChange={(e) => setProject(prev => ({ ...prev, demoUrl: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (séparées par des virgules)</Label>
              <Input
                id="technologies"
                value={project.technologies.join(', ')}
                onChange={handleTechnologiesChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={project.featured}
                onCheckedChange={(checked) => setProject(prev => ({ ...prev, featured: checked }))}
              />
              <Label htmlFor="featured">Projet en vedette</Label>
            </div>

            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {params.id === 'new' ? 'Créer' : 'Mettre à jour'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 