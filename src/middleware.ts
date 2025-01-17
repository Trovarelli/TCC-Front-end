import { verifyAuth } from '@/middleware/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const publicRoutes = ['/login', '/register', '/_next', '/img'];
  
  if (publicRoutes.some((route) => req.nextUrl.pathname.length === 1 || req.nextUrl.pathname.startsWith(route))) return NextResponse.next();

  try {
    const verifiedToken = token && (await verifyAuth(token));

    if (verifiedToken) return NextResponse.next();

    return NextResponse.redirect(new URL('/login', req.url));

  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: '/:path*',
};
