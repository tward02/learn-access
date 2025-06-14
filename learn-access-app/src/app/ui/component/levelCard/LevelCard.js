'use client'

import {Card, CardActionArea, CardContent, CardHeader, Link, Typography} from "@mui/material";
import modules from "./levelCard.module.css"
import {useRouter} from "next/navigation";
import Countdown from "@/app/ui/component/countdown/Countdown";
import LockIcon from '@mui/icons-material/Lock';
import DoneIcon from '@mui/icons-material/Done';

//displays and individual level and its status to the user
const LevelCard = ({level}) => {

    const router = useRouter();

    const startLevel = () => {
        if (!level.locked) {
            router.push('/level/' + level.id);
        }
    }

    const navigateToForum = (event) => {
        event.stopPropagation();
        router.push('/forum/' + level.id);
    }

    const getTitle = () => {
        return (
            <>
                {level.locked && <LockIcon data-testid={"locked"} fontSize={"large"}/>}
                {level.completed &&
                    <DoneIcon data-testid={"completed"} className={modules.doneIcon} fontSize={"large"}/>}
                {level.name}
            </>
        );
    }

    const getContent = () => {
        return (
            <div data-testid="level">
                <CardHeader title={getTitle()} subheader={level.completed &&
                    <Link onClick={navigateToForum} className={modules.link} href={"/forum/" + level.id}>View
                        Forum</Link>}/>
                <CardContent>
                    <Typography variant="body2">{level.description}</Typography>
                    {level.expiration && (<Countdown targetDate={level.expiration}/>)}
                </CardContent>
            </div>
        )
    }

    const style = level.locked ? {backgroundColor: '#666666'} : level.completed ? {backgroundColor: '#73f596'} : {};

    return (
        <Card className={level.locked ? modules.levelCardLocked : modules.levelCard} key={level.id} sx={style}>
            {level.locked ? getContent() :
                (<CardActionArea onClick={startLevel}>
                    {getContent()}
                </CardActionArea>)}
        </Card>
    )
}

export default LevelCard;
