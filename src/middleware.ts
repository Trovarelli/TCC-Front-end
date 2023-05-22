import { verifyAuth } from '@/middleware/auth'
import Cookies from 'js-cookie'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  const verifiedToken = token && (await verifyAuth(token).catch((err) => {
      Cookies.remove('token')
      return
  }))

  if(req.nextUrl.pathname.startsWith('/login') && !verifiedToken) {
    return 
  }

  if(req.url.includes('/login') && !!verifiedToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if(!verifiedToken) {
    if (req.nextUrl.pathname.startsWith('/api/admin')) {
        return new Response(JSON.stringify({error: {message: 'autenticação necessária'}}))
    }
    console.log(req.nextUrl)
    
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
    matcher: ['/admin/:path*', '/login', '/dashboard'],
}