'use client'

import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
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

    const router = useRouter();

    const [level, setLevel] = useState(null);
    const [expired, setExpired] = useState(false);
    const [saveFilesOpen, setSaveFilesOpen] = useState(false);

    const {levelLoading, levelError, levelData, levelSuccess} = useFetchLevel(id);

    useEffect(() => {
        if (levelData && levelSuccess) {
            if ((Date.parse(levelData?.expiration) - new Date()) > 0) {
                setExpired(true);
            } else {
                if (levelData?.savedFiles?.length > 0) {
                    setSaveFilesOpen(true);
                }
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

    const handleRestart = () => {
        setSaveFilesOpen(false);
    }

    const handleContinue = () => {
        levelData.files = levelData?.savedFiles;
        setLevel(levelData);
        setSaveFilesOpen(false);
    }

    return (
        <main className={modules.gridContainer}>
            {!levelLoading && !levelError && !saveFilesOpen &&
                <SandpackProvider options={{
                    experimental_enableServiceWorker: true,
                    experimental_enableStableServiceWorkerId: false
                }} template={"react"} className={modules.provider} files={formatFiles(level?.files)}>
                    <Sandbox user={user} id={id} level={level} session={session}/>
                </SandpackProvider>}
            <Backdrop open={levelLoading}>
                <CircularProgress data-testid={"loading"}/>
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
            <Dialog aria-labelledby="save-dialog-title" aria-describedby="save-dialog-description"
                    open={saveFilesOpen}>
                <DialogTitle id="save-dialog-title">Continue with saved attempt?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="save-dialog-description">
                        Do you want to load your previous unfinished attempt?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRestart}>Restart</Button>
                    <Button onClick={handleContinue}>Load Save</Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}

export default LevelContent;
