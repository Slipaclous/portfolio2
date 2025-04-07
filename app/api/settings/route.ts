import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst();
    return NextResponse.json(settings || {
      siteName: 'Mon Portfolio',
      siteDescription: 'Un portfolio personnel',
      contactEmail: '',
      enableContactForm: true,
      maintenanceMode: false,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des paramètres:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des paramètres' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const settings = await prisma.settings.upsert({
      where: {
        id: 1,
      },
      update: data,
      create: {
        id: 1,
        ...data,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Erreur lors de la mise à jour des paramètres:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des paramètres' },
      { status: 500 }
    );
  }
} 