import {getUser, hasSession} from "@/app/lib/dal";
import {hasCompletedLevel} from "@/app/lib/DAO/levelDAO";
import {createPost, getPostFiles, getPostsByLevelId} from "@/app/lib/DAO/forumDAO";
import {getUserById} from "@/app/lib/DAO/userDAO";

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

    const posts = await getPostsByLevelId(levelId);

    const response = await Promise.all(posts.map(async (post) => {
        const user = await getUserById(post.userid);
        post.username = user.username;
        post.comments = [];
        post.files = await getPostFiles(post.id);
        return post;
    }))

    return Response.json(response);
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