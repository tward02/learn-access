'use client'

import {Link} from "@mui/material";
import modules from "./noSession.module.css"
import {useRouter} from "next/navigation";

const NoSession = () => {

    const router = useRouter();

    const login = () => {
        router.push("/login");
    }

    const register = () => {
        router.push("/register");
    }

    return (
        <div>
            <p className={modules.session}>To start learning WCAG or continue where you left off, please&nbsp;<Link
                className={modules.link} onClick={login}>Login</Link>&nbsp;or&nbsp; <Link className={modules.link}
                                                                                          onClick={register}>Register</Link>
            </p>
        </div>
    )
}

export default NoSession;
