'use client'

import TopBar from "@/app/ui/component/topBar/TopBar";
import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import modules from "./levels.module.css"
import {SandpackProvider} from "@codesandbox/sandpack-react";
import {formatFiles} from "@/app/ui/utility";
import {useFetchLevel} from "@/app/ui/api/useFetchLevel";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Sandbox from "@/app/level/[id]/Sandbox";

const LevelContent = ({session, user, id}) => {

    //TODO dark mode + text sizes
    //TODO API testing integration

    const router = useRouter();

    const [level, setLevel] = useState(null);
    const [expired, setExpired] = useState(false);

    const {levelLoading, levelError, levelData, levelSuccess} = useFetchLevel(id);

    useEffect(() => {
        if (levelData && levelSuccess) {
            if ((Date.parse(levelData?.expiration) - new Date()) > 0) {
                setExpired(true);
            } else {
                setLevel(levelData);
            }


        }
    }, [levelSuccess, levelData]);

    const closeErrorPopup = () => {
        router.push("/");
    }

    const getLoadErrorMessage = () => {
        if (expired || levelError?.status === 404) {
            return "The level you are looking for doesn't seem to exist, please return to the homepage and select a level to complete there."
        }

        if (levelError?.status === 401) {
            return "You don't seem to be authenticated, please return to the homepage and login or register."
        }

        if (levelError?.status === 403) {
            return "You don't have permission to view this level at the moment, please return to the homepage and choose a level you have unlocked."
        }

        return "There has been an error loading this level, please return to the homepage and try again later."
    }

    return (
        <main className={modules.gridContainer}>
            <TopBar title={level?.name} loggedIn={session} username={user?.username} back/>
            {!levelLoading && !levelError &&
                <SandpackProvider template={"react"} className={modules.provider} files={formatFiles(level?.files)}>
                    <Sandbox user={user} id={id} level={level}/>
                </SandpackProvider>}
            <Backdrop open={levelLoading}>
                <CircularProgress/>
            </Backdrop>
            <Dialog aria-labelledby="error-dialog-title" aria-describedby="error-dialog-description"
                    open={levelError || expired}
                    onClose={closeErrorPopup}>
                <DialogTitle id="error-dialog-title">Error Loading Level</DialogTitle>
                <DialogContent>
                    <DialogContentText id="error-dialog-description">
                        {getLoadErrorMessage()}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeErrorPopup} autoFocus>Return to Homepage</Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}

export default LevelContent;
