import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-posta ve şifre gereklidir' },
        { status: 400 }
      )
    }

    // Find user in database with password using raw query to avoid TypeScript issues
    const userResult = await prisma.$queryRaw`
      SELECT id, email, name, password, bio, avatar, "createdAt", "updatedAt", "intentTags", "isActive", "isPublic", "profileLink" 
      FROM users WHERE email = ${email.toLowerCase().trim()}
    ` as Array<{
      id: string;
      email: string;
      name: string;
      password: string;
      bio: string | null;
      avatar: string | null;
      createdAt: Date;
      updatedAt: Date;
      intentTags: string[];
      isActive: boolean;
      isPublic: boolean;
      profileLink: string | null;
    }>

    if (!userResult || userResult.length === 0) {
      return NextResponse.json(
        { error: 'Geçersiz e-posta veya şifre' },
        { status: 401 }
      )
    }

    const user = userResult[0]

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Geçersiz e-posta veya şifre' },
        { status: 401 }
      )
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Hesabınız devre dışı bırakılmış' },
        { status: 403 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'default-secret-change-in-production',
      { expiresIn: '30d' }
    )

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Giriş başarılı',
      user: userWithoutPassword,
      token
    }, { status: 200 })

  } catch (error) {
    console.error('Signin error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu' },
      { status: 500 }
    )
  }
} 