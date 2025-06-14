import {sql} from "@vercel/postgres";

//data access object for all database items to do with forum functionality

export const getPostFiles = async (postId) => {
    const result = await sql`
        SELECT *
        FROM post_files
        WHERE postId = ${postId}
    `
    return result.rows;
}

//Adds a post to the database as well as all the file associated with that post, if anything fails then the whole transaction is rolled back
export const createPost = async (userId, levelId, files, title, message) => {
    try {
        await sql`BEGIN;`;

        const postResult = await sql`
            INSERT INTO posts (userId, levelId, datetime, title, message)
            VALUES (${userId}, ${levelId}, NOW(), ${title}, ${message})
            RETURNING id;
        `;
        const postId = postResult.rows[0].id;

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

export const likePost = async (postId, userId) => {
    await sql`
        INSERT INTO likes(userId, postId, datetime)
        SELECT ${userId}, ${postId}, NOW()
        WHERE NOT EXISTS (SELECT 1
                          FROM likes
                          WHERE userId = ${userId}
                            AND postId = ${postId});
    `
}

export const unlikePost = async (postId, userId) => {
    await sql`
        DELETE
        FROM likes
        where userId = ${userId}
          AND postId = ${postId}
    `
}

export const getPostById = async (id) => {
    const result = await sql`
        SELECT *
        FROM posts
        WHERE id = ${id}
    `
    return result.rows;
}

export const getCommentById = async (id) => {
    const result = await sql`
        SELECT c.*, p.levelId AS levelid
        FROM comments c
                 JOIN posts p ON c.postId = p.id
        WHERE c.id = ${id};
    `
    return result.rows;
}

export const likeComment = async (commentId, userId) => {
    await sql`
        INSERT INTO likes(userId, commentId, datetime)
        SELECT ${userId}, ${commentId}, NOW()
        WHERE NOT EXISTS (SELECT 1
                          FROM likes
                          WHERE userId = ${userId}
                            AND postId = ${commentId});
    `
}

export const unlikeComment = async (commentId, userId) => {
    await sql`
        DELETE
        FROM likes
        where userId = ${userId}
          AND commentId = ${commentId}
    `
}

export const createComment = async (postId, userId, message) => {
    const result = await sql`
        INSERT INTO comments(postid, userid, datetime, message)
        VALUES (${postId}, ${userId}, NOW(), ${message})
        RETURNING id
    `
    return result.rows;
}

//gets all comments for a post and how many likes they have as well as whether the user has liked them and the user who created it
export const getCommentsByPostId = async (postId, userId) => {
    const result = await sql`
        SELECT p.*,
               COUNT(l.id)                                                AS likes,
               CASE WHEN COUNT(user_like.id) > 0 THEN true ELSE false END AS isLiked
        FROM comments p
                 LEFT JOIN likes l ON l.commentid = p.id
                 LEFT JOIN likes user_like
                           ON user_like.commentid = p.id
                               AND user_like.userId = ${userId}
        WHERE p.postid = ${postId}
        GROUP BY p.id;
    `
    return result.rows;
}

//gets all posts for a forum and how many likes they have as well as whether the user has liked them and the user who created it
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
