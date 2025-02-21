import modules from "./forumPost.module.css"
import {
    Avatar, Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    styled, TextField, Tooltip, Typography,
} from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import {Fragment, useState} from "react";
import {SandpackCodeViewer, SandpackProvider} from "@codesandbox/sandpack-react";
import Comment from "./Comment"
import {formatFiles, getAvatarColour} from "@/app/ui/utility";

const ForumPost = ({currentUser, post}) => {

    const ExpandMore = styled((props) => {
        const {expand, ...other} = props;
        return <IconButton {...other} />;
    })(({theme}) => ({
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        variants: [
            {
                props: ({expand}) => !expand,
                style: {
                    transform: 'rotate(0deg)',
                },
            },
            {
                props: ({expand}) => !!expand,
                style: {
                    transform: 'rotate(180deg)',
                },
            },
        ],
    }));

    const [expanded, setExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likes, setLikes] = useState(post.likes);
    const [comments, setComments] = useState(post.comments);
    const [addCommentOpen, setAddCommentOpen] = useState(false);
    const [commentText, setCommentText] = useState("");

    //TODO add comment creation functionality
    //TODO Comment and post sorting functionality



    const likePost = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    }

    const addComment = () => {
        setAddCommentOpen(true);
    }

    const closeAddComment = () => {
        setAddCommentOpen(false);
        setCommentText("");
    }

    const handleAddComment = () => {
        if (!commentText || commentText?.trim() === "") {

        } else {
            //Add comment text
            console.log(commentText);
            closeAddComment();
        }
    }

    const cardSx = currentUser.id === post.userId ? {backgroundColor: "#f7ebc8"} : {};

    return (
        <Fragment>
            <Card className={modules.post} sx={cardSx}>
                <CardHeader title={post.title} subheader={post.timestamp} avatar={
                    <Avatar sx={{bgcolor: getAvatarColour(post.username)}} aria-label={"User " + post.username}>
                        {post.username.charAt(0).toUpperCase()}
                    </Avatar>
                } action={
                    <IconButton color={isLiked ? "primary" : ""} aria-label="like post" onClick={likePost}>
                        <ThumbUpIcon className={modules.likeIcon}/>
                        {post.likes}
                    </IconButton>
                }/>
                <CardContent>
                    {post?.files?.length > 0 && (<div className={modules.codeDisplay}>
                        <SandpackProvider template={"react"} files={formatFiles(post.files)}>
                            <SandpackCodeViewer showTabs showLineNumbers wrapContent/>
                        </SandpackProvider>
                    </div>)}
                    <div>
                        {post.message}
                    </div>
                </CardContent>
                <CardActions>
                <span>
                    {comments.length > 0 && <ExpandMore expand={expanded}
                                                        onClick={() => setExpanded(!expanded)}
                                                        aria-expanded={expanded}
                                                        aria-label="View comments">
                        <ExpandMoreIcon/>
                    </ExpandMore>}
                    {comments.length + " Comments "}
                </span>
                    <Tooltip title={"Add Comment"}>
                        <IconButton onClick={addComment}>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {comments.length > 0 ? (
                            comments.map((comment) =>
                                <Comment key={comment.id} comment={comment} handleLike={() => {
                                }} currentUser={currentUser}/>
                            )
                        ) : <Typography variant="body2" color="textSecondary" component="div">No comments yet, check
                            back
                            later</Typography>}
                    </CardContent>
                </Collapse>
            </Card>
            <Dialog open={addCommentOpen} onClose={closeAddComment} fullWidth>
                <DialogTitle>Add Comment</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required margin={"dense"} label="Comment" fullWidth variant="standard"
                               onChange={(e) => setCommentText(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddComment}>Cancel</Button>
                    <Button onClick={handleAddComment}>Add Comment</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default ForumPost;
