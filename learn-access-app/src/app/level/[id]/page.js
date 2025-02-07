import {getUser, verifySession} from "@/app/lib/dal";
import modules from "./levels.module.css";
import LevelContent from "@/app/level/[id]/LevelContent";

const Level = async ({params}) => {

    const id = (await params).id;
    const session = await verifySession();
    const user = session ? await getUser() : null;

    return (
        <div className={modules.container}>
            <LevelContent id={id} session={session} user={user}/>
        </div>
    )
}

export default Level;
