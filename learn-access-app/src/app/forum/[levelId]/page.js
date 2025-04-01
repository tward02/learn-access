import {getUser, verifySession} from "@/app/lib/dal";
import ForumContent from "@/app/forum/[levelId]/ForumContent";

export const metadata = {
    title: "Learn Access | View Forum",
    description: "Learn how to program accessibly in React - view forum",
};

const Forum = async ({params}) => {

    const id = (await params).levelId;

    const session = await verifySession();
    const user = session ? await getUser() : null;

    return (
        <ForumContent session={session} id={id} user={user}/>
    )
}

export default Forum;
