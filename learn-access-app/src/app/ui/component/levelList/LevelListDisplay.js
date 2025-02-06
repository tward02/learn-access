'use client'

import {useEffect, useState} from "react";
import {levelsTestData} from "@/app/ui/testData";
import modules from "./levelList.module.css";
import {Grid2, Stack} from "@mui/material";
import LevelCard from "@/app/ui/component/levelCard/LevelCard";

const LevelListDisplay = () => {

    const levelsData = levelsTestData;

    const [levels, setLevels] = useState([]);
    const [limitedLevels, setLimitedLevels] = useState([]);

    useEffect(() => {
        if (levelsData) {
            const nonLimited = [];
            const limited = [];
            levelsData.forEach((level) => {
                level.expires ? limited.push(level) : nonLimited.push(level);
            })
            setLevels([...nonLimited]);
            setLimitedLevels([...limited]);
        }
    }, [levelsData]);

    return (
        <Stack className={modules.levelLists} direction={"row"} spacing={15}>
            <div>
                <h2 className={modules.listHeader}>{"Limited Time Levels"}</h2>
                <div className={modules.listContainer}>
                    {limitedLevels.map(level => (
                        <LevelCard key={level.id} level={level}/>))}
                </div>
            </div>
            <div>
                <h2 className={modules.listHeader}>{"Learn WCAG"}</h2>
                <Grid2 container spacing={1} className={modules.mainListContainer}>
                    {levels.map(level => (
                        <Grid2 item xs={12} sm={6} key={level.id}>
                            <LevelCard key={level.id} level={level}/>
                        </Grid2>
                    ))}
                </Grid2>
            </div>
        </Stack>
    );
}

export default LevelListDisplay;
