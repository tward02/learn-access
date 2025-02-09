import {getUser, hasSession} from "@/app/lib/dal";
import {levelsTestData} from "@/app/ui/testData";

export async function GET(req) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const user = getUser();
    //TODO implement DAO and levels in database

    const levels = levelsTestData;

    return Response.json(levels);
}