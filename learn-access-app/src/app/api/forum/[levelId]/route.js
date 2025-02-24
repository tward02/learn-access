import {getUser, hasSession} from "@/app/lib/dal";
import {forumPost} from "@/app/lib/testData";
import {hasCompletedLevel} from "@/app/lib/DAO/levelDAO";
import {createPost} from "@/app/lib/DAO/forumDAO";

export async function GET(req, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const levelId = (await params).levelId;
    const user = await getUser();

    if (!await hasCompletedLevel(user.id, levelId)) {
        return Response.json({error: 'You have not unlocked this forum yet'}, {status: 403});
    }

    //TODO implement DAO and levels in database, ensure user is allowed to look at the levels

    const forum = forumPost;

    return Response.json(forum);
}

export async function POST(req, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")
    console.log("here")

    const levelId = (await params).levelId;
    const body = await req.json();
    const user = await getUser();

    if (!await hasCompletedLevel(user.id, levelId)) {
        return Response.json({error: 'You have not unlocked this forum yet'}, {status: 403});
    }

    const {title, message, files} = body.data;

    if (!title || !message || !files) {
        return Response.json({error: 'You are missing required fields'}, {status: 400});
    }

    files.forEach((file) => {
        const {name, fileType, content} = file;
        if (!name || !content || !fileType) {
            return Response.json({error: 'You are missing required fields'}, {status: 400});
        }
    })

    console.log("here")
    await createPost(user.id, levelId, files, title, message);
    console.log("here")
    return Response.json(null, {status: 201});
}