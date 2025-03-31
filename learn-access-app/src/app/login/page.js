'use client'

import {login} from '@/app/actions/auth'
import {useActionState, useState} from 'react'
import modules from "../register/register.module.css"
import {useRouter} from "next/navigation";
import {Button, Card, Link, Stack} from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import {ArrowBack} from "@mui/icons-material";

//adapted from https://nextjs.org/docs/app/building-your-application/authentication
export default function Login() {

    const router = useRouter();

    const [state, action, pending] = useActionState(login, undefined)

    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const completed = usernameValue.length > 0 && passwordValue.length > 0;

    return (
        <main className={modules.container}>
            <Card className={modules.card}>
                <form action={action} className={modules.form}>
                    <nav>
                        <Button className={modules.back} variant={"text"} startIcon={<ArrowBack/>}
                                onClick={() => router.push('/')}>
                            Back
                        </Button>
                    </nav>
                    <div className={modules.iconWrapper}>
                        <Person2Icon fontSize={"large"} className={modules.icon}/>
                    </div>
                    <h1 className={modules.title}>Login</h1>
                    <Stack spacing={3}>
                        <div className={modules.inputGroup}>
                            <label htmlFor="name" className={modules.label}>Username</label>
                            <input autoComplete={"on"} value={usernameValue}
                                   onChange={e => setUsernameValue(e.target.value)} id="name"
                                   name="name" className={modules.input}/>
                        </div>

                        <div className={modules.inputGroup}>
                            <label htmlFor="password" className={modules.label}>Password</label>
                            <input autoComplete={"off"} value={passwordValue}
                                   onChange={e => setPasswordValue(e.target.value)} id="password"
                                   name="password" type="password" className={modules.input}/>
                        </div>

                        {state?.errors?.login && <p role={"alert"} className={modules.error}>{state.errors.login}</p>}
                        <Link className={modules.link} onClick={() => router.push('/register')} href={"/register"}>
                            Don&apos;t have an account? Go here to register</Link>

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
        </main>
    )
}
