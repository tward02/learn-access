import {sql} from "@vercel/postgres";

export const getLevels = async (userId) => {
    const result = await sql`
        SELECT l.id,
               l.name,
               l.description,
               l.objectives,
               l.expiration,
               l.previousLevelId,
               COALESCE(ul.completed, FALSE) AS completed,
               CASE
                   WHEN l.previousLevelId IS NULL THEN TRUE
                   WHEN upl.completed = TRUE THEN TRUE
                   ELSE FALSE
                   END                       AS unlocked
        FROM levels l
                 LEFT JOIN user_levels ul ON l.id = ul.levelId AND ul.userId = ${userId}
                 LEFT JOIN user_levels upl
                           ON l.previousLevelId = upl.levelId AND upl.userId = ${userId} AND
                              upl.completed = TRUE
        ORDER BY l.id;`

    return result.rows;
}

export const getLevel = async (userId, levelId) => {
    const result = await sql`
        SELECT l.id,
               l.name,
               l.description,
               l.objectives,
               l.expiration,
               l.previousLevelId,
               COALESCE(ul.completed, FALSE) AS completed,
               CASE
                   WHEN l.previousLevelId IS NULL THEN TRUE
                   WHEN upl.completed = TRUE
                       THEN TRUE
                   ELSE FALSE
                   END                       AS unlocked
        FROM levels l
                 LEFT JOIN user_levels ul
                           ON l.id = ul.levelId AND ul.userId = ${userId} -- Check if User 1 completed the level
                 LEFT JOIN user_levels upl
                           ON l.previousLevelId = upl.levelId AND upl.userId = ${userId} AND
                              upl.completed = TRUE -- Check if User 1 completed the previous level
        WHERE l.id = ${levelId}
        ORDER BY l.id;`

    return result.rows;
}

export const getLevelFiles = async (levelId) => {
    const result = await sql`
        SELECT *
        FROM level_files
        WHERE levelId = ${levelId};
    `

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

}
