import {sql} from "@vercel/postgres";

export const getPostsByLevelId = async (levelId, userId) => {
    const result = await sql`
        SELECT p.*,
               COUNT(l.id)                                                AS likes,
               CASE WHEN COUNT(user_like.id) > 0 THEN true ELSE false END AS isLiked
        FROM posts p
                 LEFT JOIN likes l ON l.postId = p.id
                 LEFT JOIN likes user_like
                           ON user_like.postId = p.id
                               AND user_like.userId = ${userId}
        WHERE p.levelId = ${levelId}
        GROUP BY p.id;
    `
    return result.rows;
}

export const getPostFiles = async (postId) => {
    const result = await sql`
        SELECT * FROM post_files WHERE postId = ${postId}
    `
    return result.rows;
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
