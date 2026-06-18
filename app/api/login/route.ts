import { validateCredentials, createSession } from '@/lib/static-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      )
    }

    const isValid = await validateCredentials(username, password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Usuario o contraseña incorrectos' },
        { status: 401 }
      )
    }

    await createSession()

    return NextResponse.json(
      { success: true, message: 'Sesión iniciada correctamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
