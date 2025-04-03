import {getUser, hasSession} from "@/app/lib/dal";
import {hasCompletedLevel} from "@/app/lib/DAO/levelDAO";
import {getPostById, likePost, unlikePost} from "@/app/lib/DAO/forumDAO";

export async function POST(req, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const postId = (await params).postId;
    const user = await getUser();

    const posts = await getPostById(postId);

    if (!posts || posts?.length === 0) {
        return Response.json({error: 'Post does not exist'}, {status: 404});
    }

    const post = posts[0];

    if (!await hasCompletedLevel(user.id, post.levelid)) {
        return Response.json({error: 'You have not unlocked this forum yet'}, {status: 403});
    }

    await likePost(postId, user.id);

    return Response.json(null, {status: 201});
}

export async function DELETE(req, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const postId = (await params).postId;
    const user = await getUser();

    const posts = await getPostById(postId);

    if (!posts || posts?.length === 0) {
        return Response.json({error: 'Post does not exist'}, {status: 404});
    }

    const post = posts[0];

    if (!await hasCompletedLevel(user.id, post.levelid)) {
        return Response.json({error: 'You have not unlocked this forum yet'}, {status: 403});
    }

    await unlikePost(postId, user.id);

    return Response.json(null, {status: 200});
}
