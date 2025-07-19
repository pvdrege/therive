import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Mock database - In production, use Prisma
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, bio, selectedTags } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanımda' },
        { status: 400 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
      bio: bio || null,
      intentTags: selectedTags || [],
      avatar: null,
      isActive: true,
      isPublic: true,
      profileLink: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Save to mock database
    users.push(user)

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '30d' }
    )

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Hesap başarıyla oluşturuldu',
      user: userWithoutPassword,
      token
    }, { status: 201 })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 