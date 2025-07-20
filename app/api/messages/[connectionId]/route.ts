import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { connectionId: string } }
) {
  try {
    const currentUser = await getCurrentUser(request)
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const { connectionId } = params

    // Verify user has access to this connection
    const connection = await prisma.connection.findFirst({
      where: {
        id: connectionId,
        OR: [
          { initiatorId: currentUser.userId },
          { receiverId: currentUser.userId }
        ],
        status: 'ACCEPTED'
      },
      include: {
        initiator: {
          select: { id: true, name: true, avatar: true }
        },
        receiver: {
          select: { id: true, name: true, avatar: true }
        }
      }
    })

    if (!connection) {
      return NextResponse.json(
        { error: 'Bağlantı bulunamadı' },
        { status: 404 }
      )
    }

    // Get messages for this connection
    const messages = await prisma.message.findMany({
      where: { connectionId },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        connectionId,
        senderId: { not: currentUser.userId },
        isRead: false
      },
      data: { isRead: true }
    })

    return NextResponse.json({
      connection,
      messages
    })

  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { connectionId: string } }
) {
  try {
    const currentUser = await getCurrentUser(request)
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const { connectionId } = params
    const body = await request.json()
    const { content } = body

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Mesaj içeriği gereklidir' },
        { status: 400 }
      )
    }

    // Verify connection exists and user has access
    const connection = await prisma.connection.findFirst({
      where: {
        id: connectionId,
        OR: [
          { initiatorId: currentUser.userId },
          { receiverId: currentUser.userId }
        ],
        status: 'ACCEPTED'
      }
    })

    if (!connection) {
      return NextResponse.json(
        { error: 'Bağlantı bulunamadı' },
        { status: 404 }
      )
    }

    // Determine receiver
    const receiverId = connection.initiatorId === currentUser.userId 
      ? connection.receiverId 
      : connection.initiatorId

    // Create message
    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        senderId: currentUser.userId,
        receiverId,
        connectionId,
        isRead: false
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json({
      message
    }, { status: 201 })

  } catch (error) {
    console.error('Send message error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 