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
  
  // Get token from cookies (Zustand persist stores in localStorage, but we need a different approach)
  // For now, we'll skip middleware token check for client-side navigation
  // and let AuthWrapper handle it
  const cookieToken = request.cookies.get('therive-token')?.value
  
  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // Check if current route is auth route  
  const isAuthRoute = authRoutes.includes(pathname)
  
  // Skip middleware checks for now - let AuthWrapper handle auth
  // This allows proper client-side navigation
  console.log('Middleware bypassed for client navigation:', pathname)
  
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