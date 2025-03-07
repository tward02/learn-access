import {getUser, hasSession} from "@/app/lib/dal";
import {hasCompletedLevel} from "@/app/lib/DAO/levelDAO";
import {getCommentById, likeComment, unlikeComment} from "@/app/lib/DAO/forumDAO";

export async function POST(req, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const commentId = (await params).commentId;
    const user = await getUser();

    const comments = await getCommentById(commentId);

    if (!comments || comments?.rows?.length === 0) {
        return Response.json({error: 'Comment does not exist'}, {status: 404});
    }

    const comment = comments[0];

    if (!await hasCompletedLevel(user.id, comment.levelid)) {
        return Response.json({error: 'You have not unlocked this forum yet'}, {status: 403});
    }

    await likeComment(commentId, user.id);

    return Response.json(null, {status: 201});
}

export async function DELETE(req, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const commentId = (await params).commentId;
    const user = await getUser();

    const comments = await getCommentById(commentId);

    if (!comments || comments?.rows?.length === 0) {
        return Response.json({error: 'Post does not exist'}, {status: 404});
    }

    const comment = comments[0];

    if (!await hasCompletedLevel(user.id, comment.levelid)) {
        return Response.json({error: 'You have not unlocked this forum yet'}, {status: 403});
    }

    await unlikeComment(commentId, user.id);

    return Response.json(null, {status: 200});
}
