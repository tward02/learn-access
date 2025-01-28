'use client'

import {login} from '@/app/actions/auth'
import {useActionState, useState} from 'react'
import modules from "../register/register.module.css"
import {useRouter} from "next/navigation";
import {Button, Card, Link, Stack} from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import {ArrowBack} from "@mui/icons-material";

export default function Login() {

    const router = useRouter();

    const [state, action, pending] = useActionState(login, undefined)

    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const completed = usernameValue.length > 0 && passwordValue.length > 0;

    return (
        <div className={modules.container}>
            <Card className={modules.card}>
                <form action={action} className={modules.form}>
                    <Button className={modules.back} variant={"text"} startIcon={<ArrowBack/>}
                            onClick={() => router.push('/')}>
                        Back
                    </Button>
                    <div className={modules.iconWrapper}>
                        <Person2Icon fontSize={"large"} className={modules.icon}/>
                    </div>

                    <Stack spacing={3}>
                        <div className={modules.inputGroup}>
                            <label htmlFor="name" className={modules.label}>Username</label>
                            <input value={usernameValue} onChange={e => setUsernameValue(e.target.value)} id="name"
                                   name="name" className={modules.input}/>
                        </div>

                        <div className={modules.inputGroup}>
                            <label htmlFor="password" className={modules.label}>Password</label>
                            <input value={passwordValue} onChange={e => setPasswordValue(e.target.value)} id="password"
                                   name="password" type="password" className={modules.input}/>
                        </div>

                        {state?.errors?.login && <p className={modules.error}>{state.errors.login}</p>}
                        <Link className={modules.link} onClick={() => router.push('/register')}>
                            Don't have an account? Click here to register</Link>

                        <button disabled={pending || !completed} type="submit"
                                className={`${modules.button} ${
                                    pending || !completed
                                        ? modules.buttonDisabled
                                        : ''
                                }`}>
                            Login
                        </button>
                    </Stack>
                </form>
            </Card>
        </div>
    )
}