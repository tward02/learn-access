'use client'

import {useEffect, useState} from "react";
import {levelsTestData} from "@/app/ui/testData";
import modules from "./levelList.module.css";
import LevelList from "@/app/ui/component/levelList/LevelList";
import {Stack} from "@mui/material";

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
            <LevelList levels={limitedLevels} title={"Limited Time Levels"}/>
            <LevelList levels={levels} title={"Learn WCAG"}/>
        </Stack>

    );

}

export default LevelListDisplay;
