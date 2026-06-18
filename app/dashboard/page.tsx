import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getInventorySummary } from '@/app/actions/equipment'

export const metadata = {
  title: 'Dashboard - Control de Inventario',
  description: 'Dashboard de control de inventario de equipos',
}

export default async function DashboardPage() {
  const summary = await getInventorySummary()

  const stats = [
    {
      label: 'Equipos Activos',
      value: summary.active,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      label: 'Equipos Inactivos',
      value: summary.inactive,
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/30',
    },
    {
      label: 'En Mantenimiento',
      value: summary.maintenance,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
    {
      label: 'Retirados',
      value: summary.retired,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Control de Inventario</h1>
            <p className="text-muted-foreground mt-1">Gestión de equipos y componentes del centro de cómputo</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/equipment">
              <Button className="bg-primary hover:bg-blue-600 text-primary-foreground">
                Ver Equipos
              </Button>
            </Link>
            <Link href="/dashboard/equipment/new">
              <Button className="bg-accent hover:bg-cyan-500 text-accent-foreground">
                Nuevo Equipo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`p-6 rounded-lg border ${stat.borderColor} ${stat.bgColor}`}
            >
              <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {stat.label.toLowerCase()} en total
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/equipment">
              <div className="p-6 rounded-lg border border-border hover:border-primary bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-semibold text-foreground mb-1">Equipos</h3>
                <p className="text-sm text-muted-foreground">Gestiona todos los equipos del laboratorio</p>
              </div>
            </Link>
            <Link href="/dashboard/maintenance">
              <div className="p-6 rounded-lg border border-border hover:border-primary bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer">
                <div className="text-2xl mb-3">🔧</div>
                <h3 className="font-semibold text-foreground mb-1">Mantenimiento</h3>
                <p className="text-sm text-muted-foreground">Registra mantenimientos y cambios de hardware</p>
              </div>
            </Link>
            <Link href="/dashboard/reports">
              <div className="p-6 rounded-lg border border-border hover:border-primary bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer">
                <div className="text-2xl mb-3">📈</div>
                <h3 className="font-semibold text-foreground mb-1">Reportes</h3>
                <p className="text-sm text-muted-foreground">Analiza costos, upgrades y historial</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Características</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">✓</div>
              <div>
                <h3 className="font-semibold text-foreground">Gestión Completa</h3>
                <p className="text-sm text-muted-foreground">
                  Registra equipos, componentes y su historial de cambios
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">✓</div>
              <div>
                <h3 className="font-semibold text-foreground">Mantenimiento Detallado</h3>
                <p className="text-sm text-muted-foreground">
                  Registra mantenimientos preventivos y correctivos
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">✓</div>
              <div>
                <h3 className="font-semibold text-foreground">Tracking de Hardware</h3>
                <p className="text-sm text-muted-foreground">
                  Registra cambios de componentes y repotenciaciones
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl flex-shrink-0">✓</div>
              <div>
                <h3 className="font-semibold text-foreground">Reportes Analíticos</h3>
                <p className="text-sm text-muted-foreground">
                  Análisis de costos, upgrades y ciclo de vida
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
