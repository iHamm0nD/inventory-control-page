import { getSession } from '@/lib/static-auth'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'

export const metadata = {
  title: 'Iniciar Sesión - Control de Inventario',
  description: 'Inicia sesión en el sistema de control de inventario',
}

export default async function SignInPage() {
  const session = await getSession()
  if (session?.user) redirect('/')
  return <AuthForm />
}
