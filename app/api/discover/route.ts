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

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    // Get users who are not the current user and are active
    let whereCondition: any = {
      id: { not: currentUser.userId },
      isActive: true,
      isPublic: true
    }

    // Add text search filter
    if (query) {
      whereCondition.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { bio: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } }
      ]
    }

    // Add intent tags filter
    if (tags.length > 0) {
      whereCondition.intentTags = {
        hasSome: tags
      }
    }

    // Get users
    const users = await prisma.user.findMany({
      where: whereCondition,
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
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    })

    // Get connection status for each user
    const userIds = users.map(user => user.id)
    const connections = await prisma.connection.findMany({
      where: {
        OR: [
          { initiatorId: currentUser.userId, receiverId: { in: userIds } },
          { receiverId: currentUser.userId, initiatorId: { in: userIds } }
        ]
      },
      select: {
        initiatorId: true,
        receiverId: true,
        status: true
      }
    })

    // Map connection status
    const usersWithConnectionStatus = users.map(user => {
      const connection = connections.find(conn => 
        (conn.initiatorId === currentUser.userId && conn.receiverId === user.id) ||
        (conn.receiverId === currentUser.userId && conn.initiatorId === user.id)
      )

      let connectionStatus = 'none'
      if (connection) {
        if (connection.status === 'ACCEPTED') {
          connectionStatus = 'connected'
        } else if (connection.status === 'PENDING') {
          if (connection.initiatorId === currentUser.userId) {
            connectionStatus = 'pending_sent'
          } else {
            connectionStatus = 'pending_received'
          }
        }
      }

      return {
        ...user,
        connectionStatus
      }
    })

    // Get total count for pagination
    const totalCount = await prisma.user.count({
      where: whereCondition
    })

    return NextResponse.json({
      users: usersWithConnectionStatus,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: skip + limit < totalCount,
        hasPrev: page > 1
      }
    })

  } catch (error) {
    console.error('Discover users error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 