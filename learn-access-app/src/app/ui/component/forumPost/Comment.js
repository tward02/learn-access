import modules from "./forumPost.module.css"
import {Box, Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {useState} from "react";
import {useLikeComment} from "@/app/ui/api/useLikeComment";
import {useUnlikeComment} from "@/app/ui/api/useUnlikeComment";

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
        p: 2,
        minWidth: "100%",
        marginBottom: "20px",
        border: "1px solid lightgray"
    }

    if (comment.userId === currentUser.id) {
        cardSx.backgroundColor = "lightYellow";
    }

    return (
        <Card sx={cardSx}>
            <CardHeader title={<Typography variant="subtitle2" fontWeight="bold">
                {comment.username}
            </Typography>} subheader={<Typography variant="caption" color="text.secondary">
                {comment.timestamp}
            </Typography>} action={
                <IconButton color={isLiked ? "primary" : ""} aria-label="like post" onClick={likeComment}>
                    <ThumbUpIcon className={modules.likeIcon}/>
                    {likes}
                </IconButton>
            }/>
            <CardContent>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <Typography variant="body1" sx={{flexGrow: 1}}>
                        {comment.content}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Comment;
