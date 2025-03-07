import {getUser, hasSession} from "@/app/lib/dal";
import {deleteSavedFiles, getLevel, saveFile} from "@/app/lib/DAO/levelDAO";

export async function POST(request, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const id = (await params).id;
    const body = await request.json();
    const user = await getUser();

    const levelDataList = await getLevel(user.id, id);

    if (levelDataList.length === 0) {
        return Response.json({error: 'Level not found'}, {status: 404});
    }

    const levelData = levelDataList[0];

    if (levelData.locked === true) {
        return Response.json({error: 'You don\'t have permission to view this level'}, {status: 403});
    }

    const {files} = body.data;

    if (!files || files.length === 0) {
        return Response.json({error: "You are missing required fields"}, {status: 400});
    }

    files.forEach((file) => {
        const {name, fileType, content} = file;
        if (!name || !content || !fileType) {
            return Response.json({error: 'You are missing required fields'}, {status: 400});
        }
    })

    await Promise.all(files.map(file => {
        saveFile(user.id, id, file.name, file.fileType, file.content)
    }))

    return Response.json(null, {status: 201});
}

export async function DELETE(request, {params}) {

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

    if (levelData.completed !== true) {
        return Response.json({error: 'You don\'t have permission to do this'}, {status: 403});
    }

    await deleteSavedFiles(user.id, id);

    return Response.json(null, {status: 200});
}
