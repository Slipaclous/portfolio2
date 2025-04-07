import { NextResponse } from 'next/server';

const PLAUSIBLE_API_KEY = process.env.PLAUSIBLE_API_KEY;
const SITE_ID = process.env.PLAUSIBLE_SITE_ID;

export async function getStats() {
  try {
    const response = await fetch(
      `https://plausible.io/api/v1/stats/aggregate?site_id=${SITE_ID}&period=30d&metrics=visitors,pageviews,avg_duration,bounce_rate`,
      {
        headers: {
          Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    const data = await response.json();
    
    return {
      totalVisitors: data.results.visitors.value,
      pageViews: data.results.pageviews.value,
      averageTime: formatDuration(data.results.avg_duration.value),
      bounceRate: data.results.bounce_rate.value,
      lastUpdated: new Date(),
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