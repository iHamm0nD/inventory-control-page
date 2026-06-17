import { DashboardNav } from '@/components/dashboard-nav'
import { getSession } from '@/lib/static-auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Dashboard - Control de Inventario',
  description: 'Sistema de control de inventario para centros de cómputo',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      {children}
    </div>
  )
}
