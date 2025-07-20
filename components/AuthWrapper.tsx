'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'

interface AuthWrapperProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export default function AuthWrapper({ 
  children, 
  requireAuth = false,
  redirectTo = '/auth/signin'
}: AuthWrapperProps) {
  const router = useRouter()
  const { user, token, isAuthenticated, setUser, setToken, setLoading } = useAppStore()

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        if (requireAuth) {
          router.push(redirectTo)
        }
        return
      }

      try {
        setLoading(true)
        
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          // Token is invalid or expired
          setUser(null)
          setToken(null)
          
          if (requireAuth) {
            router.push(redirectTo)
          }
          return
        }

        const data = await response.json()
        setUser(data.user)
        
      } catch (error) {
        console.error('Auth check error:', error)
        setUser(null)
        setToken(null)
        
        if (requireAuth) {
          router.push(redirectTo)
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [token, requireAuth, redirectTo, router, setUser, setToken, setLoading])

  // Show loading while checking authentication
  if (requireAuth && !isAuthenticated && token) {
    return (
      <div className="min-h-screen bg-therive-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-therive-accent"></div>
      </div>
    )
  }

  // If auth is required but user is not authenticated, don't render children
  if (requireAuth && !isAuthenticated) {
    return null
  }

  return <>{children}</>
} 