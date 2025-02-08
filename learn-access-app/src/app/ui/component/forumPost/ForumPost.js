import modules from "./forumPost.module.css"
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    IconButton,
    styled, Typography,
} from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import tinycolor from "tinycolor2";
import {useState} from "react";
import {SandpackCodeViewer, SandpackProvider} from "@codesandbox/sandpack-react";
import Comment from "./Comment"

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

    //TODO add comment creation functionality
    //TODO hook up to API
    //TODO Comment and post sorting functionality

    const getAvatarColour = (username) => {
        const hash = [...username].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colour = tinycolor({h: hash % 360, s: 70, l: 55});

        if (tinycolor.isReadable(colour, "#000", {level: "AA", size: "small"})) {
            return colour.toHexString();
        } else {
            return colour.lighten(10).toHexString();
        }
    }

    const likePost = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    }

    const formatFiles = (files) => {
        return files.reduce((acc, item) => {
            acc[item.name] = {code: item.content};
            return acc;
        }, {});
    }

    const cardSx = currentUser.id === post.userId ? {backgroundColor: "#f7ebc8"} : {};

    return (
        <Card className={modules.post} sx={cardSx}>
            <CardHeader title={post.title} subheader={post.timestamp} avatar={
                <Avatar sx={{bgcolor: getAvatarColour(post.username)}} aria-label={"User " + post.username}>
                    {post.username.charAt(0).toUpperCase()}
                </Avatar>
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
            <CardActions disableSpacing>
                <span>
                    {comments.length + " Comments "}
                    {comments.length > 0 && <ExpandMore expand={expanded}
                                                               onClick={() => setExpanded(!expanded)}
                                                               aria-expanded={expanded}
                                                               aria-label="View comments">
                        <ExpandMoreIcon/>
                    </ExpandMore>}
                </span>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {comments.length > 0 ? (
                        comments.map((comment) =>
                            <Comment key={comment.id} comment={comment} handleLike={() => {}} currentUser={currentUser}/>
                        )
                    ) : <Typography variant="body2" color="textSecondary" component="div">No comments yet, check back later</Typography>}
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default ForumPost;
