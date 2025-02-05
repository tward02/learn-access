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

async function seedLevels() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS levels (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      objectives TEXT NOT NULL,
      instructions TEXT NOT NULL
    );
  `;
}

async function seedUserLevels() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS user_levels (
      id SERIAL PRIMARY KEY,
      userID INTEGER NOT NULL FOREIGN KEY,
      levelID INTEGER NOT NULL FOREIGN KEY,
      timestamp DATETIME NOT NULL
    );
  `;
}

export async function GET(request) {

    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return Response.json({ error: 'Authorization header missing or invalid' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

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