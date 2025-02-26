import {getUser, hasSession} from "@/app/lib/dal";
import {createComment, getPostById} from "@/app/lib/DAO/forumDAO";
import {hasCompletedLevel} from "@/app/lib/DAO/levelDAO";

export async function POST(req, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const postId = (await params).postId;
    const body = await req.json();
    const user = await getUser();

    const posts = await getPostById(postId);

    if (!posts || posts?.rows?.length === 0) {
        return Response.json({error: 'Post does not exist'}, {status: 404});
    }

    const post = posts[0];

    if (!await hasCompletedLevel(user.id, post.levelid)) {
        return Response.json({error: 'You have not unlocked this forum yet'}, {status: 403});
    }

    const {message} = body.data;

    if (!message) {
        return Response.json({error: 'Missing required field'}, {status: 400});
    }

    const rows = await createComment(postId, user.id, message);

    if (!rows || rows.length === 0) {
        return Response.json({error: 'Error creating comment'}, {status: 500});
    }

    return Response.json({id: rows[0].id}, {status: 201});
}