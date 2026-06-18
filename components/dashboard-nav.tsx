'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
    } catch (error) {
      console.error('[v0] Logout error:', error)
    }
    router.push('/sign-in')
    router.refresh()
  }

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/equipment', label: 'Equipos', icon: '🖥️' },
    { href: '/dashboard/maintenance', label: 'Mantenimiento', icon: '🔧' },
    { href: '/dashboard/reports', label: 'Reportes', icon: '📈' },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="text-2xl">📦</div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">Inventario</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? 'default' : 'ghost'}
                  className={`gap-2 ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground hover:bg-blue-600'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <Button
          onClick={handleLogout}
          variant="ghost"
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          Salir
        </Button>
      </div>
    </nav>
  )
}
