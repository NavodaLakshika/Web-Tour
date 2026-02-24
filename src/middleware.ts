import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // 1. If trying to access /admin but not logged in, redirect to /login
        if (request.nextUrl.pathname.startsWith('/admin') && !user) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }

        // 2. If trying to access /login but already logged in, redirect to /admin
        if (request.nextUrl.pathname === '/login' && user) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin';
            return NextResponse.redirect(url);
        }
    } catch (e) {
        console.error("Middleware Auth Error:", e);
        // If there's a fetch error, we might still want to proceed if not on /admin,
        // or redirect to login if we are on /admin and can't verify.
        if (request.nextUrl.pathname.startsWith('/admin')) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    return response;
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};
