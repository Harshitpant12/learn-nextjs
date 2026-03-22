import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest){
    const path = request.nextUrl.pathname
    
    const isPublicPath = ['/login', '/signup'].includes(path) // or const isPublicPath = path === '/login' || path === '/signup'
    const token = request.cookies.get('token')?.value || ''

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/profile/:id',
        '/login',
        '/signup',
    ]
}