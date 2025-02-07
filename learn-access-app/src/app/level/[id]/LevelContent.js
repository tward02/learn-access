'use client'

import TopBar from "@/app/ui/component/topBar/TopBar";
import {Button, Grid2, Stack} from "@mui/material";
import modules from "./levels.module.css"
import {
    SandpackCodeEditor,
    SandpackConsole,
    SandpackLayout,
    SandpackPreview,
    SandpackProvider
} from "@codesandbox/sandpack-react";
import {testFiles} from "@/app/ui/testData";

const LevelContent = ({session, user, id}) => {

    return (
        <main className={modules.gridContainer}>

            <TopBar title={"Level Name"} loggedIn={session} username={user?.username}/>
            <SandpackProvider template={"react"} className={modules.provider} files={testFiles}>
                <Grid2 container sx={{width: "100%", height: "100%", margin: 0}}>
                    <Grid2 item direction="column" size={2.5}>
                        <div className={modules.descriptionGrid}>
                            {/*description*/}
                            <h2 className={modules.leftTitle}>Description:</h2>
                            <p className={modules.leftText}>Test description this is a level to teach you about WCAG and
                                other important accessibility features in the React programming language</p>
                        </div>
                        <div className={modules.objectivesGrid}>
                            {/*objectives*/}
                            <h2 className={modules.leftTitle}>Objectives:</h2>
                            <p className={modules.leftText}>Test objectives this is a level to teach you about WCAG and
                                other important accessibility features in the React programming language</p>
                        </div>
                    </Grid2>
                    <Grid2 item size={4.5}>
                        <div className={modules.codeEditorGrid}>
                            {/*code editor*/}
                            <SandpackCodeEditor className={modules.codeEditor} showTabs showLineNumbers showInlineErrors wrapContent/>
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
                                            <Button variant={"contained"}>Hints</Button>
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
                                <SandpackPreview className={modules.preview}/>
                            </SandpackLayout>
                            <SandpackConsole className={modules.previewConsole}/>
                        </div>
                    </Grid2>
                </Grid2>

            </SandpackProvider>
        </main>
    );
}

export default LevelContent;
