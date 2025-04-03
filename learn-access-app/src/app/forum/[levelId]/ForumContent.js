'use client'

import modules from "./forum.module.css";
import TopBar from "@/app/ui/component/topBar/TopBar";
import ForumPost from "@/app/ui/component/forumPost/ForumPost";
import {useFetchForum} from "@/app/ui/api/useFetchForum";
import {useEffect, useState} from "react";
import {Button, CircularProgress, Grid2, Link, Stack} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import SortIcon from '@mui/icons-material/Sort';

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

    const handlePostLike = (modifier, id) => {
        const updatedPosts = [...posts];
        updatedPosts.map((post) => {
            if (id === post.id) {
                post.likes += modifier;
            }
            return post;
        })
        setPosts(updatedPosts);
    }

    const handleSortByLikes = () => {
        const sortedPosts = [...posts];
        sortedPosts.sort((a, b) => {
            return Number(b.likes) - Number(a.likes);
        })
        setPosts(sortedPosts);
    }

    const handleSortByDate = () => {
        const sortedPosts = [...posts];
        sortedPosts.sort((a, b) => {
            return (new Date(Date.parse(b.datetime)) - new Date(Date.parse(a.datetime)));
        })
        setPosts(sortedPosts);
    }

    const getErrorMessage = () => {
        if (refetchError?.status === 404 || forumError?.status === 404) {
            return <p role={"alert"} className={modules.errorMessage}>The forum you are looking for doesn&apos;t seem to
                exist, please
                return to the homepage and select another forum.</p>
        }

        if (refetchError?.status === 401 || forumError?.status === 401) {
            return <p role={"alert"} className={modules.errorMessage}>You don&apos;t seem to be authenticated, please
                return to the homepage
                and login or register.</p>
        }

        if (refetchError?.status === 403 || forumError?.status === 403) {
            return <p role={"alert"} className={modules.errorMessage}>You don&apos;t have permission to view this forum
                at the moment,
                please return to the homepage and choose a forum or level you have unlocked.</p>
        }

        return <p role={"alert"} data-testid="error-general" className={modules.errorMessage}>Failed to load forum
            posts. Please&nbsp;<Link
                className={modules.link}
                onClick={reloadForum}>try
                again</Link></p>
    }

    return (
        <div className={modules.container}>
            <h1>
                <TopBar back title={"Forum"} loggedIn={session} username={user?.username}/>
            </h1>
            <main className={modules.forumContent}>
                <Grid2 container sx={{width: "100%", height: "100%", margin: 0}}>
                    <Grid2 direction="column" size={3}>
                    </Grid2>
                    <Grid2 direction="column" size={6}>
                        <div className={modules.forumScroller}>
                            {posts.length > 0 && !(forumLoading || forumRefetching) ? (posts.map((post) => <ForumPost
                                currentUser={user} post={post}
                                key={post.id}
                                updateLikes={handlePostLike}/>)) : forumLoading || forumRefetching ? (
                                <CircularProgress data-testid="loading" className={modules.loading}
                                                  size="8rem"/>) : forumError || refetchError ? (getErrorMessage()) : (
                                <p role={"alert"} className={modules.emptyMessage}>No posts right now, please check
                                    again later</p>)}
                        </div>
                    </Grid2>
                    <Grid2 direction="column" size={3}>
                        <div className={modules.actions}>
                            <Stack>
                                <Button
                                    disabled={posts.length === 0 || forumError || refetchError || forumLoading || forumRefetching}
                                    color="inherit" onClick={reloadForum} startIcon={<RefreshIcon/>}>Refresh
                                    Feed</Button>
                                <Button
                                    disabled={posts.length === 0 || forumError || refetchError || forumLoading || forumRefetching}
                                    color="inherit" aria-label={"Sort posts by date"} onClick={handleSortByDate}
                                    startIcon={<SortIcon/>}>Sort by
                                    Date</Button>
                                <Button
                                    disabled={posts.length === 0 || forumError || refetchError || forumLoading || forumRefetching}
                                    color="inherit" aria-label={"Sort posts by likes"} onClick={handleSortByLikes}
                                    startIcon={<SortIcon/>}>Sort by
                                    Likes</Button>
                            </Stack>
                        </div>
                    </Grid2>
                </Grid2>
            </main>
        </div>
    )
}

export default ForumContent;
