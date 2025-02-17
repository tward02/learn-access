'use client'

import {
    SandpackCodeEditor,
    SandpackConsole,
    SandpackLayout,
    SandpackPreview,
    useSandpack
} from "@codesandbox/sandpack-react";
import {useEffect, useState} from "react";
import {
    Button, CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid2,
    Stack
} from "@mui/material";
import modules from "@/app/level/[id]/levels.module.css";
import {usePostSolution} from "@/app/ui/api/useTestSolution";
import {useRouter} from "next/navigation";

const Sandbox = ({level, user, id}) => {

    const router = useRouter();
    const {
        testSolutionLoading,
        testSolutionError,
        testSolutionData,
        testSolution,
        testSolutionSuccess
    } = usePostSolution(id);
    const {sandpack} = useSandpack();
    const [testError, setTestError] = useState(false);
    const [testResults, setTestResults] = useState(null);
    const [testsLoading, setTestsLoading] = useState(false);

    useEffect(() => {
        if (testSolutionData && testSolutionSuccess) {
            setTestsLoading(false);
            setTestResults(testSolutionData);
        }
    }, [testSolutionData, testSolutionSuccess]);

    useEffect(() => {
        if (testSolutionError?.status === 401) {
            router.push("/login");
        } else if (testSolutionError?.status === 403) {
            router.push("/");
        } else if (testSolutionError) {
            setTestsLoading(false)
            setTestError(true);
        }
    }, [testSolutionError])

    const handleTestSolution = () => {
        const payload = {
            code: sandpack?.files["/App.js"]?.code,
            css: sandpack?.files["/styles.css"]?.code,
            user: {
                id: user.id,
                password: user.password
            }
        }
        testSolution(payload);
        setTestsLoading(true);
    }

    const formatTestResults = (results) => {
        if (results) {
            const passed = results.passed;
            let numPassed = 0;
            results?.tests?.forEach((test) => {
                if (test.passed) {
                    numPassed++;
                }
            })

            return (
                <div className={modules.testResultsField}>
                    <div key={0}
                         className={passed ? modules.testPassed : modules.testFailed}>{"RESULTS: " + (numPassed) + " PASSED, " + (results?.tests?.length - numPassed) + " FAILED, " + (results?.tests?.length) + " TOTAL"}</div>
                    {results?.tests?.map((testResult, index) => (<div key={index + 1}
                                                                      className={testResult?.passed ? modules?.testPassed : modules.testFailed}>{testResult?.name + ": " + (testResult?.passed ? "PASSED" : "FAILED - " + testResult?.message)}</div>))}
                </div>
            );
        } else {
            return <div className={modules.testResultsField}>Please run the tests to view the results</div>
        }
    }

    return (
        <>
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
                                        {testSolutionLoading || testsLoading ?
                                            <div className={modules.testsLoading}><CircularProgress/>
                                            </div> : formatTestResults(testResults)}
                                    </div>
                                </div>
                            </Grid2>
                            <Grid2 item size={3}>
                                <div className={modules.actionButtons}>
                                    {/*action buttons*/}
                                    <Stack spacing={3}>
                                        <Button disabled={testSolutionLoading || testsLoading}
                                                variant={"contained"}>{"Hints 0/3"}</Button>
                                        <Button disabled={testSolutionLoading || testsLoading} variant={"contained"}
                                                color={"error"}>Reset</Button>
                                        <Button disabled={testSolutionLoading || testsLoading} variant={"contained"}
                                                color={"success"} onClick={handleTestSolution}>Submit</Button>
                                        <Button disabled={testSolutionLoading || testsLoading} variant={"contained"}
                                                color={"secondary"}>Solution</Button>
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
                        <h3 className={modules.consoleTitle}>Console Output:</h3>
                        <SandpackConsole className={modules.previewConsole}/>
                    </div>
                </Grid2>
            </Grid2>
            <Dialog aria-labelledby="error-dialog-title" aria-describedby="error-dialog-description"
                    open={testError}
                    onClose={() => setTestError(false)}>
                <DialogTitle id="error-dialog-title">Error Running Tests</DialogTitle>
                <DialogContent>
                    <DialogContentText id="error-dialog-description">
                        There has been an error running the test suite for this level, please ensure your code is valid
                        and free from syntax errors by looking at the console output. If it is then please try again
                        later.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Sandbox;
