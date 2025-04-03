import {getUser, hasSession} from "@/app/lib/dal";
import {hasCompletedLevel} from "@/app/lib/DAO/levelDAO";
import {createPost, getCommentsByPostId, getPostFiles, getPostsByLevelId} from "@/app/lib/DAO/forumDAO";
import {getUserById} from "@/app/lib/DAO/userDAO";

export async function GET(req, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const levelId = (await params).levelId;
    const rqUser = await getUser();

    if (!await hasCompletedLevel(rqUser.id, levelId)) {
        return Response.json({error: 'You have not unlocked this forum yet'}, {status: 403});
    }

    const posts = await getPostsByLevelId(levelId, rqUser.id);

    //gets all post data in parallel
    const response = await Promise.all(posts.map(async (post) => {
        const user = await getUserById(post.userid);
        post.username = user.username;
        const comments = await getCommentsByPostId(post.id, rqUser.id);
        post.comments = await Promise.all(comments.map(async (comment) => {
            const commentUser = await getUserById(comment.userid);
            comment.username = commentUser.username;
            return comment;
        }));
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

    const levelId = (await params).levelId;
    const body = typeof req.json === "function" ? await req.json() : req.body;
    const user = await getUser();

    if (!await hasCompletedLevel(user.id, levelId)) {
        return Response.json({error: 'You have not unlocked this forum yet'}, {status: 403});
    }

    const {title, message, files} = body.data;

    if (!title || !message || !files || files.length === 0) {
        return Response.json({error: 'You are missing required fields'}, {status: 400});
    }

    //validates all files
    for (let i = 0; i < files.length; i++) {
        const {name, fileType, content} = files[i];
        if (!name || !content || !fileType) {
            return Response.json({error: 'You are missing required fields'}, {status: 400});
        }
    }

    await createPost(user.id, levelId, files, title, message);

    return Response.json(null, {status: 201});
}
