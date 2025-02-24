import {sql} from "@vercel/postgres";

export const getPostByLevelId = async (levelId) => {
    const result = await sql`

    `
}

export const createPost = async (userId, levelId, files, title, message) => {
    try {
        await sql`BEGIN;`;

        const postResult = await sql`
            INSERT INTO posts (userId, levelId, datetime, title, message)
            VALUES (${userId}, ${levelId}, NOW(), ${title}, ${message})
            RETURNING id;
        `;
        const postId = postResult.rows[0].id;
        console.log(postResult)
        if (files.length > 0) {
            await Promise.all(
                files.map(file =>
                    sql`
                        INSERT INTO post_files (postId, name, fileType, content)
                        VALUES (${postId}, ${file.name}, ${file.fileType}, ${file.content});
                    `
                )
            );
        }

        await sql`COMMIT;`;
    } catch (error) {
        try {
            await sql`ROLLBACK;`;
        } catch (rollbackError) {
            console.error("Rollback failed:", rollbackError);
        }
        console.error("Transaction failed:", error);
        throw error;
    }
}
