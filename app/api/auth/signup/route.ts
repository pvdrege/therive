import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, confirmPassword, bio, selectedTags } = body

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Tüm alanların doldurulması zorunludur' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Şifreler eşleşmiyor' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Şifre en az 8 karakter olmalıdır' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi ile zaten kayıtlı bir hesap bulunmaktadır' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user in database using raw query to avoid TypeScript issues
    const userId = crypto.randomUUID()
    const now = new Date()
    
    await prisma.$executeRaw`
      INSERT INTO users (id, name, email, password, bio, "intentTags", "isActive", "isPublic", "createdAt", "updatedAt")
      VALUES (${userId}, ${name.trim()}, ${email.toLowerCase().trim()}, ${hashedPassword}, ${bio?.trim() || null}, ${JSON.stringify(selectedTags || [])}, ${true}, ${true}, ${now}, ${now})
    `

    // Get the created user
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
        { error: 'Kullanıcı oluşturulurken hata oluştu' },
        { status: 500 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        name: user.name 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    return NextResponse.json(
      { 
        message: 'Hesabınız başarıyla oluşturuldu',
        user,
        token
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Hesap oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
} 