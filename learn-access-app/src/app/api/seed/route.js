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
      instructions TEXT NOT NULL,
      expiration DATETIME
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

async function seedPosts() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        userId INTEGER NOT NULL,
        levelId INTEGER NOT NULL,
        datetime TIMESTAMP NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (levelId) REFERENCES levels(id) ON DELETE CASCADE
    );
  `;
}

async function seedPostFiles() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS post_files (
        id SERIAL PRIMARY KEY,
        postId INTEGER NOT NULL,
        name VARCHAR(50) NOT NULL,
        fileType TEXT NOT NULL CHECK (fileType IN ('js', 'css')),
        content TEXT NOT NULL,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
        );
    `;
}

async function seedComments() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        postId INTEGER NOT NULL,
        userId INTEGER NOT NULL,
        datetime TIMESTAMP NOT NULL,
        message TEXT NOT NULL,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        );
    `;
}

async function seedLikes() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        userId INTEGER NOT NULL,
        postId INTEGER NULL,
        commentId INTEGER NULL,
        datetime TIMESTAMP NOT NULL,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (commentId) REFERENCES comments(id) ON DELETE CASCADE
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
      await seedPosts();
      await seedPostFiles();
      await seedComments();
      await seedLikes();
      await client.sql`COMMIT`;

      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
}
