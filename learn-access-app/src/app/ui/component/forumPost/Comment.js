import modules from "./forumPost.module.css"
import {Box, Card, IconButton, Typography} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {useState} from "react";

const Comment = ({comment, handleLike, currentUser}) => {

    const [likes, setLikes] = useState(comment.likes);
    const [isLiked, setIsLiked] = useState(comment.isLiked);

    const likeComment = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
        handleLike();
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
            <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                    {comment.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {comment.timestamp}
                </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <Typography variant="body1" sx={{flexGrow: 1}}>
                    {comment.content}
                </Typography>
                <IconButton color={isLiked ? "primary" : ""} aria-label="like post" onClick={likeComment}>
                    <ThumbUpIcon className={modules.likeIcon}/>
                    {likes}
                </IconButton>
            </Box>
        </Card>

    )
}


export default Comment;
