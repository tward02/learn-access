'use client'

import {useEffect, useState} from "react";
import modules from "./levelList.module.css";
import {CircularProgress, Grid2, Link, Stack} from "@mui/material";
import LevelCard from "@/app/ui/component/levelCard/LevelCard";
import {useFetchLevels} from "@/app/ui/api/useFetchLevels";

const LevelListDisplay = () => {

    const {
        levelsLoading,
        levelsError,
        levelsData,
        levelsSuccess,
        levelsRefetch,
        levelsRefetching,
        refetchError
    } = useFetchLevels();

    const [levels, setLevels] = useState([]);
    const [limitedLevels, setLimitedLevels] = useState([]);

    useEffect(() => {
        if (levelsData && levelsSuccess) {
            const nonLimited = [];
            const limited = [];
            levelsData.forEach((level) => {
                if (level.expires && (Date.parse(level.expires) - new Date()) > 0) {
                    limited.push(level);
                } else {
                    nonLimited.push(level);
                }
            })
            setLevels([...nonLimited]);
            setLimitedLevels([...limited]);
        }
    }, [levelsData, levelsSuccess]);

    const reloadLevels = () => {
        levelsRefetch();
    }

    return (
        <Stack className={modules.levelLists} direction={"row"} spacing={15}>
            {(levelsError || refetchError) ? (
                <p className={modules.errorText}>Failed to load levels. Please&nbsp;<Link className={modules.link}
                                                                                          onClick={reloadLevels}>try
                    again</Link></p>
            ) : (levelsLoading || levelsRefetching) ? (
                    <div className={modules.loading}>
                        <CircularProgress size="8rem"/>
                    </div>
                ) :
                <>
                    <div>
                        <h2 className={modules.listHeader}>{"Limited Time Levels"}</h2>
                        <div className={modules.listContainer}>
                            {limitedLevels > 0 ? limitedLevels.map(level => (
                                <LevelCard key={level.id} level={level}/>)) : (
                                <p className={modules.noLevelsText}>None available right now, check back again
                                    later</p>)}
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
                </>}
        </Stack>

    );
}

export default LevelListDisplay;
