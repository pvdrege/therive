import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { createNotification } from '@/lib/notifications'

export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request)
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, bio, intentTags, isPublic, profileLink } = body

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Ad en az 2 karakter olmalıdır' },
        { status: 400 }
      )
    }

    if (bio && bio.length > 500) {
      return NextResponse.json(
        { error: 'Bio maksimum 500 karakter olmalıdır' },
        { status: 400 }
      )
    }

    if (profileLink) {
      // Check if profile link is unique
      const existingProfileLink = await prisma.user.findFirst({
        where: {
          profileLink: profileLink.trim(),
          id: { not: currentUser.userId }
        }
      })

      if (existingProfileLink) {
        return NextResponse.json(
          { error: 'Bu profil linki zaten kullanımda' },
          { status: 400 }
        )
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.userId },
      data: {
        name: name.trim(),
        bio: bio ? bio.trim() : null,
        intentTags: intentTags || [],
        isPublic: typeof isPublic === 'boolean' ? isPublic : true,
        profileLink: profileLink ? profileLink.trim() : null,
        updatedAt: new Date()
      },
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
        createdAt: true,
        updatedAt: true
      }
    })

    // Create notification
    await createNotification({
      userId: currentUser.userId,
      type: 'PROFILE_UPDATED',
      title: 'Profil Güncellendi',
      content: 'Profil bilgileriniz başarıyla güncellendi.'
    })

    return NextResponse.json({
      message: 'Profil başarıyla güncellendi',
      user: updatedUser
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Profil güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
} 