import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getStats } from '@/lib/analytics';
import { saveStats, getLatestStats } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Récupérer les stats de Plausible
    const plausibleStats = await getStats();
    
    if (!plausibleStats) {
      throw new Error('Failed to fetch stats from Plausible');
    }

    // Sauvegarder les stats dans la base de données
    await saveStats({
      visitors: plausibleStats.totalVisitors,
      pageviews: plausibleStats.pageViews,
      avg_duration: parseInt(plausibleStats.averageTime.split(':')[0]) * 60 + parseInt(plausibleStats.averageTime.split(':')[1]),
      bounce_rate: plausibleStats.bounceRate
    });

    // Récupérer les dernières stats de la base de données
    const dbStats = await getLatestStats();

    return NextResponse.json({
      ...plausibleStats,
      lastUpdated: dbStats.created_at
    });
  } catch (error) {
    console.error('Error in admin stats route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 