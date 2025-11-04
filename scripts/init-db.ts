import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Créer la table Stats si elle n'existe pas
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Stats" (
        "id" SERIAL NOT NULL,
        "visitors" INTEGER NOT NULL,
        "pageviews" INTEGER NOT NULL,
        "avg_duration" INTEGER NOT NULL,
        "bounce_rate" DOUBLE PRECISION NOT NULL,
        "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
      );
    `;
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 