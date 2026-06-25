'use client'

import { useState, useEffect } from 'react'
import { getSubscriptionsList, getSubscriptionsStats, createSubscription, deleteSubscription, updateSubscription } from '@/app/actions/subscriptions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { } from '@/components/ui/select'
import { Trash2, Edit2, Calendar } from 'lucide-react'

interface Subscription {
  id: string
  name: string
  provider?: string
  type: string
  cost: number
  billingFrequency: string
  startDate: Date | string
  renewalDate: Date | string
  status: string
  autoRenewal: boolean
  licenseCount?: number
  licenseUsed?: number
}

interface Stats {
  total: number
  active: number
  totalCost: number
  expiringSoon: number
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showDialog, setShowDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    type: 'software',
    cost: '',
    billingFrequency: 'anual',
    startDate: new Date().toISOString().split('T')[0],
    renewalDate: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const [subsData, statsData] = await Promise.all([
        getSubscriptionsList(),
        getSubscriptionsStats(),
      ])
      setSubscriptions(subsData as Subscription[])
      setStats(statsData as Stats)
    } catch (error) {
      console.error('Error loading subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSubscription = async () => {
    if (!formData.name || !formData.cost || !formData.renewalDate) {
      alert('Por favor completa los campos requeridos')
      return
    }

    try {
      const newSub = await createSubscription({
        name: formData.name,
        provider: formData.provider,
        type: formData.type,
        cost: Number(formData.cost),
        billingFrequency: formData.billingFrequency,
        startDate: new Date(formData.startDate),
        renewalDate: new Date(formData.renewalDate),
      })

      setSubscriptions([...subscriptions, newSub])
      setShowDialog(false)
      setFormData({
        name: '',
        provider: '',
        type: 'software',
        cost: '',
        billingFrequency: 'anual',
        startDate: new Date().toISOString().split('T')[0],
        renewalDate: '',
      })
      loadData()
    } catch (error) {
      console.error('Error adding subscription:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Deseas eliminar esta suscripción?')) return

    try {
      await deleteSubscription(id)
      setSubscriptions(subscriptions.filter(s => s.id !== id))
    } catch (error) {
      console.error('Error deleting subscription:', error)
    }
  }

  const filteredSubscriptions = subscriptions.filter(s => {
    if (filter === 'all') return true
    return s.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activa':
        return 'bg-green-100 text-green-800'
      case 'inactiva':
        return 'bg-gray-100 text-gray-800'
      case 'vencida':
        return 'bg-red-100 text-red-800'
      case 'cancelada':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getDaysUntilRenewal = (renewalDate: Date | string) => {
    const date = new Date(renewalDate)
    const today = new Date()
    const daysLeft = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysLeft
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Suscripciones</h1>
              <p className="text-muted-foreground mt-1">
                Administra todas tus suscripciones activas e inactivas
              </p>
            </div>
            <Button
              onClick={() => setShowDialog(true)}
              className="bg-accent hover:bg-cyan-500 text-accent-foreground"
            >
              Agregar Suscripción
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stats.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Activas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Vencen en 30 días</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-600">{stats.expiringSoon}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Costo Anual</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">S/ {stats.totalCost.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {['all', 'activa', 'inactiva', 'vencida', 'cancelada'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {status === 'all' ? 'Todas' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Subscriptions Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando suscripciones...</p>
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Nombre</th>
                      <th className="text-left py-3 px-4 font-medium">Proveedor</th>
                      <th className="text-left py-3 px-4 font-medium">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium">Costo</th>
                      <th className="text-left py-3 px-4 font-medium">Renovación</th>
                      <th className="text-left py-3 px-4 font-medium">Frecuencia</th>
                      <th className="text-left py-3 px-4 font-medium">Estado</th>
                      <th className="text-left py-3 px-4 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscriptions.map((sub) => (
                      <tr key={sub.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-medium">{sub.name}</td>
                        <td className="py-3 px-4">{sub.provider || '-'}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {sub.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">S/ {sub.cost.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(sub.renewalDate).toLocaleDateString('es-PE')}
                            {getDaysUntilRenewal(sub.renewalDate) <= 30 && getDaysUntilRenewal(sub.renewalDate) > 0 && (
                              <span className="text-orange-600 text-xs font-bold">
                                ({getDaysUntilRenewal(sub.renewalDate)}d)
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">{sub.billingFrequency}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(sub.status)}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDelete(sub.id)}
                            className="p-1 hover:bg-muted rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Add Subscription Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar Suscripción</DialogTitle>
            <DialogDescription>
              Registra una nueva suscripción o servicio
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Nombre de la Suscripción</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Microsoft 365 Business"
              />
            </div>

            <div>
              <Label>Proveedor</Label>
              <Input
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                placeholder="Ej: Microsoft"
              />
            </div>

            <div>
              <Label>Tipo</Label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="software">Software</option>
                <option value="servicio">Servicio</option>
                <option value="soporte">Soporte</option>
                <option value="nube">Nube</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Costo Anual (S/)</Label>
                <Input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label>Frecuencia</Label>
                <select
                  value={formData.billingFrequency}
                  onChange={(e) => setFormData({ ...formData, billingFrequency: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="anual">Anual</option>
                  <option value="mensual">Mensual</option>
                  <option value="trimestral">Trimestral</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Fecha de Inicio</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            <div>
              <Label>Fecha de Renovación</Label>
              <Input
                type="date"
                value={formData.renewalDate}
                onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddSubscription} className="flex-1 bg-accent text-accent-foreground">
                Agregar
              </Button>
              <Button onClick={() => setShowDialog(false)} variant="outline" className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
