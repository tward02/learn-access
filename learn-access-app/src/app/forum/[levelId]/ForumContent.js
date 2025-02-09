'use client'

import modules from "./forum.module.css";
import TopBar from "@/app/ui/component/topBar/TopBar";
import ForumPost from "@/app/ui/component/forumPost/ForumPost";
import {useFetchForum} from "@/app/ui/api/useFetchForum";
import {useEffect, useState} from "react";
import {CircularProgress, Link} from "@mui/material";

const ForumContent = ({session, user, id}) => {

    const [posts, setPosts] = useState([]);
    const {
        forumLoading,
        forumError,
        forumData,
        forumSuccess,
        forumRefetch,
        forumRefetching,
        refetchError
    } = useFetchForum(id);


    useEffect(() => {
        if (forumSuccess && forumData) {
            setPosts(forumData);
        }
    }, [forumData, forumSuccess]);

    const reloadForum = () => {
        forumRefetch();
    }

    return (
        <div className={modules.container}>
            <TopBar back title={"Level 1 - Forum"} loggedIn={session} username={user?.username}/>
            <main className={modules.forumContent}>
                <div className={modules.forumScroller}>
                    {posts.length > 0 ? (posts.map((post) => <ForumPost currentUser={user} post={post}
                                                                        key={post.id}/>)) : forumLoading || forumRefetching ? (
                        <CircularProgress className={modules.loading} size="8rem"/>) : forumError || refetchError ? (
                        <p className={modules.errorMessage}>Failed to load forum posts. Please&nbsp;<Link
                            className={modules.link}
                            onClick={reloadForum}>try
                            again</Link></p>) : (
                        <p className={modules.emptyMessage}>No posts right now, please check again later</p>)}
                </div>
            </main>
        </div>
    )
}

export default ForumContent;
