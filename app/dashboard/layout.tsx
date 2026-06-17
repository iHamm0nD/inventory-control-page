import { DashboardNav } from '@/components/dashboard-nav'

export const metadata = {
  title: 'Dashboard - Control de Inventario',
  description: 'Sistema de control de inventario para centros de cómputo',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      {children}
    </div>
  )
}
