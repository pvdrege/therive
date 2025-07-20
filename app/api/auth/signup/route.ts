import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, bio, selectedTags } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Ad, e-posta ve şifre gereklidir' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      )
    }

    // Password validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Şifre en az 8 karakter olmalıdır' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanımda' },
        { status: 400 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user in database
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        bio: bio?.trim() || null,
        intentTags: selectedTags || [],
        isActive: true,
        isPublic: true
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
        createdAt: true
      }
    })

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'default-secret-change-in-production',
      { expiresIn: '30d' }
    )

    return NextResponse.json({
      message: 'Hesap başarıyla oluşturuldu',
      user,
      token
    }, { status: 201 })

  } catch (error) {
    console.error('Signup error:', error)
    
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanımda' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu' },
      { status: 500 }
    )
  }
} 