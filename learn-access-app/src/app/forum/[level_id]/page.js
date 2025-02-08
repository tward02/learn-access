import {getUser, verifySession} from "@/app/lib/dal";
import modules from "./forum.module.css"
import ForumContent from "@/app/forum/[level_id]/ForumContent";

const Forum = async ({params}) => {

    const id = (await params).id;
    const session = await verifySession();
    const user = session ? await getUser() : null;

    return (
        <ForumContent session={session} id={id} user={user}/>
    )
}

export default Forum;
