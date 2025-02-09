import {getUser, hasSession} from "@/app/lib/dal";
import {forumPost} from "@/app/ui/testData";

export async function GET(req, {params}) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const levelId = (await params).levelId;

    const user = getUser();
    //TODO implement DAO and levels in database

    const forum = forumPost;

    return Response.json(forum);
}