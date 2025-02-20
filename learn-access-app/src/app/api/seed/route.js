import { db } from '@vercel/postgres';

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
      expiration TIMESTAMP NULL,
      previousLevelId INTEGER NULL,
      enhancedDescription TEXT NOT NULL
    );
  `;
}

async function seedUserLevels() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS user_levels (
      id SERIAL PRIMARY KEY,
      userID INTEGER NOT NULL,
      levelID INTEGER NOT NULL,
      datetime TIMESTAMP NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (levelId) REFERENCES levels(id) ON DELETE CASCADE
    );
  `;
}

async function seedLevelFiles() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS level_files (
        id SERIAL PRIMARY KEY,
        levelId INTEGER NOT NULL,
        name VARCHAR(50) NOT NULL,
        fileType TEXT NOT NULL CHECK (fileType IN ('js', 'css')),
        content TEXT NOT NULL,
        readOnly boolean NOT NULL,
        FOREIGN KEY (levelId) REFERENCES levels(id) ON DELETE CASCADE
        );
    `;
}

async function seedLevelHints() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS level_hints (
        id SERIAL PRIMARY KEY,
        levelId INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        FOREIGN KEY (levelId) REFERENCES levels(id) ON DELETE CASCADE
        );
    `;
}

async function seedLevelTests() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS level_tests (
        id SERIAL PRIMARY KEY,
        levelId INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        type TEXT NOT NULL,
        code TEXT NOT NULL,
        FOREIGN KEY (levelId) REFERENCES levels(id) ON DELETE CASCADE
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
      await seedLevels();
      await seedUserLevels();
      await seedLevelFiles();
      await seedLevelHints();
      await seedLevelTests();
      await client.sql`COMMIT`;

      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
}
