import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
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
    const { currentPassword, newPassword, confirmPassword } = body

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: 'Tüm şifre alanları gereklidir' },
        { status: 400 }
      )
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'Yeni şifreler eşleşmiyor' },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Yeni şifre en az 8 karakter olmalıdır' },
        { status: 400 }
      )
    }

    // Get user with password using raw query to avoid TypeScript issues
    const user = await prisma.$queryRaw`
      SELECT id, password FROM users WHERE id = ${currentUser.userId}
    ` as Array<{ id: string, password: string }>

    if (!user || user.length === 0) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      )
    }

    const userData = user[0]

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userData.password)
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: 'Mevcut şifre yanlış' },
        { status: 400 }
      )
    }

    // Check if new password is different from current
    const isSamePassword = await bcrypt.compare(newPassword, userData.password)
    if (isSamePassword) {
      return NextResponse.json(
        { error: 'Yeni şifre mevcut şifre ile aynı olamaz' },
        { status: 400 }
      )
    }

    // Hash new password
    const saltRounds = 12
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    // Update password using raw query
    await prisma.$executeRaw`
      UPDATE users SET password = ${hashedNewPassword}, "updatedAt" = NOW() WHERE id = ${currentUser.userId}
    `

    // Create notification
    await createNotification({
      userId: currentUser.userId,
      type: 'PASSWORD_CHANGED',
      title: 'Şifre Değiştirildi',
      content: 'Hesap şifreniz başarıyla değiştirildi.'
    })

    return NextResponse.json({
      message: 'Şifre başarıyla güncellendi'
    })

  } catch (error) {
    console.error('Password change error:', error)
    return NextResponse.json(
      { error: 'Şifre güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
} 