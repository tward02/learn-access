import modules from "./homepage.module.css"
import TopBar from "@/app/ui/component/topBar/TopBar";
import {getUser, hasSession} from "@/app/lib/dal";
import LevelListDisplay from "@/app/ui/component/levelList/LevelListDisplay";
import NoSession from "@/app/ui/component/noSession/NoSession";

const HomePage = async () => {

    const session = await hasSession();
    const user = session ? await getUser() : null;

    return (
        <div className={modules.container}>
            <TopBar title={"Learn Access"} loggedIn={session} username={user?.username}/>
            <main className={modules.content}>
                <h1 className={modules.heading}>Learn Access</h1>
                <p className={modules.description}>This application is to teach developers how to create applications
                    that are accessible to the W3C WCAG 2.2 standards, more description to follow. This application is
                    still being developed, more functionality coming soon.</p>
                {session && <LevelListDisplay className={modules.levels}/>}
                {!session && <NoSession/>}
            </main>
        </div>
    )
}

export default HomePage;
