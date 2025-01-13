import { db } from '@vercel/postgres';

//TODO set up for local db too

const client = await db.connect();

async function seedUsers() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password TEXT NOT NULL
    );
  `;
}

export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedUsers();
      await client.sql`COMMIT`;

      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
}