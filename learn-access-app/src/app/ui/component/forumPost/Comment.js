import modules from "./forumPost.module.css"
import {Avatar, Card, CardHeader, IconButton, Tooltip, Typography} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {useState} from "react";
import {useLikeComment} from "@/app/ui/api/useLikeComment";
import {useUnlikeComment} from "@/app/ui/api/useUnlikeComment";
import {getAvatarColour} from "@/app/ui/utility";

//represents a comment on a post and handles likes and unlikes
const Comment = ({comment, currentUser, updateLike}) => {

    const [likes, setLikes] = useState(Number(comment.likes));
    const [isLiked, setIsLiked] = useState(comment.isliked);

    const {likeCommentFn} = useLikeComment(comment.id);
    const {unlikeCommentFn} = useUnlikeComment(comment.id);

    const likeComment = () => {
        if (isLiked) {
            updateLike(-1, comment.id);
            setLikes(likes - 1);
            unlikeCommentFn();
        } else {
            updateLike(1, comment.id);
            setLikes(likes + 1);
            likeCommentFn();
        }
        setIsLiked(!isLiked);
    }

    const cardSx = {
        display: 'flex',
        flexDirection: 'column',
        minWidth: "100%",
        marginBottom: "20px",
        border: "1px solid lightgray"
    }

    if (comment.userid === currentUser.id) {
        cardSx.backgroundColor = "lightYellow";
    }

    return (
        <Card sx={cardSx}>
            <CardHeader title={<Typography variant="body2">
                <h2>{comment.message}</h2>
            </Typography>} subheader={<Typography variant="caption" color="text.secondary">
                {new Date(Date.parse(comment.datetime)).toLocaleString()}
            </Typography>} avatar={
                <Tooltip title={comment.username}>
                    <Avatar sx={{bgcolor: getAvatarColour(comment.username)}} aria-label={"User " + comment.username}>
                        {comment.username.charAt(0).toUpperCase()}
                    </Avatar>
                </Tooltip>
            } action={
                <IconButton color={isLiked ? "primary" : ""}
                            aria-label={isLiked ? "unlike " + comment.message + "comment: " + likes : "like " + comment.message + " comment: " + likes}
                            onClick={likeComment}>
                    <ThumbUpIcon className={modules.likeIcon}/>
                    {likes}
                </IconButton>
            }/>
        </Card>
    )
}

export default Comment;
