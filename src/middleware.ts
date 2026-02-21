import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isLoggedIn = request.cookies.get('isLoggedIn');
    const { pathname } = request.nextUrl;

    // Protect /admin routes
    if (pathname.startsWith('/admin')) {
        if (!isLoggedIn) {
            // Redirect to login if not logged in
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Prevent logged in users from visiting /login
    if (pathname === '/login') {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin/:path*', '/login'],
};
