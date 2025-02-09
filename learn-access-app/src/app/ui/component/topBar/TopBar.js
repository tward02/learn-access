'use client'

import {AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import {logout} from "@/app/actions/auth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import modules from "./topBar.module.css";

const TopBar = ({loggedIn, title, username, back}) => {

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
                        <div className={modules.backButton}>
                            <Tooltip title={"Back to homepage"}>
                                <IconButton>
                                    <ArrowBackIcon onClick={backToHomepage}/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    )}
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>{title}</Typography>
                    {loggedIn ? <Button color={"inherit"} onClick={logoutFn}>{username + " Logout"}</Button> :
                        <Button color={"inherit"} onClick={login}>Login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar;
