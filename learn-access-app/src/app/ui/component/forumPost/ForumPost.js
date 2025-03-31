import modules from "./forumPost.module.css"
import {
    Avatar, Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, CircularProgress,
    Collapse, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    styled, TextField, Tooltip, Typography,
} from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import {Fragment, useEffect, useState} from "react";
import {SandpackCodeViewer, SandpackProvider} from "@codesandbox/sandpack-react";
import Comment from "./Comment"
import {formatFiles, getAvatarColour} from "@/app/ui/utility";
import {useLikePost} from "@/app/ui/api/useLikePost";
import {useUnlikePost} from "@/app/ui/api/useUnlikePost";
import {useCreateComment} from "@/app/ui/api/useCreateComment";
import {useRouter} from "next/navigation";

//representa a post in a forum
const ForumPost = ({currentUser, post, updateLikes}) => {

    //adapted from https://mui.com/material-ui/react-card/?srsltid=AfmBOoobtfeCJGpWXMCiBmQldTGBlUy-SyPSKk8Rx6hkH6FAsXnmBmZz
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

    const router = useRouter();

    const [expanded, setExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(post.isliked);
    const [likes, setLikes] = useState(Number(post.likes));
    const [comments, setComments] = useState(post.comments);
    const [addCommentOpen, setAddCommentOpen] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [commentError, setCommentError] = useState(false);
    const [commentCreateError, setCommentCreateError] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);

    const {likePostFn} = useLikePost(post.id);
    const {unlikePostFn} = useUnlikePost(post.id);
    const {
        createCommentError,
        createCommentData,
        createCommentFn,
        createCommentIsSuccess
    } = useCreateComment(post.id);

    //handles API responses
    useEffect(() => {
        if (createCommentIsSuccess && createCommentData) {
            const comment = {
                id: createCommentData?.id,
                userid: currentUser.id,
                username: currentUser.username,
                message: commentText,
                datetime: new Date(),
                likes: 0,
                isLiked: false
            }
            const newComments = [comment, ...comments];
            setComments(newComments);
            setCommentLoading(false);
            closeAddComment();
        }
    }, [createCommentIsSuccess, createCommentData]);

    useEffect(() => {
        if (createCommentError?.status === 401) {
            router.push("/login");
        } else if (createCommentError?.status === 403 || createCommentError?.status === 404) {
            router.push("/");
        } else if (createCommentError) {
            setCommentCreateError(true);
            setCommentLoading(false);
        }
    }, [createCommentError, router]);

    const likePost = () => {
        if (isLiked) {
            setLikes(likes - 1);
            updateLikes(-1, post.id);
            unlikePostFn();
        } else {
            setLikes(likes + 1);
            updateLikes(1, post.id);
            likePostFn();
        }
        setIsLiked(!isLiked);
    }

    const handleCommentLike = (modifier, id) => {
        const updatedComments = [...comments];
        updatedComments.map((comment) => {
            if (id === comment.id) {
                comment.likes += modifier;
            }
            return comment;
        })
        setComments(updatedComments);
    }

    const addComment = () => {
        setAddCommentOpen(true);
    }

    const closeAddComment = () => {
        setAddCommentOpen(false);
        setCommentText("");
        setCommentCreateError(false);
        setCommentError(false);
    }

    const handleAddComment = () => {
        setCommentCreateError(false);
        setCommentError(false);
        if (!commentText || commentText?.trim() === "") {
            setCommentError(true);
        } else {
            setCommentLoading(true);
            createCommentFn({message: commentText})
        }
    }

    const handleSortLikes = () => {
        const sortedComments = [...comments];
        sortedComments.sort((a, b) => {
            return Number(b.likes) - Number(a.likes);
        })
        setComments(sortedComments);
    }

    const handleSortDates = () => {
        const sortedComments = [...comments];
        sortedComments.sort((a, b) => {
            return (new Date(Date.parse(b.datetime)) - new Date(Date.parse(a.datetime)));
        })
        setComments(sortedComments);
    }

    const cardSx = currentUser?.id === post.userid ? {backgroundColor: "#f7ebc8"} : {};

    return (
        <Fragment>
            {/*main forum section*/}
            <Card className={modules.post} sx={cardSx}>
                <CardHeader title={<Typography fontWeight="bold">
                    {post.title}
                </Typography>} subheader={new Date(Date.parse(post.datetime)).toLocaleString()} avatar={
                    <Tooltip title={post.username}>
                        <Avatar sx={{bgcolor: getAvatarColour(post.username)}} aria-label={"User " + post.username}>
                            {post.username.charAt(0).toUpperCase()}
                        </Avatar>
                    </Tooltip>
                } action={
                    <IconButton color={isLiked ? "primary" : ""} aria-label="like post" onClick={likePost}>
                        <ThumbUpIcon className={modules.likeIcon}/>
                        {likes}
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
                    <ExpandMore expand={expanded}
                                onClick={() => setExpanded(!expanded)}
                                aria-expanded={expanded}
                                aria-label="View comments">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                    {comments.length + " Comments "}
                </span>
                </CardActions>
                {/*comments display*/}
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Button onClick={addComment} startIcon={<AddIcon/>}>
                            Comment
                        </Button>
                        <Button onClick={handleSortLikes} startIcon={<SortIcon/>}>
                            Likes
                        </Button>
                        <Button onClick={handleSortDates} startIcon={<SortIcon/>}>
                            Date
                        </Button>
                        {comments.length > 0 ? (
                            comments.map((comment) =>
                                <Comment key={comment.id} comment={comment} currentUser={currentUser}
                                         updateLike={handleCommentLike}/>
                            )
                        ) : <Typography variant="body2" color="textSecondary" component="div">No comments yet, check
                            back
                            later</Typography>}
                    </CardContent>
                </Collapse>
            </Card>
            <Dialog open={addCommentOpen} onClose={closeAddComment} fullWidth aria-labelledby="comment-dialog-title">
                <DialogTitle id={"comment-dialog-title"}>Add Comment</DialogTitle>
                <DialogContent>
                    {commentLoading ? <div className={modules.loading}><CircularProgress/></div> : <><TextField
                        autoFocus required margin={"dense"} label="Comment" fullWidth variant="standard"
                        onChange={(e) => setCommentText(e.target.value)}/>
                        {commentCreateError &&
                            <p className={modules.error}>Failed to create comment, please try again</p>}
                        {commentError && <p className={modules.error}>{"Comment can't be empty"}</p>}
                    </>}
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
