import {NextResponse} from 'next/server'
import {decrypt} from '@/app/lib/session'
import {cookies} from 'next/headers'

const publicRoutes = ['/login', '/register', '/']

export default async function middleware(req) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = !publicRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
