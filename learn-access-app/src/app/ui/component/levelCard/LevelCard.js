'use client'
import {Avatar, Card, CardActionArea, CardContent, CardHeader, Typography} from "@mui/material";
import modules from "./levelCard.module.css"
import {useRouter} from "next/navigation";
import Countdown from "@/app/ui/component/countdown/Countdown";
import LockIcon from '@mui/icons-material/Lock';

const LevelCard = ({id, title, description, locked, expires}) => {

    const router = useRouter();

    const startLevel = () => {
        if (!locked) {
            router.push('/level/' + id);
        }
    }

    const lockedAvatar = () => {
        return locked ? (
            <Avatar>
                <LockIcon/>
            </Avatar>
        ) : null;
    }

    const getContent = () => {
        return (
            <>
                <CardHeader avatar={lockedAvatar()} title={title}/>
                <CardContent>
                    <Typography variant="body2">{description}</Typography>
                    {expires && (<Countdown targetDate={expires}/>)}
                </CardContent>
            </>
        )
    }

    const style = locked && {'background-color': '#666666'};

    return (
        <Card className={locked ? modules.levelCardLocked : modules.levelCard} key={id} sx={style}>
            {locked ? getContent() :
                (<CardActionArea onClick={startLevel}>
                    {getContent()}
                </CardActionArea>)}
        </Card>
    )
}

export default LevelCard;
