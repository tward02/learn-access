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

const exampleResponse = { //200 OK
    passed: false,
    tests: [
        {
            name: "test 1 - tests whether the code renders",
            passed: true,
            message: ""
        },
        {
            name: "test 2 - tests whether the code is accessible",
            passed: true,
            message: ""
        },
        {
            name: "test 2 - tests whether the code is accessible + a really long bit of text to test overflow",
            passed: false,
            message: "Failed to find aria labels on text field"
        },
        {
            name: "test 2 - tests whether the code is accessible + a really long bit of text to test overflow",
            passed: false,
            message: "Title is missing an accessible name"
        },
        {
            name: "test 2 - tests whether the code is accessible + a really long bit of text to test overflow",
            passed: true,
            message: ""
        }
    ]
}

const Sandbox = ({level, user, id}) => {

    const {sandpack} = useSandpack();

    useEffect(() => {
        console.log(sandpack.files);
    }, [sandpack.files]);

    const formatTestResults = (results) => {
        const passed = results.passed;
        let numPassed = 0;
        results.tests.forEach((test) => {
            if (test.passed) {
                numPassed++;
            }
        })

        return (
            <div className={modules.testResultsField}>
                <div key={0}
                     className={passed ? modules.testPassed : modules.testFailed}>{"RESULTS: " + (numPassed) + " PASSED, " + (results.tests.length - numPassed) + " FAILED, " + (results.tests.length) + " TOTAL"}</div>
                {results.tests.map((testResult, index) => (<div key={index + 1}
                                                                className={testResult.passed ? modules.testPassed : modules.testFailed}>{testResult.name + ": " + (testResult.passed ? "PASSED" : "FAILED - " + testResult.message)}</div>))}
            </div>

        );
    }

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
                                    {formatTestResults(exampleResponse)}
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
