import {NextResponse} from 'next/server'
import {decrypt} from '@/app/lib/session'
import {cookies} from 'next/headers'

//all requests pass through before reaching the backend in order to authenticate them
export default async function middleware(req) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = isProtected(path);

    if (isProtectedRoute) {

        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)

        if (!session?.userId) {
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }
    }

    return NextResponse.next()
}

const isProtected = (path) => {
    return (path.startsWith('/level') || path.startsWith('/forum'));
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
