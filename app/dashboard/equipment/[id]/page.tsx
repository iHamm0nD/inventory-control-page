'use client'

import { useState, useEffect } from 'react'
import { getEquipmentById, getEquipmentComponents, getEquipmentMaintenance, getEquipmentHistory, getEquipmentSoftware, getEquipmentSubscriptions, addSoftware, addSubscription } from '@/app/actions/equipment'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Plus, X } from 'lucide-react'

interface Equipment {
  id: string
  name: string
  type: string
  model?: string
  serialNumber?: string
  description?: string
  status: string
  location?: string
  purchaseDate?: Date
  purchasePrice?: string
  lastMaintenanceDate?: Date
  createdAt: Date
  updatedAt: Date
}

interface Component {
  id: string
  name: string
  componentType: string
  model?: string
  serialNumber?: string
  specifications?: string
  installationDate?: Date
  status: string
  createdAt: Date
}

interface Maintenance {
  id: string
  maintenanceType: string
  description?: string
  performedBy?: string
  startDate: Date
  endDate?: Date
  cost?: string
  notes?: string
  createdAt: Date
}

interface HistoryEvent {
  id: string
  eventType: string
  description?: string
  cost?: string
  eventDate: Date
  createdAt: Date
}

interface Software {
  id: string
  equipmentId: string
  name: string
  version: string
  installDate: Date
  license: 'Licenciado' | 'Gratuito'
  vendor?: string
}

interface Subscription {
  id: string
  equipmentId: string
  name: string
  plan: string
  status: 'activa' | 'inactiva'
  startDate: Date
  endDate: Date
  cost: number
  renewal: 'mensual' | 'trimestral' | 'anual' | 'bienal'
}

export default function EquipmentDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [components, setComponents] = useState<Component[]>([])
  const [maintenance, setMaintenance] = useState<Maintenance[]>([])
  const [history, setHistory] = useState<HistoryEvent[]>([])
  const [software, setSoftware] = useState<Software[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'components' | 'maintenance' | 'history' | 'software' | 'subscriptions'>('components')
  const [showSoftwareForm, setShowSoftwareForm] = useState(false)
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false)

  useEffect(() => {
    loadData()
  }, [id])

  async function loadData() {
    try {
      setLoading(true)
      const [eq, comps, maint, hist, soft, subs] = await Promise.all([
        getEquipmentById(id),
        getEquipmentComponents(id),
        getEquipmentMaintenance(id),
        getEquipmentHistory(id),
        getEquipmentSoftware(id),
        getEquipmentSubscriptions(id),
      ])
      setEquipment(eq as Equipment)
      setComponents(comps as Component[])
      setMaintenance(maint as Maintenance[])
      setHistory(hist as HistoryEvent[])
    } catch (error) {
      console.error('Error loading equipment details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando detalles del equipo...</p>
      </div>
    )
  }

  if (!equipment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Equipo no encontrado</p>
          <Link href="/dashboard/equipment">
            <Button>Volver a Equipos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Link href="/dashboard/equipment" className="text-primary hover:text-blue-600 text-sm mb-2 inline-block">
                ← Volver a Equipos
              </Link>
              <h1 className="text-3xl font-bold text-foreground">{equipment.name}</h1>
              <p className="text-muted-foreground mt-1">{equipment.type}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Equipment Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1 bg-card border border-border rounded-lg p-6">
            <h2 className="font-semibold text-foreground mb-4">Información General</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Tipo</p>
                <p className="text-foreground font-medium">{equipment.type}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Modelo</p>
                <p className="text-foreground font-medium">{equipment.model || '-'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Serie</p>
                <p className="text-foreground font-mono">{equipment.serialNumber || '-'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Ubicación</p>
                <p className="text-foreground font-medium">{equipment.location || '-'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Estado</p>
                <p className="text-foreground font-medium capitalize">{equipment.status}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Precio de Compra</p>
                <p className="text-foreground font-medium">${equipment.purchasePrice || '0.00'}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-card border border-border rounded-lg p-6">
            <h2 className="font-semibold text-foreground mb-4">Descripción y Detalles</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {equipment.description || 'Sin descripción'}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Componentes</p>
                <p className="text-2xl font-bold text-primary">{components.length}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Registros de Mantenimiento</p>
                <p className="text-2xl font-bold text-accent">{maintenance.length}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Fecha de Compra</p>
                <p className="text-foreground">{equipment.purchaseDate ? new Date(equipment.purchaseDate).toLocaleDateString('es-MX') : '-'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Último Mantenimiento</p>
                <p className="text-foreground">
                  {equipment.lastMaintenanceDate ? new Date(equipment.lastMaintenanceDate).toLocaleDateString('es-MX') : 'Sin registros'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="border-b border-border flex">
            {(['components', 'maintenance', 'history'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-primary text-primary bg-muted/30'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'components' && `Componentes (${components.length})`}
                {tab === 'maintenance' && `Mantenimiento (${maintenance.length})`}
                {tab === 'history' && `Historial (${history.length})`}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'components' && (
              <div>
                {components.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Sin componentes registrados</p>
                ) : (
                  <div className="space-y-4">
                    {components.map((comp) => (
                      <div key={comp.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-foreground">{comp.name}</h3>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{comp.componentType}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Modelo</p>
                            <p className="text-foreground">{comp.model || '-'}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Serie</p>
                            <p className="text-foreground font-mono">{comp.serialNumber || '-'}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Instalación</p>
                            <p className="text-foreground">
                              {comp.installationDate ? new Date(comp.installationDate).toLocaleDateString('es-MX') : '-'}
                            </p>
                          </div>
                        </div>
                        {comp.specifications && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            <p className="font-medium text-foreground mb-1">Especificaciones:</p>
                            <p>{comp.specifications}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div>
                {maintenance.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Sin registros de mantenimiento</p>
                ) : (
                  <div className="space-y-4">
                    {maintenance.map((maint) => (
                      <div key={maint.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-foreground">{maint.maintenanceType}</h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(maint.startDate).toLocaleDateString('es-MX')}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                          <div>
                            <p className="text-muted-foreground">Realizador</p>
                            <p className="text-foreground">{maint.performedBy || '-'}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Costo</p>
                            <p className="text-foreground">${maint.cost || '0.00'}</p>
                          </div>
                        </div>
                        {maint.description && (
                          <p className="text-sm text-muted-foreground mb-2">{maint.description}</p>
                        )}
                        {maint.notes && (
                          <div className="text-xs bg-muted/50 p-2 rounded">
                            <p className="font-medium text-foreground mb-1">Notas:</p>
                            <p>{maint.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                {history.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Sin eventos en el historial</p>
                ) : (
                  <div className="space-y-4">
                    {history.map((event) => (
                      <div key={event.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-foreground capitalize">{event.eventType}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.eventDate).toLocaleDateString('es-MX')}
                            </p>
                            {event.cost && <p className="text-sm font-medium text-foreground">${event.cost}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
