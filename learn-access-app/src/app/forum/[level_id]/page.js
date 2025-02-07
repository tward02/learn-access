import {getUser, verifySession} from "@/app/lib/dal";

const Forum = async ({params}) => {

    const id = (await params).id;
    const session = await verifySession();
    const user = session ? await getUser() : null;

    return (
        <div>Forum page</div>
    )
}

export default Forum;
