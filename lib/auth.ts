import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

interface JWTPayload {
  userId: string
  email: string
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default-secret-change-in-production'
    ) as JWTPayload
    
    return decoded
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  
  return null
}

export async function getCurrentUser(request: NextRequest) {
  const token = getTokenFromRequest(request)
  
  if (!token) {
    return null
  }
  
  const payload = verifyToken(token)
  
  if (!payload) {
    return null
  }
  
  return payload
} 