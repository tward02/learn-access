import modules from "./forum.module.css";
import TopBar from "@/app/ui/component/topBar/TopBar";

const ForumContent = ({session, user, id}) => {

    return (
        <div className={modules.container}>
            <TopBar ba title={"Level 1 - Forum"} loggedIn={session} username={user?.username}/>
            <main className={modules.forumContent}>
                <div className={modules.forumScroller}>
                </div>
            </main>
        </div>
    )
}

export default ForumContent;
