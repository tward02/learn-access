'use client'

import modules from "./forum.module.css";
import TopBar from "@/app/ui/component/topBar/TopBar";
import ForumPost from "@/app/ui/component/forumPost/ForumPost";
import {forumPost} from "@/app/ui/testData";

const ForumContent = ({session, user, id}) => {

    return (
        <div className={modules.container}>
            <TopBar ba title={"Level 1 - Forum"} loggedIn={session} username={user?.username}/>
            <main className={modules.forumContent}>
                <div className={modules.forumScroller}>
                    <ForumPost post={forumPost} currentUser={user}/>
                    <ForumPost post={forumPost} currentUser={user}/>
                    <ForumPost post={forumPost} currentUser={user}/>
                    <ForumPost post={forumPost} currentUser={user}/>
                    <ForumPost post={forumPost} currentUser={user}/>
                    <ForumPost post={forumPost} currentUser={user}/>
                </div>
            </main>
        </div>
    )
}

export default ForumContent;
