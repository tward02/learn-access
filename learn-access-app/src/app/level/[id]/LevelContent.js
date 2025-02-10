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

    const {levelLoading, levelError, levelData, levelSuccess} = useFetchLevel(id);

    useEffect(() => {
        if (levelData && levelSuccess) {
            setLevel(levelData);
        }
    }, [levelSuccess, levelData]);

    const closeErrorPopup = () => {
        router.push("/");
    }

    return (
        <main className={modules.gridContainer}>
            <TopBar title={level?.title} loggedIn={session} username={user?.username} back/>
            {!levelLoading && !levelError &&
                <SandpackProvider template={"react"} className={modules.provider} files={formatFiles(level?.files)}>
                    <Sandbox user={user} id={id} level={level}/>
                </SandpackProvider>}
            <Backdrop open={levelLoading}>
                <CircularProgress/>
            </Backdrop>
            <Dialog aria-labelledby="error-dialog-title" aria-describedby="error-dialog-description" open={levelError}
                    onClose={closeErrorPopup}>
                <DialogTitle id="error-dialog-title">Error Loading Level</DialogTitle>
                <DialogContent>
                    <DialogContentText id="error-dialog-description">
                        There has been an error loading this level, please return to the homepage and try again later.
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
