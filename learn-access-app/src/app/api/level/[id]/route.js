import {getUser, hasSession} from "@/app/lib/dal";
import {getLevel, getLevelFiles, getLevelHints, getSavedFiles} from "@/app/lib/DAO/levelDAO";

export async function GET(request, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const id = (await params).id;

    const user = await getUser();

    const levelDataList = await getLevel(user.id, id);

    if (levelDataList.length === 0) {
        return Response.json({error: 'Level not found'}, {status: 404});
    }

    const levelData = levelDataList[0];

    if (levelData.locked === true) {
        return Response.json({error: 'You don\'t have permission to view this level'}, {status: 403});
    }

    //Retrieve all in parallel
    const [levelFiles, levelHints, savedFiles] = await Promise.all([
        getLevelFiles(id),
        getLevelHints(id),
        getSavedFiles(user.id, id)
    ]);

    levelData.files = levelFiles;
    levelData.hints = levelHints;
    levelData.savedFiles = savedFiles;

    return Response.json(levelData);
}
