import {
    SandpackCodeEditor,
    SandpackConsole,
    SandpackLayout,
    SandpackPreview,
    useSandpack
} from "@codesandbox/sandpack-react";
import {useEffect} from "react";
import {Button, Grid2, Stack} from "@mui/material";
import modules from "@/app/level/[id]/levels.module.css";

const Sandbox = ({level, user, id}) => {

    const {sandpack} = useSandpack();

    useEffect(() => {
        console.log(sandpack.files);
    }, [sandpack.files]);

    return (
        <Grid2 container sx={{width: "100%", height: "100%", margin: 0}}>
            <Grid2 item direction="column" size={2.5}>
                <div className={modules.descriptionGrid}>
                    {/*description*/}
                    <h2 className={modules.leftTitle}>Description:</h2>
                    <p className={modules.leftText}>{level?.enhanceddescription}</p>
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
                    <SandpackCodeEditor className={modules.codeEditor} showTabs showLineNumbers
                                        showInlineErrors
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
                        <SandpackPreview className={modules.preview}/>
                    </SandpackLayout>
                    <SandpackConsole className={modules.previewConsole}/>
                </div>
            </Grid2>
        </Grid2>
    );
}

export default Sandbox;
