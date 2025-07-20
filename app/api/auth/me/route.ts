import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request)
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        intentTags: true,
        isActive: true,
        isPublic: true,
        profileLink: true,
        createdAt: true
      }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      )
    }
    
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Hesap devre dışı' },
        { status: 403 }
      )
    }
    
    return NextResponse.json({
      user
    })
    
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 