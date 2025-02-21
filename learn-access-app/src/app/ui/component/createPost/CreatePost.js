'use client'

import {
    Button, Card, CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, TextField,
} from "@mui/material";
import forumPostModules from "@/app/ui/component/forumPost/forumPost.module.css";
import modules from "./createPost.module.css";
import {SandpackCodeViewer} from "@codesandbox/sandpack-react";
import {useState} from "react";

const CreatePost = ({open, files, handleCancel}) => {

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [titleError, setTitleError] = useState("");
    const [messageError, setMessageError] = useState("");

    const handlePost = () => {
        validate();
        //TODO make post
    }

    const validate = () => {
        setTitleError("");
        setMessageError("");
        console.log("v")

        if (title.length === 0) {
            setTitleError("Required Field")
        }

        if (title.length > 255) {
            setTitleError("Maximum Length 255 Characters")
        }

        if (message.length === 0) {
            setMessageError("Required Field")
        }
    }


    return (
        <Dialog maxWidth={"md"} fullWidth={true} aria-labelledby="create-post-dialog-title"
                aria-describedby="create-post-dialog-description"
                open={open}>
            <DialogTitle id="create-post-dialog-title">Post Solution</DialogTitle>
            <DialogContent>
                <Card className={forumPostModules.post} style={{width: "100%"}}>
                    <CardContent className={modules.card}>
                        <TextField onChange={(event) => {
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
                                       className={modules.messageField} placeholder={"Post Message"} multiline={true}/>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handlePost}>Post</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreatePost;
