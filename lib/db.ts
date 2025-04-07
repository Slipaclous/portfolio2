import { sql } from '@vercel/postgres';

export async function createTables() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_stats (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        visitors INTEGER NOT NULL,
        pageviews INTEGER NOT NULL,
        avg_duration INTEGER NOT NULL,
        bounce_rate DECIMAL(5,2) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

export async function saveStats(stats: {
  visitors: number;
  pageviews: number;
  avg_duration: number;
  bounce_rate: number;
}) {
  try {
    await sql`
      INSERT INTO site_stats (date, visitors, pageviews, avg_duration, bounce_rate)
      VALUES (CURRENT_DATE, ${stats.visitors}, ${stats.pageviews}, ${stats.avg_duration}, ${stats.bounce_rate})
    `;
    console.log('Stats saved successfully');
  } catch (error) {
    console.error('Error saving stats:', error);
    throw error;
  }
}

export async function getLatestStats() {
  try {
    const result = await sql`
      SELECT * FROM site_stats
      ORDER BY date DESC
      LIMIT 1
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching latest stats:', error);
    throw error;
  }
} 