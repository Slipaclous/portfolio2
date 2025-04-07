import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Stats {
  visitors: number;
  pageviews: number;
  avg_duration: number;
  bounce_rate: number;
}

export async function saveStats(stats: Stats) {
  try {
    await prisma.stats.create({
      data: {
        visitors: stats.visitors,
        pageviews: stats.pageviews,
        avg_duration: stats.avg_duration,
        bounce_rate: stats.bounce_rate,
      },
    });
  } catch (error) {
    console.error('Error saving stats:', error);
  }
}

export async function getLatestStats() {
  try {
    return await prisma.stats.findFirst({
      orderBy: {
        created_at: 'desc',
      },
    });
  } catch (error) {
    console.error('Error getting latest stats:', error);
    return null;
  }
} 