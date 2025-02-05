import modules from "./test.module.css"
import TopBar from "@/app/ui/component/topBar/TopBar";
import {hasSession} from "@/app/lib/dal";
import LevelList from "@/app/ui/component/levelList/LevelList";
import {Stack} from "@mui/material";

const HomePage = async () => {

    const session = await hasSession();

    return (
        <div className={modules.container}>
            <TopBar title={"Learn Access"} loggedIn={session}/>
            <main className={modules.content}>
                <h1 className={modules.heading}>Learn Access</h1>
                <Stack className={modules.levelLists} direction={"row"} spacing={15}>
                    <LevelList/>
                    <LevelList/>
                </Stack>

            </main>
        </div>
    )
}

export default HomePage;
