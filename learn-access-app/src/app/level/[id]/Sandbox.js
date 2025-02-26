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
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid2,
    IconButton,
    Stack
} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import modules from "@/app/level/[id]/levels.module.css";
import {useTestSolution} from "@/app/ui/api/useTestSolution";
import {useRouter} from "next/navigation";
import {useSubmitSolution} from "@/app/ui/api/useSubmitSolution";
import CreatePost from "@/app/ui/component/createPost/CreatePost";

const testHints = [
    {
        name: "Hint 1",
        content: "This is a hint for the current level that is really useful to the users"
    },
    {
        name: "Hint 2",
        content: "This is a hint for the current level that is really useful to the users, This is a hint for the current level that is really useful to the users. This is a hint for the current level that is really useful to the users. This is a hint for the current level that is really useful to the users"
    },
    {
        name: "Hint 3",
        content: "This is a hint for the current level that is really useful to the users, This is a hint for the current level that is really useful to the users. This is a hint for the current level that is really useful to the users"
    }
]

const Sandbox = ({level, user, id}) => {

    const router = useRouter();
    const {
        testSolutionLoading,
        testSolutionError,
        testSolutionData,
        testSolution,
        testSolutionSuccess
    } = useTestSolution(id);
    const {
        submitSolutionLoading,
        submitSolutionError,
        submitSolutionData,
        submitSolutionFn,
        submitSolutionSuccess
    } = useSubmitSolution(id);

    const {sandpack} = useSandpack();

    const [testError, setTestError] = useState(false);
    const [testResults, setTestResults] = useState(null);
    const [testsLoading, setTestsLoading] = useState(false);
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [resetOpen, setResetOpen] = useState(false);
    const [submissionFailedOpen, setSubmissionFailedOpen] = useState(false);
    const [hintsOpen, setHintsOpen] = useState(false);
    const [hintsViewed, setHintsViewed] = useState(0);
    const [selectedHint, setSelectedHint] = useState(0);
    const [canSubmit, setCanSubmit] = useState(false);
    const [postSolutionOpen, setPostSolutionOpen] = useState(false);

    useEffect(() => {
        if (testSolutionData && testSolutionSuccess) {
            setTestsLoading(false);
            setTestResults(testSolutionData);
        }
    }, [testSolutionData, testSolutionSuccess]);

    useEffect(() => {
        if (submitSolutionSuccess && submitSolutionData) {
            if (submitSolutionData.success) {
                setValid(true);
            } else {
                setSubmissionFailedOpen(true);
            }
            setSubmissionLoading(false);
        }
    }, [submitSolutionData, submitSolutionSuccess]);

    useEffect(() => {
        if (testSolutionError?.status === 401) {
            router.push("/login");
        } else if (testSolutionError?.status === 403 || testSolutionError?.status === 404) {
            router.push("/");
        } else if (testSolutionError) {
            setTestsLoading(false);
            setTestError(true);
        }
    }, [testSolutionError, router]);

    useEffect(() => {
        if (submitSolutionError?.status === 401) {
            router.push("/login");
        } else if (submitSolutionError?.status === 403 || submitSolutionError?.status === 404) {
            router.push("/");
        } else if (submitSolutionError) {
            setSubmissionLoading(false);
            setTestError(true);
        }
    }, [submitSolutionError, router]);

    useEffect(() => {
        if (testResults) {
            setCanSubmit(testResults.passed)
        }
    }, [testResults]);

    useEffect(() => {
        setCanSubmit(false);
    }, [sandpack?.files["/App.js"]?.code, sandpack?.files["/styles.css"]?.code]);

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

    const handleTestSubmission = () => {
        const payload = {
            code: sandpack?.files["/App.js"]?.code,
            css: sandpack?.files["/styles.css"]?.code,
            user: {
                id: user.id,
                password: user.password
            }
        }
        submitSolutionFn(payload);
        setSubmissionLoading(true);
    }

    const handleReset = () => {
        sandpack.resetAllFiles();
        setResetOpen(false);
    }

    const handleHint = () => {
        setHintsOpen(true);
        if (hintsViewed < testHints.length) {
            setHintsViewed(hintsViewed + 1);
        }
    }

    const handleHintClose = () => {
        setHintsOpen(false);
        if (hintsViewed < testHints.length) {
            setSelectedHint(selectedHint + 1);
        }
    }

    const handleHintMoveRight = () => {
        if (selectedHint < testHints.length - 1 && selectedHint + 1 < hintsViewed) {
            setSelectedHint(selectedHint + 1);
        }
    }

    const handleHintMoveLeft = () => {
        if (selectedHint > 0) {
            setSelectedHint(selectedHint - 1);
        }
    }

    const handleCancelPost = () => {
        setPostSolutionOpen(false);
        setValid(true);
    }

    const handleOpenPost = () => {
        setValid(false);
        setPostSolutionOpen(true);
    }

    const handleGoToForum = () => {
        router.push("/forum/" + id);
    }

    const filterMessage = (message) => {
        return message.replaceAll(/\x1B\[\d+m/g, "");
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

            if (results.length === 0) {
                return <div
                    className={modules.testFailed}>{"Error running tests, possible that yor code contains syntax errors preventing it form rendering"}</div>
            }

            return (
                <div className={modules.testResultsField}>
                    <div key={0}
                         className={passed ? modules.testPassed : modules.testFailed}>{"RESULTS: " + (numPassed) + " PASSED, " + (results?.tests?.length - numPassed) + " FAILED, " + (results?.tests?.length) + " TOTAL"}</div>
                    {results?.tests?.map((testResult, index) => (<div key={index + 1}
                                                                      className={testResult?.passed ? modules?.testPassedDisplay : modules.testFailedDisplay}>
                        <span
                            className={modules.testNameResult}>{testResult?.name + ": " + (testResult?.passed ? "PASSED" : "FAILED")}</span><span>{(testResult?.message ? (" - " + (testResult.type === "jest" ? testResult.message.toString().split(/\r?\n/)[0] : filterMessage(testResult.message.toString()))) : "")}</span>
                    </div>))}
                </div>
            );
        } else {
            return <div className={modules.testResultsField}>Please run the tests to view the results</div>
        }
    }

    const makeDescription = () => {
        const parts = level?.enhanceddescription.toString().split("\\links\\");
        if (parts) {
            return parts[0].split(/\r?\n\r?\n/).map((description, index) => (
                <p key={index} className={modules.leftText}>{description}</p>));
        }
        return <></>
    }


    const makeLinks = () => {
        const parts = level?.enhanceddescription.toString().split("\\links\\");
        if (parts && parts.length > 1) {
            console.log("here")
            return parts[1].split(",").map((link, index) => {
                return (<div key={index}><a rel={"WCAG Reference"} href={link}
                                            className={modules.descriptionLink}>{link}</a></div>);
            })
        }
    }

    //TODO add below description that sets out general info like screen reader, don't delete IDs, change component signature etc...

    return (
        <>
            <Grid2 container sx={{width: "100%", height: "100%", margin: 0}}>
                <Grid2 item direction="column" size={2.5}>
                    <div className={modules.descriptionGrid}>
                        {/*description*/}
                        <h2 className={modules.leftTitle}>Description:</h2>
                        {makeDescription()}
                        <div className={modules.linkBox}>{makeLinks()}</div>
                    </div>
                    <div className={modules.objectivesGrid}>
                        {/*objectives*/}
                        <h2 className={modules.leftTitle}>Objectives:</h2>
                        {level?.objectives.toString().split(/\r?\n\r?\n/).map((objective, index) => (
                            <p key={index} className={modules.leftText}>{objective}</p>))}
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
                                                variant={"contained"}
                                                onClick={handleHint}>{"Hints " + hintsViewed + "/" + testHints.length}</Button>
                                        <Button disabled={testSolutionLoading || testsLoading} variant={"contained"}
                                                color={"error"} onClick={() => setResetOpen(true)}>Reset</Button>
                                        <Button disabled={testSolutionLoading || testsLoading} variant={"contained"}
                                                color={"secondary"} onClick={handleTestSolution}>Test</Button>
                                        <Button disabled={testSolutionLoading || testsLoading || !canSubmit}
                                                variant={"contained"}
                                                color={"success"} onClick={handleTestSubmission}>Submit</Button>
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
            <Dialog aria-labelledby="success-dialog-title" aria-describedby="success-dialog-description" open={valid}>
                <DialogTitle id="success-dialog-title">Submission Successful</DialogTitle>
                <DialogContent>
                    <DialogContentText id="success-dialog-description">
                        Congratulations! You have passed the level, do you wish to post your solution or proceed to the
                        forum?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleGoToForum}>Go To Forum</Button>
                        <Button onClick={handleOpenPost} autoFocus>Post Solution</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Dialog aria-labelledby="loading-dialog-title" aria-describedby="loading-dialog-description"
                    open={submitSolutionLoading || submissionLoading}>
                <DialogTitle id="loading-dialog-title">Testing Submission, Please Wait...</DialogTitle>
                <DialogContent>
                    <DialogContentText className={modules.submissionLoading} id="loading-dialog-description">
                        <CircularProgress/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog aria-labelledby="reset-dialog-title" aria-describedby="reset-dialog-description"
                    open={resetOpen} onClose={() => setResetOpen(false)}>
                <DialogTitle id="reset-dialog-title">Warning, Resetting Could Result in Lost Progress</DialogTitle>
                <DialogContent>
                    <DialogContentText id="reset-dialog-description">
                        Are you sure you want to reset your code? This operation is permanent and cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setResetOpen(false)} autoFocus>Cancel</Button>
                    <Button onClick={handleReset}>Reset Code</Button>
                </DialogActions>
            </Dialog>
            <Dialog aria-labelledby="submission-failed-dialog-title"
                    aria-describedby="submission-failed-dialog-description"
                    open={submissionFailedOpen} onClose={() => setSubmissionFailedOpen(false)}>
                <DialogTitle id="submission-failed-dialog-title">Submission Failed</DialogTitle>
                <DialogContent>
                    <DialogContentText id="submission-failed-dialog-description">
                        {"Your submission didn\'t pass all of the tests. Please use the \"TEST\" button to see which ones it failed."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSubmissionFailedOpen(false)} autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog aria-labelledby="hint-dialog-title" open={hintsOpen} onClose={handleHintClose}>
                <DialogTitle id="hint-dialog-title">{testHints[selectedHint].name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="hint-dialog-description">
                        <Grid2 container sx={{width: "100%", height: "100%", margin: 0}}>
                            <Grid2 item direction="column" size={1}>
                                <IconButton size="medium" onClick={handleHintMoveLeft} disabled={selectedHint === 0}>
                                    <ArrowBackIosNewIcon fontSize="inherit"/>
                                </IconButton>
                            </Grid2>
                            <Grid2 item direction="column" size={10}>
                                {testHints[selectedHint].content}
                            </Grid2>
                            <Grid2 item direction="column" size={1}>
                                <IconButton size="medium" onClick={handleHintMoveRight}
                                            disabled={selectedHint === testHints.length - 1 || selectedHint + 1 >= hintsViewed}>
                                    <ArrowForwardIosIcon fontSize="inherit"/>
                                </IconButton>
                            </Grid2>
                        </Grid2>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <CreatePost open={postSolutionOpen} files={sandpack?.files} handleCancel={handleCancelPost} levelId={id}/>
        </>
    );
}

export default Sandbox;
