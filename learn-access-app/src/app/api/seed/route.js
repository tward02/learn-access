import { db } from '@vercel/postgres';

//TODO set up for local db too + setup token auth for this endpoint

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

export async function GET(request) {

    // Extract the 'Authorization' header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return Response.json({ error: 'Authorization header missing or invalid' }, { status: 401 });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    // Validate the token (if needed)
    if (!token) {
        return Response.json({ error: 'Token is missing' }, { status: 401 });
    }

    if (process.env.ADMIN_SECRET !== token) {
        return Response.json({ error: "You do not have permission to do this" }, {status: 403});
    }

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