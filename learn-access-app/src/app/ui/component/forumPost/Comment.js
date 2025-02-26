import modules from "./forumPost.module.css"
import {Avatar, Card, CardHeader, IconButton, Tooltip, Typography} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {useState} from "react";
import {useLikeComment} from "@/app/ui/api/useLikeComment";
import {useUnlikeComment} from "@/app/ui/api/useUnlikeComment";
import {getAvatarColour} from "@/app/ui/utility";

const Comment = ({comment, currentUser}) => {

    const [likes, setLikes] = useState(Number(comment.likes));
    const [isLiked, setIsLiked] = useState(comment.isLiked);

    const {likeLoading, likeError, likeData, likeCommentFn, likeSuccess} = useLikeComment(comment.id);
    const {unlikeLoading, unlikeError, unlikeData, unlikeCommentFn, unlikeSuccess} = useUnlikeComment(comment.id);

    const likeComment = () => {
        if (isLiked) {
            setLikes(likes - 1);
            unlikeCommentFn();
        } else {
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
            <CardHeader title={<Typography variant="body2" fontWeight="bold">
                {comment.message}
            </Typography>} subheader={<Typography variant="caption" color="text.secondary">
                {new Date(Date.parse(comment.datetime)).toLocaleString()}
            </Typography>} avatar={
                <Tooltip title={comment.username}>
                    <Avatar sx={{bgcolor: getAvatarColour(comment.username)}} aria-label={"User " + comment.username}>
                        {comment.username.charAt(0).toUpperCase()}
                    </Avatar>
                </Tooltip>
            } action={
                <IconButton color={isLiked ? "primary" : ""} aria-label="like post" onClick={likeComment}>
                    <ThumbUpIcon className={modules.likeIcon}/>
                    {likes}
                </IconButton>
            }/>
        </Card>
    )
}

export default Comment;
