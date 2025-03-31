'use client'

import {AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import {logout} from "@/app/actions/auth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import modules from "./topBar.module.css";
import SaveIcon from "@mui/icons-material/Save";

//Displays at the top iof every page offering navigation and actions for users
const TopBar = ({loggedIn, title, username, back, onSave, save}) => {

    const router = useRouter();

    const login = () => {
        router.push("/login");
    }

    const logoutFn = async () => {
        await logout();
    }

    const backToHomepage = () => {
        router.push("/");
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    {back && (
                        <div className={modules.backButtonContainer}>
                            <Tooltip title={"Back to homepage"}>
                                <IconButton onClick={backToHomepage} className={modules.backButton}>
                                    <ArrowBackIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    )}
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>{title}</Typography>
                    {onSave && <Button className={modules.saveButton} variant={"contained"} color={"warning"}
                                       startIcon={<SaveIcon/>} onClick={onSave} loadingPosition={"end"} loading={save}>Save</Button>}
                    {loggedIn ? <Button color={"inherit"} onClick={logoutFn}>{username + " Logout"}</Button> :
                        <Button color={"inherit"} onClick={login}>Login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar;
