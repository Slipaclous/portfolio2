import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        featured: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des projets' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log('Session non trouvée');
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Récupérer l'utilisateur actuel
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    });

    if (!user) {
      console.log('Utilisateur non trouvé pour l\'email:', session.user?.email);
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    const data = await request.json();
    console.log('Données reçues pour la création du projet:', data);

    // Validation des données requises
    if (!data.title || !data.description) {
      console.log('Données manquantes:', { title: data.title, description: data.description });
      return NextResponse.json(
        { error: 'Le titre et la description sont requis' },
        { status: 400 }
      );
    }

    // Préparation des données
    const projectData = {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl || null,
      githubUrl: data.githubUrl || null,
      demoUrl: data.demoUrl || null,
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
      featured: Boolean(data.featured),
      userId: user.id,
    };

    console.log('Données préparées pour la création:', projectData);

    const project = await prisma.project.create({
      data: projectData,
    });

    console.log('Projet créé avec succès:', project);
    return NextResponse.json(project);
  } catch (error) {
    console.error('Erreur détaillée lors de la création du projet:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
} 