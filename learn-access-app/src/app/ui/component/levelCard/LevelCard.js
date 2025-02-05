'use client'

import {Card, CardActionArea, CardContent, CardHeader, Typography} from "@mui/material";
import modules from "./levelCard.module.css"
import {useRouter} from "next/navigation";
import Countdown from "@/app/ui/component/countdown/Countdown";
import LockIcon from '@mui/icons-material/Lock';
import DoneIcon from '@mui/icons-material/Done';

const LevelCard = ({id, title, description, locked, expires, completed}) => {

    const router = useRouter();

    const startLevel = () => {
        if (!locked) {
            router.push('/level/' + id);
        }
    }

    const getTitle = () => {
        return (
            <>
                {locked && <LockIcon fontSize={"large"}/>}
                {completed && <DoneIcon className={modules.doneIcon} fontSize={"large"}/>}
                {title}
            </>
        );
    }

    const getContent = () => {
        return (
            <>
                <CardHeader title={getTitle()}></CardHeader>
                <CardContent>
                    <Typography variant="body2">{description}</Typography>
                    {expires && (<Countdown targetDate={expires}/>)}
                </CardContent>
            </>
        )
    }

    const style = locked ? {backgroundColor: '#666666'} : completed ? {backgroundColor: '#73f596'} : {};

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
