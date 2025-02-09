'use client'

import TopBar from "@/app/ui/component/topBar/TopBar";
import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid2,
    Stack
} from "@mui/material";
import modules from "./levels.module.css"
import {
    SandpackCodeEditor,
    SandpackConsole,
    SandpackLayout,
    SandpackPreview,
    SandpackProvider
} from "@codesandbox/sandpack-react";
import {formatFiles} from "@/app/ui/utility";
import {useFetchLevel} from "@/app/ui/api/useFetchLevel";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

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
            <SandpackProvider template={"react"} className={modules.provider} files={formatFiles(level?.files)}>
                <Grid2 container sx={{width: "100%", height: "100%", margin: 0}}>
                    <Grid2 item direction="column" size={2.5}>
                        <div className={modules.descriptionGrid}>
                            {/*description*/}
                            <h2 className={modules.leftTitle}>Description:</h2>
                            <p className={modules.leftText}>{level?.description}</p>
                        </div>
                        <div className={modules.objectivesGrid}>
                            {/*objectives*/}
                            <h2 className={modules.leftTitle}>Objectives:</h2>
                            <p className={modules.leftText}>{level?.objectives}</p>
                        </div>
                    </Grid2>
                    <Grid2 item size={4.5}>
                        <div className={modules.codeEditorGrid}>
                            {/*code editor*/}
                            <SandpackCodeEditor className={modules.codeEditor} showTabs showLineNumbers showInlineErrors
                                                wrapContent/>
                        </div>
                        <div className={modules.testGrid}>
                            <Grid2 container sx={{width: "100%", height: "100%", margin: 0}}>
                                <Grid2 item size={9}>
                                    <div className={modules.testConsole}>
                                        <h2 className={modules.testTitle}>Test Output:</h2>
                                        <div className={modules.testingDisplay}>
                                            {/*test console*/}
                                        </div>
                                    </div>
                                </Grid2>
                                <Grid2 item size={3}>
                                    <div className={modules.actionButtons}>
                                        {/*action buttons*/}
                                        <Stack spacing={3}>
                                            <Button variant={"contained"}>{"Hints 0/3"}</Button>
                                            <Button variant={"contained"} color={"error"}>Reset</Button>
                                            <Button variant={"contained"} color={"success"}>Submit</Button>
                                            <Button variant={"contained"} color={"secondary"}>Solution</Button>
                                        </Stack>
                                    </div>
                                </Grid2>
                            </Grid2>
                        </div>
                    </Grid2>
                    <Grid2 item size={5}>
                        <div className={modules.previewGrid}>
                            {/*code preview*/}
                            <SandpackLayout className={modules.previewContainer}>
                                {!levelLoading && !levelError && <SandpackPreview className={modules.preview}/>}
                            </SandpackLayout>
                            <SandpackConsole className={modules.previewConsole}/>
                        </div>
                    </Grid2>
                </Grid2>
            </SandpackProvider>
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
