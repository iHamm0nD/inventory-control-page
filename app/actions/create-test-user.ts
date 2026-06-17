'use server'

import { db } from '@/lib/db'
import { user, account } from '@/lib/db/schema'
import { v4 as uuid } from 'uuid'
import crypto from 'crypto'

export async function createTestUser(
  email: string,
  password: string,
  name: string
) {
  try {
    const userId = uuid()
    const accountId = uuid()

    // Generar un hash de contraseña simple para pruebas
    const passwordHash = crypto
      .createHash('sha256')
      .update(password + 'salt')
      .digest('hex')

    // Crear usuario
    await db.insert(user).values({
      id: userId,
      email,
      name,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Crear cuenta de credencial
    await db.insert(account).values({
      id: accountId,
      userId,
      type: 'email',
      provider: 'credential',
      providerAccountId: email,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return {
      success: true,
      message: `Usuario ${email} creado exitosamente`,
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return {
      success: false,
      message: 'Error al crear el usuario',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
