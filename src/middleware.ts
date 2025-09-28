
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.JWT_SECRET });
  const { pathname } = request.nextUrl;

  const isLoggedIn = !!token;
  const isOnAdmin = pathname.startsWith('/admin');

  if (isOnAdmin) {
    if (isLoggedIn) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url)); // Redirect unauthenticated users to login page
  } else if (isLoggedIn) {
    if (pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/admin/movies', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
