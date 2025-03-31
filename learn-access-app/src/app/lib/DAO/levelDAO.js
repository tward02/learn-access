import {sql} from "@vercel/postgres";

//data access object for all database items to do with level functionality

//gets list of levels and whether they have been completed by joining the user levels and whether they are unlocked based on the user requesting them
export const getLevels = async (userId) => {
    const result = await sql`
        WITH user_completed_levels AS (SELECT levelID
                                       FROM user_levels
                                       WHERE userID = ${userId})
        SELECT DISTINCT
            ON (l.id) l.id                                                                   AS id,
                      l.name,
                      l.description,
                      l.objectives,
                      l.expiration,
                      l.enhancedDescription,
                      COALESCE(ul.levelID IS NOT NULL, FALSE)                                AS completed,
                      COALESCE(l.previousLevelId IS NOT NULL AND upl.levelID IS NULL, FALSE) AS locked
        FROM levels l
                 LEFT JOIN user_completed_levels ul
                           ON l.id = ul.levelID
                 LEFT JOIN user_completed_levels upl ON l.previousLevelId = upl.levelID
        ORDER BY l.id;`

    return result.rows;
}

//gets a single level and whether it has been completed by joining the user levels and whether it is unlocked based on the user requesting it
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

    //removes any database encoding so that it dispays on the UI correctly
    result.rows.map((level) => {
        level.enhanceddescription = level?.enhanceddescription?.replace(/\\n/g, '\n');
        level.objectives = level?.objectives?.replace(/\\n/g, '\n');
    })

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

export const hasCompletedLevel = async (userId, levelId) => {
    const result = await sql`
        SELECT *
        FROM user_levels
        WHERE levelID = ${levelId}
          AND userID = ${userId};
    `
    return result?.rows?.length > 0;
}

export const saveFile = async (userId, levelId, name, type, content) => {
    await sql`
        INSERT INTO saved_files (userId, levelId, name, fileType, content, datetime)
        VALUES (${userId}, ${levelId}, ${name}, ${type}, ${content}, NOW())
        ON CONFLICT (userId, levelId, name)
            DO UPDATE SET content  = EXCLUDED.content,
                          datetime = NOW();
    `
}

export const getSavedFiles = async (userId, levelId) => {
    const result = await sql`
        SELECT *
        FROM saved_files
        WHERE levelid = ${levelId}
          AND userid = ${userId};
    `
    return result.rows;
}

export const deleteSavedFiles = async (userId, levelId) => {
    await sql`
        DELETE
        FROM saved_files
        WHERE levelid = ${levelId}
          AND userid = ${userId};
    `
}
