import {getUser, hasSession} from "@/app/lib/dal";
import {levelsTestData} from "@/app/lib/testData";
import {getLevels} from "@/app/lib/DAO/levelDAO";

export async function GET() {

    if (!await hasSession()) {
        return Response.json({error: 'You are not authenticated, please login'}, {status: 401});
    }
    console.log("user authenticated")

    const user = await getUser();

    const levelRows = await getLevels(user.id);

    return Response.json(levelRows);
}