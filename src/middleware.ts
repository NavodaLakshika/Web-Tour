import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
    const { pathname } = request.nextUrl;

    // 1. Protect /admin routes
    if (pathname.startsWith('/admin')) {
        if (!isLoggedIn) {
            console.log("🔒 Middleware: Unauthorized access to /admin, redirecting...");
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // 2. Prevent logged-in users from visiting /login again
    if (pathname.startsWith('/login')) {
        if (isLoggedIn) {
            console.log("🔓 Middleware: User already logged in, bypassing /login...");
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

// Match /admin exactly OR any sub-path of /admin, and /login
export const config = {
    matcher: ['/admin', '/admin/:path*', '/login'],
};
