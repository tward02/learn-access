import 'server-only'
import {cookies} from 'next/headers'
import {decrypt} from '@/app/lib/session'
import {cache} from "react";
import {redirect} from "next/navigation";
import {getUserById} from "@/app/lib/DAO/userDAO";

//adapted from https://nextjs.org/docs/app/building-your-application/authentication
//verifies that a session cookie a user provides is correct
export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (!session.userId) {
        redirect('/login')
    }

    return {isAuth: true, userId: session.userId}
})

//verifies that a user currently has a session
export const hasSession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    return !!session?.userId;
})

//gets a user object from their current session
export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        return await getUserById(session.userId);
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})
