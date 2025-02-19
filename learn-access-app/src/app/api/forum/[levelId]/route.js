import {getUser, hasSession} from "@/app/lib/dal";
import {forumPost} from "@/app/lib/testData";

export async function GET(req, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const levelId = (await params).levelId;

    const user = await getUser();
    //TODO implement DAO and levels in database, ensure user is allowed to look at the levels

    const forum = forumPost;

    return Response.json(forum);
}