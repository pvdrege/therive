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

    // Get user's notifications
    const notifications = await prisma.notification.findMany({
      where: { userId: currentUser.userId },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit to last 50 notifications
    })

    // Count unread notifications
    const unreadCount = await prisma.notification.count({
      where: { 
        userId: currentUser.userId,
        isRead: false 
      }
    })

    return NextResponse.json({
      notifications,
      unreadCount
    })

  } catch (error) {
    console.error('Get notifications error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

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
    const { action, notificationIds } = body

    if (action === 'mark_read') {
      // Mark specific notifications as read
      const ids = notificationIds || []
      
      if (ids.length > 0) {
        await prisma.notification.updateMany({
          where: {
            id: { in: ids },
            userId: currentUser.userId
          },
          data: { isRead: true }
        })
      }
    } else if (action === 'mark_all_read') {
      // Mark all user's notifications as read
      await prisma.notification.updateMany({
        where: { 
          userId: currentUser.userId,
          isRead: false
        },
        data: { isRead: true }
      })
    }

    return NextResponse.json({
      message: 'Bildirimler güncellendi'
    })

  } catch (error) {
    console.error('Update notifications error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 