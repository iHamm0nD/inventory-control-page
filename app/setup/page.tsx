'use client'

import { createTestUser } from '@/app/actions/create-test-user'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const createUsers = async () => {
    setLoading(true)
    setMessage('Creando usuarios...')

    try {
      const result1 = await createTestUser(
        'prueba1@correo.com',
        'prueba123',
        'Usuario Prueba 1'
      )
      setMessage((prev) => prev + '\n' + result1.message)

      const result2 = await createTestUser(
        'prueba2@correo.com',
        'prueba123',
        'Usuario Prueba 2'
      )
      setMessage((prev) => prev + '\n' + result2.message)

      setMessage(
        (prev) =>
          prev +
          '\n\n✓ Usuarios creados. Puedes intentar login con:\n' +
          'Email: prueba1@correo.com\n' +
          'Contraseña: prueba123'
      )
    } catch (error) {
      setMessage('Error: ' + (error instanceof Error ? error.message : 'Unknown'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Configuración del Sistema
        </h1>

        <p className="text-muted-foreground mb-6">
          Haz clic en el botón para crear usuarios de prueba.
        </p>

        <Button
          onClick={createUsers}
          disabled={loading}
          className="w-full mb-4"
          size="lg"
        >
          {loading ? 'Creando...' : 'Crear Usuarios de Prueba'}
        </Button>

        {message && (
          <div className="bg-secondary/20 border border-secondary p-4 rounded text-sm text-foreground whitespace-pre-wrap">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
