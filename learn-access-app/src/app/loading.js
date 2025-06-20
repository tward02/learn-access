import TopBar from "@/app/ui/component/topBar/TopBar";
import {CircularProgress} from "@mui/material";
import modules from "./loading.module.css";

//displays when page is loading from the backend
const Loading = () => {

    return (
        <main className={modules.container}>
            <TopBar/>
            <div className={modules.progress}>
                <CircularProgress size={"7rem"}/>
            </div>
        </main>
    );

}

export default Loading;
