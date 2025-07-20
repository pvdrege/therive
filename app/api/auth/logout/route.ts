import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Since we're using JWT tokens without server-side sessions,
    // logout is mainly handled on the client-side by removing the token
    // But we can still provide an endpoint for consistency
    
    return NextResponse.json({
      message: 'Başarıyla çıkış yapıldı'
    }, { status: 200 })
    
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 