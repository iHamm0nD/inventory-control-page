'use client'

import { useState, useEffect } from 'react'
import { getOutputPeripheralsList, getPeripheralsStats, createOutputPeripheral, deleteOutputPeripheral } from '@/app/actions/peripherals'
import { getEquipmentList } from '@/app/actions/equipment'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { } from '@/components/ui/select'
import { Trash2, Monitor, Printer, Volume2, Projector } from 'lucide-react'

interface Peripheral {
  id: string
  equipmentId?: string
  name: string
  type: string
  model?: string
  serialNumber?: string
  vendor?: string
  resolution?: string
  specs?: string
  status: string
  location?: string
  purchaseDate?: Date | string
  purchasePrice?: number
}

interface Equipment {
  id: string
  name: string
}

interface PeripheralsStats {
  total: number
  active: number
  byType: Record<string, number>
}

const PERIPHERAL_TYPES = [
  { value: 'monitor', label: 'Monitor', icon: Monitor },
  { value: 'impresora', label: 'Impresora', icon: Printer },
  { value: 'parlantes', label: 'Parlantes', icon: Volume2 },
  { value: 'proyector', label: 'Proyector', icon: Projector },
  { value: 'ploter', label: 'Ploter', icon: Monitor },
  { value: 'otro', label: 'Otro', icon: Monitor },
]

export default function PeripheralsPage() {
  const [peripherals, setPeripherals] = useState<Peripheral[]>([])
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [stats, setStats] = useState<PeripheralsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showDialog, setShowDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'monitor',
    model: '',
    serialNumber: '',
    vendor: '',
    resolution: '',
    specs: '',
    location: '',
    purchasePrice: '',
    equipmentId: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const [periphData, equipsData, statsData] = await Promise.all([
        getOutputPeripheralsList(),
        getEquipmentList(),
        getPeripheralsStats(),
      ])
      setPeripherals(periphData as Peripheral[])
      setEquipment(equipsData as Equipment[])
      setStats(statsData as PeripheralsStats)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPeripheral = async () => {
    if (!formData.name || !formData.type) {
      alert('Por favor completa los campos requeridos')
      return
    }

    try {
      const newPeripheral = await createOutputPeripheral({
        equipmentId: formData.equipmentId || undefined,
        name: formData.name,
        type: formData.type,
        model: formData.model,
        serialNumber: formData.serialNumber,
        vendor: formData.vendor,
        resolution: formData.resolution,
        specs: formData.specs,
        location: formData.location,
        purchasePrice: formData.purchasePrice ? Number(formData.purchasePrice) : undefined,
      })

      setPeripherals([...peripherals, newPeripheral])
      setShowDialog(false)
      setFormData({
        name: '',
        type: 'monitor',
        model: '',
        serialNumber: '',
        vendor: '',
        resolution: '',
        specs: '',
        location: '',
        purchasePrice: '',
        equipmentId: '',
      })
      loadData()
    } catch (error) {
      console.error('Error adding peripheral:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Deseas eliminar este periférico?')) return

    try {
      await deleteOutputPeripheral(id)
      setPeripherals(peripherals.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting peripheral:', error)
    }
  }

  const filteredPeripherals = peripherals.filter(p => {
    const statusMatch = filter === 'all' || p.status === filter
    const typeMatch = typeFilter === 'all' || p.type === typeFilter
    return statusMatch && typeMatch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Periféricos de Salida</h1>
              <p className="text-muted-foreground mt-1">
                Administra monitores, impresoras, proyectores y otros dispositivos
              </p>
            </div>
            <Button
              onClick={() => setShowDialog(true)}
              className="bg-accent hover:bg-cyan-500 text-accent-foreground"
            >
              Agregar Periférico
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
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
                <CardTitle className="text-sm font-medium text-muted-foreground">Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </CardContent>
            </Card>
            {Object.entries(stats.byType).map(([type, count]) => (
              <Card key={type}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground capitalize">
                    {type}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="space-y-4 mb-8">
          <div>
            <Label className="text-sm font-medium mb-2 block">Estado</Label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'activo', 'inactivo', 'dañado', 'retirado'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    filter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {status === 'all' ? 'Todos' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Tipo</Label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'monitor', 'impresora', 'parlantes', 'proyector', 'ploter', 'otro'].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    typeFilter === type
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {type === 'all' ? 'Todos' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Peripherals Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando periféricos...</p>
          </div>
        ) : (
          <div>
            {filteredPeripherals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPeripherals.map((peripheral) => (
                  <Card key={peripheral.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{peripheral.name}</CardTitle>
                          <CardDescription className="capitalize">{peripheral.type}</CardDescription>
                        </div>
                        <button
                          onClick={() => handleDelete(peripheral.id)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {peripheral.model && (
                        <div>
                          <p className="text-sm text-muted-foreground">Modelo</p>
                          <p className="font-medium">{peripheral.model}</p>
                        </div>
                      )}
                      {peripheral.vendor && (
                        <div>
                          <p className="text-sm text-muted-foreground">Vendedor</p>
                          <p className="font-medium">{peripheral.vendor}</p>
                        </div>
                      )}
                      {peripheral.resolution && (
                        <div>
                          <p className="text-sm text-muted-foreground">Resolución</p>
                          <p className="font-medium">{peripheral.resolution}</p>
                        </div>
                      )}
                      {peripheral.location && (
                        <div>
                          <p className="text-sm text-muted-foreground">Ubicación</p>
                          <p className="font-medium">{peripheral.location}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">Estado</p>
                        <span className={`px-2 py-1 rounded text-xs font-medium inline-block ${
                          peripheral.status === 'activo' ? 'bg-green-100 text-green-800' :
                          peripheral.status === 'inactivo' ? 'bg-gray-100 text-gray-800' :
                          peripheral.status === 'dañado' ? 'bg-red-100 text-red-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {peripheral.status}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No hay periféricos que coincidan con los filtros</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      {/* Add Peripheral Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agregar Periférico</DialogTitle>
            <DialogDescription>
              Registra un nuevo dispositivo periférico de salida
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Monitor Aula A1"
              />
            </div>

            <div>
              <Label>Tipo</Label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {PERIPHERAL_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Equipo Asociado (Opcional)</Label>
              <select
                value={formData.equipmentId}
                onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Ninguno</option>
                {equipment.map((eq) => (
                  <option key={eq.id} value={eq.id}>
                    {eq.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Modelo</Label>
                <Input
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="Ej: Dell S2421H"
                />
              </div>
              <div>
                <Label>Vendedor</Label>
                <Input
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                  placeholder="Ej: Dell"
                />
              </div>
            </div>

            <div>
              <Label>Serial (Opcional)</Label>
              <Input
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                placeholder="Número de serie"
              />
            </div>

            <div>
              <Label>Resolución (Opcional)</Label>
              <Input
                value={formData.resolution}
                onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                placeholder="Ej: 1920x1080"
              />
            </div>

            <div>
              <Label>Especificaciones (Opcional)</Label>
              <Input
                value={formData.specs}
                onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                placeholder={'Ej: 24" Full HD, 60Hz'}
              />
            </div>

            <div>
              <Label>Ubicación</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ej: Aula A1"
              />
            </div>

            <div>
              <Label>Precio de Compra (S/)</Label>
              <Input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddPeripheral} className="flex-1 bg-accent text-accent-foreground">
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
