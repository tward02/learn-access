import {sql} from "@vercel/postgres";

export const getPosts = async (levelId) => {
    const result = await sql`
        SELECT p.id,
               p.title,
               p.message,
               p.datetime,
               p.userId,
               p.levelId,
               u.username,
               COUNT(l.id) AS likeCount
        FROM posts p
                 LEFT JOIN likes l ON p.id = l.postId
                 JOIN users u ON p.userId = u.id
        WHERE p.levelId = ${levelId}
        GROUP BY p.id, p.title, p.message, p.datetime, p.userId, p.levelId, u.username;
    `

    const posts = result.rows;

    const postIds = posts.map(post => post.id);

    const filesPromise = getPostFilesForPosts(postIds);
    const commentsPromise = getCommentsForPosts(postIds);

    const [files, comments] = await Promise.all([filesPromise, commentsPromise]);

    return posts.map(post => ({
        ...post,
        files: files[post.id] || [],
        comments: comments[post.id] || []
    }));
}

export const getPostFiles = async (postId) => {
    const result = await sql`
        SELECT *
        FROM post_files
        WHERE postId = ${postId};
    `

    return result.rows;
}

export const getComments = async (postId) => {
    const result = await sql`
        SELECT c.id,
               c.postId,
               c.message,
               c.datetime,
               c.userId,
               u.username,
               COUNT(l.id) AS like_count
        FROM comments c
                 JOIN users u ON c.userId = u.id
                 LEFT JOIN likes l ON c.id = l.commentId
        WHERE c.postId = ${postId}
        GROUP BY c.id, c.postId, c.message, c.datetime, c.userId, u.username;
    `

    return result.rows;
}

export const likePost = async (postId, userId) => {
    await sql`
        INSERT INTO likes (userId, postId, commentId, datetime)
        VALUES (${userId}, ${postId}, NULL, NOW());
    `
}

export const likeComment = async (commentId, userId) => {
    await sql`
        INSERT INTO likes (userId, postId, commentId, datetime)
        VALUES (${userId}, NULL, ${commentId}, NOW());
    `
}

export const unlikePost = async (postId, userId) => {
    await sql`
        DELETE
        FROM likes
        WHERE postId = ${postId}
          AND userId = ${userId};
    `
}

export const unlikeComment = async (commentId, userId) => {
    await sql`
        DELETE
        FROM likes
        WHERE commentId = ${commentId}
          AND userId = ${userId};
    `
}

export const createComment = async (postId, userId, message) => {
    await sql`
        INSERT INTO comments (postId, userId, datetime, message)
        VALUES (${postId}, ${userId}, NOW(), ${message});
    `
}

export const addPost = async (levelId, userId, title, message, files) => {
    const client = await sql.connect();
    try {
        await client.query("BEGIN");

        const result = await client.query(
            `INSERT INTO posts (userId, levelId, datetime, title, message)
             VALUES ($1, $2, NOW(), $3, $4) RETURNING id;`,
            [userId, levelId, title, message]
        );

        const postId = result.rows[0].id;

        if (files.length > 0) {
            const values = files.map((file, index) =>
                `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`
            ).join(", ");

            const params = files.flatMap(file => [postId, file.name, file.type, file.content]);

            await client.query(
                `INSERT INTO post_files (postId, name, fileType, content)
                 VALUES ${values};`,
                params
            );
        }

        await client.query("COMMIT");
        return postId;
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Transaction failed:", error);
        throw error;
    } finally {
        client.release();
    }
};

const getPostFilesForPosts = async (postIds) => {
    if (postIds.length === 0) return {};

    const result = await sql`
        SELECT *
        FROM post_files
        WHERE postId = ANY (${postIds});
    `;

    return result.rows.reduce((acc, file) => {
        if (!acc[file.postId]) acc[file.postId] = [];
        acc[file.postId].push(file);
        return acc;
    }, {});
};

const getCommentsForPosts = async (postIds) => {
    if (postIds.length === 0) return {};

    const result = await sql`
        SELECT c.postId,
               c.id,
               c.message,
               c.datetime,
               c.userId,
               u.username,
               COUNT(l.id) AS likeCount
        FROM comments c
                 JOIN users u ON c.userId = u.id
                 LEFT JOIN likes l ON c.id = l.commentId
        WHERE c.postId = ANY (${postIds})
        GROUP BY c.postId, c.id, c.message, c.datetime, c.userId, u.username;
    `;

    return result.rows.reduce((acc, comment) => {
        if (!acc[comment.postId]) acc[comment.postId] = [];
        acc[comment.postId].push(comment);
        return acc;
    }, {});
};
