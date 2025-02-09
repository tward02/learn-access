import {getUser, verifySession} from "@/app/lib/dal";
import ForumContent from "@/app/forum/[levelId]/ForumContent";

const Forum = async ({params}) => {

    const id = (await params).levelId;

    const session = await verifySession();
    const user = session ? await getUser() : null;

    return (
        <ForumContent session={session} id={id} user={user}/>
    )
}

export default Forum;
