import {getUser, hasSession} from "@/app/lib/dal";
import {testLevel} from "@/app/ui/testData";

export async function GET(request, { params }) {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const id = (await params).id;

    const user = getUser();

    //TODO implement DAO and levels in database, ensure user is allowed to look at the levels
    const level = testLevel;

    return Response.json(level);
}
