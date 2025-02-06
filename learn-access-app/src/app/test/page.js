import modules from "./test.module.css"
import TopBar from "@/app/ui/component/topBar/TopBar";
import {getUser, hasSession} from "@/app/lib/dal";
import LevelListDisplay from "@/app/ui/component/levelList/LevelListDisplay";

const HomePage = async () => {

    //TODO add description / padding etc

    const session = await hasSession();
    const user = await getUser();
    console.log(new Date())

    return (
        <div className={modules.container}>
            <TopBar title={"Learn Access"} loggedIn={session} username={user.username}/>
            <main className={modules.content}>
                <h1 className={modules.heading}>Learn Access</h1>
                <LevelListDisplay/>
            </main>
        </div>
    )
}

export default HomePage;
