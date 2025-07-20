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

    // Get user's connections with last messages
    const connections = await prisma.connection.findMany({
      where: {
        OR: [
          { initiatorId: currentUser.userId },
          { receiverId: currentUser.userId }
        ],
        status: 'ACCEPTED'
      },
      include: {
        initiator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isActive: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isActive: true
          }
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            id: true,
            content: true,
            createdAt: true,
            senderId: true,
            isRead: true
          }
        }
      }
    })

    const conversations = connections.map(connection => {
      const otherUser = connection.initiatorId === currentUser.userId 
        ? connection.receiver 
        : connection.initiator
      
      const lastMessage = connection.messages[0] || null
      const unreadCount = connection.messages.filter(
        (msg: any) => msg.senderId !== currentUser.userId && !msg.isRead
      ).length

      return {
        id: connection.id,
        userId: otherUser.id,
        name: otherUser.name,
        email: otherUser.email,
        avatar: otherUser.avatar,
        isOnline: otherUser.isActive,
        lastMessage: lastMessage ? {
          content: lastMessage.content,
          createdAt: lastMessage.createdAt,
          isFromMe: lastMessage.senderId === currentUser.userId
        } : null,
        unreadCount,
        infoShared: connection.initiatorSharedInfo || connection.receiverSharedInfo
      }
    })

    return NextResponse.json({
      conversations: conversations.sort((a, b) => {
        const aTime = a.lastMessage?.createdAt || 0
        const bTime = b.lastMessage?.createdAt || 0
        return new Date(bTime).getTime() - new Date(aTime).getTime()
      })
    })

  } catch (error) {
    console.error('Get conversations error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 