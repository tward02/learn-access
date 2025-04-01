'use client'

import {signup} from '@/app/actions/auth'
import {useActionState, useState} from 'react'
import {Button, Card, Link, Stack} from "@mui/material";
import modules from "./register.module.css"
import Person2Icon from '@mui/icons-material/Person2';
import {ArrowBack} from "@mui/icons-material";
import {useRouter} from 'next/navigation'

//adapted from https://nextjs.org/docs/app/building-your-application/authentication
export default function Register() {

    const router = useRouter();

    const [state, action, pending] = useActionState(signup, undefined);

    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [rePasswordValue, setRePasswordValue] = useState("");

    const completed = usernameValue.length > 0 && passwordValue.length > 0 && rePasswordValue.length > 0;

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
                    <h1 className={modules.title}>Register</h1>
                    <Stack spacing={3}>
                        <div className={modules.inputGroup}>
                            <label htmlFor="name" className={modules.label}>Username</label>
                            <input data-testid="username" autoComplete={"off"} value={usernameValue}
                                   onChange={e => setUsernameValue(e.target.value)} id="name"
                                   name="name" className={modules.input}/>
                        </div>
                        {state?.errors?.name && <p role={"alert"} className={modules.error}>{state.errors.name}</p>}

                        <div className={modules.inputGroup}>
                            <label htmlFor="password" className={modules.label}>Password</label>
                            <input data-testid="password" autoComplete={"off"} value={passwordValue}
                                   onChange={e => setPasswordValue(e.target.value)} id="password"
                                   name="password" type="password" className={modules.input}/>
                        </div>
                        {state?.errors?.password && (
                            <div className={modules.errorList}>
                                <p role={"alert"}>Password must:</p>
                                <ul className={modules.errorItems}>
                                    {state.errors.password.map((error) => (
                                        <li key={error} className={modules.error}>- {error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className={modules.inputGroup}>
                            <label htmlFor="repassword" className={modules.label}>Re-Enter Password</label>
                            <input data-testid="repassword" autoComplete={"off"} value={rePasswordValue}
                                   onChange={e => setRePasswordValue(e.target.value)}
                                   id="repassword" name="repassword" type="password" className={modules.input}/>
                        </div>
                        {passwordValue !== rePasswordValue && (
                            <p role={"alert"} className={modules.error}>
                                Password does not match
                            </p>
                        )}
                        <Link href={"/login"} className={modules.link} onClick={() => router.push('/login')}>Already
                            have an account?
                            Go here to login</Link>
                        <button disabled={pending || passwordValue !== rePasswordValue || !completed} type="submit"
                                className={`${modules.button} ${
                                    pending || passwordValue !== rePasswordValue || !completed
                                        ? modules.buttonDisabled
                                        : ''
                                }`}>
                            Sign Up
                        </button>
                    </Stack>
                </form>
            </Card>
        </main>
    )
}
