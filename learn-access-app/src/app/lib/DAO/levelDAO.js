import {sql} from "@vercel/postgres";

export const getLevels = async (userId) => {
    const result = await sql`
        WITH user_completed_levels AS (SELECT levelID
                                       FROM user_levels
                                       WHERE userID = ${userId})
        SELECT l.id                                                                   AS id,
               l.name,
               l.description,
               l.objectives,
               l.expiration,
               l.enhancedDescription,
               COALESCE(ul.levelID IS NOT NULL, FALSE)                                AS completed,
               COALESCE(l.previousLevelId IS NOT NULL AND upl.levelID IS NULL, FALSE) AS locked
        FROM levels l
                 LEFT JOIN user_completed_levels ul ON l.id = ul.levelID
                 LEFT JOIN user_completed_levels upl ON l.previousLevelId = upl.levelID
        ORDER BY l.id;`

    return result.rows;
}

export const getLevel = async (userId, levelId) => {
    const result = await sql`
        WITH user_completed_levels AS (SELECT levelID
                                       FROM user_levels
                                       WHERE userID = ${userId})
        SELECT l.id                                                                   AS id,
               l.name,
               l.description,
               l.objectives,
               l.expiration,
               l.enhancedDescription,
               COALESCE(ul.levelID IS NOT NULL, FALSE)                                AS completed,
               COALESCE(l.previousLevelId IS NOT NULL AND upl.levelID IS NULL, FALSE) AS locked
        FROM levels l
                 LEFT JOIN user_completed_levels ul ON l.id = ul.levelID
                 LEFT JOIN user_completed_levels upl ON l.previousLevelId = upl.levelID
        WHERE l.id = ${levelId};`

    return result.rows;
}

export const getLevelFiles = async (levelId) => {
    const result = await sql`
        SELECT *
        FROM level_files
        WHERE levelId = ${levelId};
    `

    result.rows.map((file) => {
        file.content = file.content.replace(/\\n/g, '\n');
    })
    return result.rows;
}

export const getLevelHints = async (levelId) => {
    const result = await sql`
        SELECT *
        FROM level_hints
        WHERE levelId = ${levelId};`

    return result.rows;
}

export const getLevelTests = async (levelId) => {
    const result = await sql`
        SELECT *
        FROM level_tests
        WHERE levelId = ${levelId};`
    return result.rows;
}

export const passLevel = async (userId, levelId) => {

}

export const saveFile = async (userId, levelId, name, type, content) => {

}

export const getFiles = async (userId, levelId) => {

}

export const getSolution = async (levelId) => {

}
