import { clearSession } from '@/lib/static-auth'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    await clearSession()
    return NextResponse.json(
      { success: true, message: 'Sesión cerrada correctamente' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Logout error:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
