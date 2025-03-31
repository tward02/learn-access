'use client'

import {
    Button, Card, CardContent, CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, TextField,
} from "@mui/material";
import forumPostModules from "@/app/ui/component/forumPost/forumPost.module.css";
import modules from "./createPost.module.css";
import {SandpackCodeViewer} from "@codesandbox/sandpack-react";
import {useEffect, useState} from "react";
import {useCreatePost} from "@/app/ui/api/useCreatePost";
import {useRouter} from "next/navigation";

const CreatePost = ({open, files, handleCancel, levelId}) => {

    const router = useRouter();

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [titleError, setTitleError] = useState("");
    const [messageError, setMessageError] = useState("");
    const [postError, setPostError] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        createPostError,
        createPostFn,
        createPostIsSuccess
    } = useCreatePost(levelId);

    //handles API sending and responses
    useEffect(() => {
        if (createPostIsSuccess) {
            router.push("/forum/" + levelId);
        }
    }, [createPostIsSuccess, router]);

    useEffect(() => {
        if (createPostError?.status === 401) {
            router.push("/login");
        } else if (createPostError?.status === 403 || createPostError?.status === 404) {
            router.push("/");
        } else if (createPostError) {
            setPostError(true);
            setLoading(false);
        }
    }, [createPostError, router]);

    const handlePost = () => {
        if (validate()) {
            setLoading(true);
            const payload = {
                title: title,
                message: message,
                files: [
                    {
                        name: "App.js",
                        fileType: "js",
                        content: files["/App.js"]?.code
                    },
                    {
                        name: "styles.css",
                        fileType: "css",
                        content: files["/styles.css"]?.code
                    }
                ]
            }
            createPostFn(payload);
        }
    }

    //validates form fields
    const validate = () => {
        setTitleError("");
        setMessageError("");

        let valid = true;

        if (title.length === 0) {
            setTitleError("Required Field");
            valid = false;
        }

        if (title.length > 255) {
            setTitleError("Maximum Length 255 Characters");
            valid = false;
        }

        if (message.length === 0) {
            setMessageError("Required Field");
            valid = false;
        }
        return valid;
    }

    return (
        <Dialog maxWidth={"md"} fullWidth={true} aria-labelledby="create-post-dialog-title"
                open={open}>
            <DialogTitle id="create-post-dialog-title">Post Solution</DialogTitle>
            <DialogContent>
                <Card className={forumPostModules.post} style={{width: "100%"}}>
                    <CardContent className={modules.card}>
                        {loading ? <div className={modules.loading}><CircularProgress/></div> : <><TextField
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }} error={titleError.length > 0} helperText={titleError.length > 0 && titleError}
                            className={modules.titleField} placeholder={"Post Title"}/>
                            {files && (<div className={forumPostModules.codeDisplay}>
                                <SandpackCodeViewer showTabs showLineNumbers wrapContent/>
                            </div>)}
                            <div>
                                <TextField onChange={(event) => {
                                    setMessage(event.target.value);
                                }} error={messageError.length > 0} helperText={messageError.length > 0 && messageError}
                                           className={modules.messageField} placeholder={"Post Message"}
                                           multiline={true}/>
                                {postError && <p className={modules.error}>Failed to create post. Please try again</p>}
                            </div>
                        </>}
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} onClick={handleCancel}>Cancel</Button>
                <Button disabled={loading} onClick={handlePost}>Post</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreatePost;
