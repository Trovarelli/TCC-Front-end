import { verifyAuth } from '@/middleware/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const publicRoutes = ['/login', '/register', '/_next', '/img'];
  
  if (publicRoutes.some((route) => req.nextUrl.pathname.length === 1 || req.nextUrl.pathname.startsWith(route))) {
    console.log('ENTROU NO IF', req.nextUrl.pathname.length)
    return NextResponse.next();
  }

  try {
    const verifiedToken = token && (await verifyAuth(token));

    if (verifiedToken) return NextResponse.next();

  } catch (error) {
    console.error('Erro ao verificar token:', error);
  } finally {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: '/:path*',
};
