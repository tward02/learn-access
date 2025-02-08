import modules from "./forumPost.module.css"
import {Avatar, Card, CardActions, CardContent, CardHeader, Collapse, IconButton} from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ExpandMore} from "@mui/icons-material";
import {useState} from "react";

const ForumPost = ({currentUser, post}) => {

    const [expanded, setExpanded] = useState(false);

    //TODO like functionality
    //TODO time calculation for subheader
    //TODO Comments users and liking as well
    //TODO testing

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

    }

    return (
        <Card>
            <CardHeader title={post.title} subheader={post.timestamp} avatar={
                <Avatar sx={{bgcolor: getAvatarColour(post.username)}} aria-label={"User " + post.username}>
                    {post.username.charAt(0).toUpperCase()}
                </Avatar>
            } action={
                <IconButton onClick={likePost}>
                    <ThumbUpIcon/>
                    {"5"}
                </IconButton>
            }/>
            <CardContent>
                <div>
                    {/*code*/}
                </div>
                <div>
                    {/*post message*/}
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore expand={expanded}
                            onClick={() => setExpanded(!expanded)}
                            aria-expanded={expanded}
                            aria-label="show more">
                    {"Comments " + post?.comments?.length}
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/*comments*/}
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default ForumPost;
