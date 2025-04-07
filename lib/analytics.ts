import { NextResponse } from 'next/server';

interface PlausibleStats {
  totalVisitors: number;
  pageViews: number;
  averageTime: string;
  bounceRate: number;
}

export async function getStats(): Promise<PlausibleStats | null> {
  try {
    const response = await fetch(
      `https://plausible.io/api/v1/stats/aggregate?site_id=${process.env.PLAUSIBLE_SITE_ID}&period=30d&metrics=visitors,pageviews,avg_duration,bounce_rate`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch stats from Plausible');
    }

    const data = await response.json();
    
    // Convertir la durée moyenne de secondes en format MM:SS
    const avgDurationSeconds = Math.round(data.results.avg_duration.value);
    const minutes = Math.floor(avgDurationSeconds / 60);
    const seconds = avgDurationSeconds % 60;
    const averageTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return {
      totalVisitors: data.results.visitors.value,
      pageViews: data.results.pageviews.value,
      averageTime,
      bounceRate: Math.round(data.results.bounce_rate.value * 100),
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
} 