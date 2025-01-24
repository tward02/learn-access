import {db} from '@vercel/postgres';

//TODO set up for local db too + setup token auth for this endpoint

const client = await db.connect();

export const createUser = async (user) => {
    const {username, password} = user;
    const result = await client.sql`
        INSERT INTO users (username, password)
        VALUES (${username}, ${password}) RETURNING id;`;

    return result.rows[0];
}

export const getUser = async (username) => {
    const {rows} = (await client.sql`
        SELECT *
        FROM users
        WHERE username = ${username};`);

    return rows;
}

export const getUserById = async (id) => {
    const {rows} = (await client.sql`
        SELECT id, username
        FROM users
        WHERE id = ${id};`);

    return rows[0];
}

export const deleteUser = (username) => {
}

export const updateUser = (user) => {
}