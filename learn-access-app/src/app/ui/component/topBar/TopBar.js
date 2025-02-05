'use client'

import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useRouter} from "next/navigation";
import {logout} from "@/app/actions/auth";

const TopBar = ({loggedIn, title}) => {

    const router = useRouter();

    const login = () => {
        router.push("/login");
    }

    const logoutFn = async () => {
        await logout();
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>{title}</Typography>
                    {loggedIn ? <Button color={"inherit"} onClick={logoutFn}>Logout</Button> :
                        <Button color={"inherit"} onClick={login}>Login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TopBar;
