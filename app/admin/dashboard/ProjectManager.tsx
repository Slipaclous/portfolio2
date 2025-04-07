"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectManager() {
  const { language } = useLanguage();
  const t = translations[language].admin.projects;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    imageUrl: "",
    technologies: [],
    githubUrl: "",
    liveUrl: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      if (!response.ok) throw new Error("Erreur lors du chargement des projets");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError("Erreur lors du chargement des projets");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/projects", {
        method: editingProject ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject || newProject),
      });

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");
      
      await fetchProjects();
      setEditingProject(null);
      setNewProject({
        title: "",
        description: "",
        imageUrl: "",
        technologies: [],
        githubUrl: "",
        liveUrl: ""
      });
    } catch (err) {
      setError("Erreur lors de la sauvegarde");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");
      
      await fetchProjects();
    } catch (err) {
      setError("Erreur lors de la suppression");
    }
  };

  if (loading) return <div>{t.loading}</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {editingProject ? t.editProject : t.addProject}
          </CardTitle>
          <CardDescription>
            {editingProject ? t.editDescription : t.addDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.title}</label>
                <Input
                  value={editingProject?.title || newProject.title}
                  onChange={(e) => {
                    if (editingProject) {
                      setEditingProject({ ...editingProject, title: e.target.value });
                    } else {
                      setNewProject({ ...newProject, title: e.target.value });
                    }
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.imageUrl}</label>
                <Input
                  value={editingProject?.imageUrl || newProject.imageUrl}
                  onChange={(e) => {
                    if (editingProject) {
                      setEditingProject({ ...editingProject, imageUrl: e.target.value });
                    } else {
                      setNewProject({ ...newProject, imageUrl: e.target.value });
                    }
                  }}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.description}</label>
              <Textarea
                value={editingProject?.description || newProject.description}
                onChange={(e) => {
                  if (editingProject) {
                    setEditingProject({ ...editingProject, description: e.target.value });
                  } else {
                    setNewProject({ ...newProject, description: e.target.value });
                  }
                }}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.githubUrl}</label>
                <Input
                  value={editingProject?.githubUrl || newProject.githubUrl}
                  onChange={(e) => {
                    if (editingProject) {
                      setEditingProject({ ...editingProject, githubUrl: e.target.value });
                    } else {
                      setNewProject({ ...newProject, githubUrl: e.target.value });
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.liveUrl}</label>
                <Input
                  value={editingProject?.liveUrl || newProject.liveUrl}
                  onChange={(e) => {
                    if (editingProject) {
                      setEditingProject({ ...editingProject, liveUrl: e.target.value });
                    } else {
                      setNewProject({ ...newProject, liveUrl: e.target.value });
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              {editingProject && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingProject(null)}
                >
                  <X className="h-4 w-4 mr-2" />
                  {t.cancel}
                </Button>
              )}
              <Button type="submit">
                {editingProject ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {t.save}
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    {t.add}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingProject(project)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 