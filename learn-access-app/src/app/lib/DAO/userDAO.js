import {sql} from '@vercel/postgres';

export const createUser = async (user) => {
    const {username, password} = user;
    const result = await sql`
        INSERT INTO users (username, password)
        VALUES (${username}, ${password}) RETURNING id;`;

    return result.rows[0];
}

export const getUser = async (username) => {
    const {rows} = (await sql`
        SELECT *
        FROM users
        WHERE username = ${username};`);

    return rows;
}

export const getUserById = async (id) => {
    const {rows} = (await sql`
        SELECT id, username, password
        FROM users
        WHERE id = ${id};`);

    return rows[0];
}

export const deleteUser = (username) => {
}

export const updateUser = (user) => {

}
