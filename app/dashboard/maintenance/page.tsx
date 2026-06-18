'use client'

import { useState, useEffect } from 'react'
import { getEquipmentList, recordMaintenance, recordHardwareChange, getEquipmentMaintenance } from '@/app/actions/equipment'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Equipment {
  id: string
  name: string
  type: string
}

interface MaintenanceRecord {
  id: string
  equipmentId: string
  equipmentName?: string
  maintenanceType: string
  description?: string
  performedBy?: string
  startDate: Date
  endDate?: Date
  cost?: string
  createdAt: Date
}

export default function MaintenancePage() {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [step, setStep] = useState<'select' | 'maintenance' | 'hardware'>('select')
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('')
  const [maintenanceId, setMaintenanceId] = useState('')

  const [maintenanceForm, setMaintenanceForm] = useState({
    maintenanceType: 'preventivo',
    description: '',
    performedBy: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    cost: '',
    notes: '',
  })

  const [hardwareForm, setHardwareForm] = useState({
    action: 'reemplazo',
    oldComponent: '',
    newComponent: '',
    cost: '',
    reason: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const eqData = await getEquipmentList()
      setEquipment(eqData as Equipment[])
      // Load maintenance records
      const maintData = await getEquipmentMaintenance('')
      setMaintenance(maintData as MaintenanceRecord[])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMaintenanceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setMaintenanceForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleHardwareChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setHardwareForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMaintenanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEquipmentId) return

    try {
      const result = await recordMaintenance({
        equipmentId: selectedEquipmentId,
        maintenanceType: maintenanceForm.maintenanceType as 'preventivo' | 'correctivo' | 'repotenciacion',
        description: maintenanceForm.description,
        performedBy: maintenanceForm.performedBy,
        startDate: new Date(maintenanceForm.startDate),
        endDate: maintenanceForm.endDate ? new Date(maintenanceForm.endDate) : undefined,
        cost: maintenanceForm.cost ? parseFloat(maintenanceForm.cost) : undefined,
        notes: maintenanceForm.notes,
      })
      setMaintenanceId((result as { id: string }).id)
      setStep('hardware')
    } catch (error) {
      console.error('Error recording maintenance:', error)
      alert('Error al registrar el mantenimiento')
    }
  }

  const handleHardwareSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEquipmentId || !maintenanceId) return

    try {
      await recordHardwareChange({
        maintenanceId,
        equipmentId: selectedEquipmentId,
        action: hardwareForm.action as 'reemplazo' | 'mejora' | 'reparacion',
        oldComponent: hardwareForm.oldComponent,
        newComponent: hardwareForm.newComponent,
        cost: hardwareForm.cost ? parseFloat(hardwareForm.cost) : undefined,
        reason: hardwareForm.reason,
      })
      
      // Reset forms
      setMaintenanceForm({
        maintenanceType: 'preventivo',
        description: '',
        performedBy: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        cost: '',
        notes: '',
      })
      setHardwareForm({
        action: 'reemplazo',
        oldComponent: '',
        newComponent: '',
        cost: '',
        reason: '',
      })
      setShowForm(false)
      setStep('select')
      alert('Mantenimiento registrado exitosamente')
    } catch (error) {
      console.error('Error recording hardware change:', error)
      alert('Error al registrar el cambio de hardware')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Registro de Mantenimiento</h1>
              <p className="text-muted-foreground mt-1">
                Registra mantenimiento, reparaciones y cambios de hardware
              </p>
            </div>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-accent hover:bg-cyan-500 text-accent-foreground"
              >
                Nuevo Registro
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {showForm ? (
          <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
            {step === 'select' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Selecciona Equipo</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {equipment.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedEquipmentId(item.id)
                        setStep('maintenance')
                      }}
                      className="w-full p-4 text-left border border-border rounded-lg hover:bg-muted/50 hover:border-primary transition-all"
                    >
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="w-full border-border"
                >
                  Cancelar
                </Button>
              </div>
            )}

            {step === 'maintenance' && (
              <form onSubmit={handleMaintenanceSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Registro de Mantenimiento</h2>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Equipo Seleccionado
                  </label>
                  <div className="p-3 bg-muted border border-border rounded-lg text-foreground">
                    {equipment.find((e) => e.id === selectedEquipmentId)?.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Mantenimiento
                  </label>
                  <select
                    name="maintenanceType"
                    value={maintenanceForm.maintenanceType}
                    onChange={handleMaintenanceChange}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="preventivo">Mantenimiento Preventivo</option>
                    <option value="correctivo">Mantenimiento Correctivo</option>
                    <option value="repotenciacion">Repotenciación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={maintenanceForm.description}
                    onChange={handleMaintenanceChange}
                    placeholder="Describe el trabajo realizado..."
                    rows={3}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Realizador
                  </label>
                  <input
                    type="text"
                    name="performedBy"
                    value={maintenanceForm.performedBy}
                    onChange={handleMaintenanceChange}
                    placeholder="Nombre del técnico"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Fecha de Inicio
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={maintenanceForm.startDate}
                      onChange={handleMaintenanceChange}
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Fecha de Finalización
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={maintenanceForm.endDate}
                      onChange={handleMaintenanceChange}
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Costo
                  </label>
                  <input
                    type="number"
                    name="cost"
                    value={maintenanceForm.cost}
                    onChange={handleMaintenanceChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Notas Adicionales
                  </label>
                  <textarea
                    name="notes"
                    value={maintenanceForm.notes}
                    onChange={handleMaintenanceChange}
                    placeholder="Notas adicionales..."
                    rows={2}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => {
                      setStep('select')
                      setSelectedEquipmentId('')
                    }}
                    variant="outline"
                    className="flex-1 border-border"
                  >
                    Atrás
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-blue-600 text-primary-foreground"
                  >
                    Siguiente: Cambios de Hardware
                  </Button>
                </div>
              </form>
            )}

            {step === 'hardware' && (
              <form onSubmit={handleHardwareSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Cambios de Hardware</h2>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Cambio
                  </label>
                  <select
                    name="action"
                    value={hardwareForm.action}
                    onChange={handleHardwareChange}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="reemplazo">Reemplazo de Componente</option>
                    <option value="mejora">Mejora/Upgrade</option>
                    <option value="reparacion">Reparación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Componente Anterior
                  </label>
                  <input
                    type="text"
                    name="oldComponent"
                    value={hardwareForm.oldComponent}
                    onChange={handleHardwareChange}
                    placeholder="Ej: RAM DDR4 8GB"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Componente Nuevo
                  </label>
                  <input
                    type="text"
                    name="newComponent"
                    value={hardwareForm.newComponent}
                    onChange={handleHardwareChange}
                    placeholder="Ej: RAM DDR4 16GB"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Costo del Componente
                  </label>
                  <input
                    type="number"
                    name="cost"
                    value={hardwareForm.cost}
                    onChange={handleHardwareChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Razón del Cambio
                  </label>
                  <textarea
                    name="reason"
                    value={hardwareForm.reason}
                    onChange={handleHardwareChange}
                    placeholder="¿Por qué se realizó este cambio?..."
                    rows={2}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setStep('maintenance')}
                    variant="outline"
                    className="flex-1 border-border"
                  >
                    Atrás
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setStep('select')
                    }}
                    variant="outline"
                    className="flex-1 border-border"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-blue-600 text-primary-foreground"
                  >
                    Guardar
                  </Button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div>
            {maintenance.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No hay registros de mantenimiento para mostrar
                </p>
                <Button
                  onClick={() => {
                    setShowForm(true)
                    setStep('select')
                  }}
                  className="bg-primary hover:bg-blue-600 text-primary-foreground"
                >
                  Crear Primer Registro
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {maintenance.map((maint) => (
                  <div key={maint.id} className="bg-card border border-border rounded-lg p-6 hover:bg-muted/30">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{equipment.find(e => e.id === maint.equipmentId)?.name || 'Equipo'}</h3>
                        <p className="text-sm text-muted-foreground capitalize mt-1">{maint.maintenanceType}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(maint.startDate).toLocaleDateString('es-MX')}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Realizador</p>
                        <p className="text-foreground font-medium">{maint.performedBy || '-'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Costo</p>
                        <p className="text-foreground font-medium">${maint.cost || '0.00'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Estado</p>
                        <p className="text-foreground font-medium">Completado</p>
                      </div>
                    </div>
                    {maint.description && (
                      <p className="text-sm text-muted-foreground">{maint.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
