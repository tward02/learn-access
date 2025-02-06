import modules from "./test.module.css"
import TopBar from "@/app/ui/component/topBar/TopBar";
import {getUser, hasSession} from "@/app/lib/dal";
import LevelListDisplay from "@/app/ui/component/levelList/LevelListDisplay";

const HomePage = async () => {

    const session = await hasSession();
    const user = await getUser();

    return (
        <div className={modules.container}>
            <TopBar title={"Learn Access"} loggedIn={session} username={user.username}/>
            <main className={modules.content}>
                <h1 className={modules.heading}>Learn Access</h1>
                <p className={modules.description}>This application is to teach developers how to create applications that are accessible to the W3C WCAG 2.2 standards, more description to follow</p>
                <LevelListDisplay className={modules.levels}/>
            </main>
        </div>
    )
}

export default HomePage;
