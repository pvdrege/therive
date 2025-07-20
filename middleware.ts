import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/messages',
  '/notifications',
  '/settings'
]

// Public routes that redirect to dashboard if user is already authenticated
const authRoutes = [
  '/auth/signin',
  '/auth/signup'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get token from cookies or local storage (we'll use a custom header for client-side)
  const authHeader = request.headers.get('authorization')
  const hasToken = authHeader?.startsWith('Bearer ')
  
  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // Check if current route is auth route
  const isAuthRoute = authRoutes.includes(pathname)
  
  // If trying to access protected route without token, redirect to signin
  if (isProtectedRoute && !hasToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  
  // If trying to access auth routes with token, redirect to dashboard
  if (isAuthRoute && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 