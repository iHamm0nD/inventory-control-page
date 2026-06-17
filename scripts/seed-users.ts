import { auth } from '@/lib/auth'

async function seedUsers() {
  try {
    console.log('Creando usuarios de prueba...')

    // Usuario 1
    await auth.api.signUpEmail({
      email: 'prueba1@correo.com',
      password: 'prueba123',
      name: 'Usuario Prueba 1',
    })
    console.log('✓ Usuario 1 creado: prueba1@correo.com')

    // Usuario 2
    await auth.api.signUpEmail({
      email: 'prueba2@correo.com',
      password: 'prueba123',
      name: 'Usuario Prueba 2',
    })
    console.log('✓ Usuario 2 creado: prueba2@correo.com')

    console.log('\nCredenciales de acceso:')
    console.log('Email: prueba1@correo.com')
    console.log('Contraseña: prueba123')
    console.log('\nEmail: prueba2@correo.com')
    console.log('Contraseña: prueba123')
  } catch (error) {
    console.error('Error creando usuarios:', error)
  }
}

seedUsers()
