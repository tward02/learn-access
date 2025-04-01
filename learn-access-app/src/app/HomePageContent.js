'use client'

import TopBar from "@/app/ui/component/topBar/TopBar";
import modules from "@/app/homepage.module.css";
import LevelListDisplay from "@/app/ui/component/levelList/LevelListDisplay";
import NoSession from "@/app/ui/component/noSession/NoSession";

//content for main homepage - ensure user is logged in then displays levels
const HomePageContent = ({session, user}) => {

    return (
        <>
            <TopBar title={"Learn Access"} loggedIn={session} username={user?.username}/>
            <main className={modules.content}>
                <h1 className={modules.heading}>Learn Access</h1>
                <p className={modules.description}>This application is to teach developers how to create applications
                    that are accessible to the W3C WCAG 2.2 standards in React 18. This application is still being
                    developed and will have more functionality and levels coming soon. Thanks for trying it out!</p>
                {session && <LevelListDisplay className={modules.levels}/>}
                {!session && <NoSession/>}
            </main>
        </>
    )
}

export default HomePageContent;
