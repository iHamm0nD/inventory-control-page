'use client'

import { useState, useEffect } from 'react'
import {
  getInventorySummary,
  getUpgradedEquipment,
  getMaintenanceCosts,
  getHardwareChangeReport,
  getEquipmentList,
} from '@/app/actions/equipment'
import { Button } from '@/components/ui/button'

interface Equipment {
  id: string
  name: string
  type: string
  purchasePrice?: string
  status: string
}

interface UpgradedEquip {
  equipmentId: string
  equipmentName: string
  eventCount: string
  totalCost: string
  lastEvent: Date
}

interface MaintenanceCost {
  equipmentId: string
  equipmentName: string
  totalCost: string
  maintenanceCount: string
}

interface HardwareChangeData {
  id: string
  equipmentId: string
  action: string
  oldComponent?: string
  newComponent?: string
  cost?: string
  changeDate: Date
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'upgraded' | 'costs' | 'hardware'>('inventory')
  const [loading, setLoading] = useState(true)
  const [inventorySummary, setInventorySummary] = useState<any>(null)
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [upgraded, setUpgraded] = useState<UpgradedEquip[]>([])
  const [costs, setCosts] = useState<MaintenanceCost[]>([])
  const [hardware, setHardware] = useState<HardwareChangeData[]>([])

  useEffect(() => {
    loadReports()
  }, [])

  async function loadReports() {
    try {
      setLoading(true)
      const [inv, equip, upgr, mCosts, hwChanges] = await Promise.all([
        getInventorySummary(),
        getEquipmentList(),
        getUpgradedEquipment(),
        getMaintenanceCosts(),
        getHardwareChangeReport(),
      ])
      setInventorySummary(inv)
      setEquipment(equip as Equipment[])
      setUpgraded(upgr as UpgradedEquip[])
      setCosts(mCosts as MaintenanceCost[])
      setHardware(hwChanges as HardwareChangeData[])
    } catch (error) {
      console.error('Error loading reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = (data: any[], filename: string) => {
    const csv = convertToCSV(data)
    downloadCSV(csv, filename)
  }

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return ''
    const headers = Object.keys(data[0])
    const rows = data.map((row) =>
      headers.map((header) => {
        const value = row[header]
        if (typeof value === 'object') {
          return JSON.stringify(value)
        }
        return `"${String(value).replace(/"/g, '""')}"`
      })
    )
    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
  }

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando reportes...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-foreground">Reportes</h1>
          <p className="text-muted-foreground mt-1">
            Análisis detallado de inventario, costos y cambios de hardware
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
          {(
            [
              { id: 'inventory', label: 'Inventario' },
              { id: 'upgraded', label: 'Equipos Repotenciados' },
              { id: 'costs', label: 'Costos de Mantenimiento' },
              { id: 'hardware', label: 'Cambios de Hardware' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-muted/30'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Inventory Report */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Total de Equipos</p>
                <p className="text-3xl font-bold text-foreground">{inventorySummary.total}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Activos</p>
                <p className="text-3xl font-bold text-green-400">{inventorySummary.active}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Inactivos</p>
                <p className="text-3xl font-bold text-gray-400">{inventorySummary.inactive}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">En Mantenimiento</p>
                <p className="text-3xl font-bold text-yellow-400">{inventorySummary.maintenance}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Retirados</p>
                <p className="text-3xl font-bold text-red-400">{inventorySummary.retired}</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Listado de Equipos</h2>
              <Button
                onClick={() =>
                  handleExportCSV(
                    equipment,
                    `inventario_${new Date().toISOString().split('T')[0]}.csv`
                  )
                }
                className="mb-4 bg-primary hover:bg-blue-600 text-primary-foreground"
              >
                Exportar a CSV
              </Button>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Equipo</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Tipo</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Estado</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipment.map((eq) => (
                      <tr key={eq.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-3 px-4 text-foreground">{eq.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{eq.type}</td>
                        <td className="py-3 px-4">
                          <span className="capitalize text-foreground">{eq.status}</span>
                        </td>
                        <td className="py-3 px-4 text-right text-foreground">${eq.purchasePrice || '0.00'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Upgraded Equipment Report */}
        {activeTab === 'upgraded' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Equipos Repotenciados</h2>
            <Button
              onClick={() =>
                handleExportCSV(
                  upgraded,
                  `equipos_repotenciados_${new Date().toISOString().split('T')[0]}.csv`
                )
              }
              className="mb-4 bg-primary hover:bg-blue-600 text-primary-foreground"
            >
              Exportar a CSV
            </Button>
            {upgraded.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Sin equipos repotenciados registrados</p>
            ) : (
              <div className="space-y-4">
                {upgraded.map((eq) => (
                  <div key={eq.equipmentId} className="border border-border rounded-lg p-4 hover:bg-muted/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{eq.equipmentName}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {eq.eventCount} evento(s) de cambio
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${eq.totalCost}</p>
                        <p className="text-xs text-muted-foreground">
                          Último: {new Date(eq.lastEvent).toLocaleDateString('es-MX')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Maintenance Costs Report */}
        {activeTab === 'costs' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Costos de Mantenimiento por Equipo</h2>
            <Button
              onClick={() =>
                handleExportCSV(
                  costs,
                  `costos_mantenimiento_${new Date().toISOString().split('T')[0]}.csv`
                )
              }
              className="mb-4 bg-primary hover:bg-blue-600 text-primary-foreground"
            >
              Exportar a CSV
            </Button>
            {costs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Sin costos de mantenimiento registrados</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Equipo</th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">Registros</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Costo Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costs.map((cost) => (
                      <tr key={cost.equipmentId} className="border-b border-border hover:bg-muted/30">
                        <td className="py-3 px-4 text-foreground">{cost.equipmentName}</td>
                        <td className="py-3 px-4 text-center text-muted-foreground">{cost.maintenanceCount}</td>
                        <td className="py-3 px-4 text-right font-semibold text-accent">
                          ${cost.totalCost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Hardware Changes Report */}
        {activeTab === 'hardware' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Cambios de Hardware</h2>
            <Button
              onClick={() =>
                handleExportCSV(
                  hardware,
                  `cambios_hardware_${new Date().toISOString().split('T')[0]}.csv`
                )
              }
              className="mb-4 bg-primary hover:bg-blue-600 text-primary-foreground"
            >
              Exportar a CSV
            </Button>
            {hardware.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Sin cambios de hardware registrados</p>
            ) : (
              <div className="space-y-4">
                {hardware.map((hw) => (
                  <div key={hw.id} className="border border-border rounded-lg p-4 hover:bg-muted/30">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="inline-block bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded mb-2">
                          {hw.action}
                        </span>
                        <p className="text-sm text-muted-foreground mt-2">
                          {hw.oldComponent} → {hw.newComponent}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${hw.cost || '0.00'}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(hw.changeDate).toLocaleDateString('es-MX')}
                        </p>
                      </div>
                    </div>
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
