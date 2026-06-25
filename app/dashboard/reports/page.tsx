'use client'

import { useState, useEffect } from 'react'
import {
  getInventorySummary,
  getUpgradedEquipment,
  getMaintenanceCosts,
  getHardwareChangeReport,
  getEquipmentList,
} from '@/app/actions/equipment'
import { getIssueReportsList, getIssuesStats } from '@/app/actions/issues'
import { getInstalledSoftwareList } from '@/app/actions/software'
import { getSubscriptionsList, getSubscriptionsStats } from '@/app/actions/subscriptions'
import { getOutputPeripheralsList } from '@/app/actions/peripherals'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
  const [activeTab, setActiveTab] = useState<'inventory' | 'upgraded' | 'costs' | 'hardware' | 'issues' | 'software' | 'subscriptions' | 'peripherals'>('inventory')
  const [loading, setLoading] = useState(true)
  const [inventorySummary, setInventorySummary] = useState<any>(null)
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [upgraded, setUpgraded] = useState<UpgradedEquip[]>([])
  const [costs, setCosts] = useState<MaintenanceCost[]>([])
  const [hardware, setHardware] = useState<HardwareChangeData[]>([])
  const [issues, setIssues] = useState<any[]>([])
  const [issuesStats, setIssuesStats] = useState<any>(null)
  const [software, setSoftware] = useState<any[]>([])
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [subscriptionStats, setSubscriptionStats] = useState<any>(null)
  const [peripherals, setPeripherals] = useState<any[]>([])

  useEffect(() => {
    loadReports()
  }, [])

  async function loadReports() {
    try {
      setLoading(true)
      const [inv, equip, upgr, mCosts, hwChanges, issuesData, issuesStatsData, softwareData, subsData, subsStatsData, periphData] = await Promise.all([
        getInventorySummary(),
        getEquipmentList(),
        getUpgradedEquipment(),
        getMaintenanceCosts(),
        getHardwareChangeReport(),
        getIssueReportsList(),
        getIssuesStats(),
        getInstalledSoftwareList(),
        getSubscriptionsList(),
        getSubscriptionsStats(),
        getOutputPeripheralsList(),
      ])
      setInventorySummary(inv)
      setEquipment(equip as Equipment[])
      setUpgraded(upgr as UpgradedEquip[])
      setCosts(mCosts as MaintenanceCost[])
      setHardware(hwChanges as HardwareChangeData[])
      setIssues(issuesData as any[])
      setIssuesStats(issuesStatsData as any)
      setSoftware(softwareData as any[])
      setSubscriptions(subsData as any[])
      setSubscriptionStats(subsStatsData as any)
      setPeripherals(periphData as any[])
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
              { id: 'software', label: 'Software' },
              { id: 'subscriptions', label: 'Suscripciones' },
              { id: 'peripherals', label: 'Periféricos' },
              { id: 'issues', label: 'Incidencias' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium transition-colors border-b-2 whitespace-nowrap text-sm ${
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

        {/* Software Report */}
        {activeTab === 'software' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Reporte de Software Instalado</h2>
            <Button
              onClick={() =>
                handleExportCSV(
                  software.map(s => ({ ...s, licenseCost: s.licenseCost || 0 })),
                  `software_${new Date().toISOString().split('T')[0]}.csv`
                )
              }
              className="mb-4 bg-primary hover:bg-blue-600 text-primary-foreground"
            >
              Exportar a CSV
            </Button>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{software.length}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Propietario</p>
                <p className="text-2xl font-bold">{software.filter(s => s.licenseType === 'propietaria').length}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Libre</p>
                <p className="text-2xl font-bold">{software.filter(s => s.licenseType === 'libre').length}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Costo Total</p>
                <p className="text-2xl font-bold">S/ {software.reduce((acc, s) => acc + (s.licenseCost || 0), 0).toFixed(2)}</p>
              </div>
            </div>
            {software.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Sin software registrado</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Software</th>
                      <th className="text-left py-3 px-4 font-semibold">Tipo de Licencia</th>
                      <th className="text-left py-3 px-4 font-semibold">Costo</th>
                      <th className="text-left py-3 px-4 font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {software.map((s) => (
                      <tr key={s.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-3 px-4">{s.name}</td>
                        <td className="py-3 px-4"><span className="text-xs bg-muted px-2 py-1 rounded">{s.licenseType}</span></td>
                        <td className="py-3 px-4">S/ {(s.licenseCost || 0).toFixed(2)}</td>
                        <td className="py-3 px-4"><span className={`text-xs px-2 py-1 rounded ${s.status === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{s.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Subscriptions Report */}
        {activeTab === 'subscriptions' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Reporte de Suscripciones</h2>
            <Button
              onClick={() =>
                handleExportCSV(
                  subscriptions,
                  `suscripciones_${new Date().toISOString().split('T')[0]}.csv`
                )
              }
              className="mb-4 bg-primary hover:bg-blue-600 text-primary-foreground"
            >
              Exportar a CSV
            </Button>
            {subscriptionStats && (
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{subscriptionStats.total}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Activas</p>
                  <p className="text-2xl font-bold text-green-600">{subscriptionStats.active}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Vencen en 30d</p>
                  <p className="text-2xl font-bold text-orange-600">{subscriptionStats.expiringSoon}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Costo Anual</p>
                  <p className="text-2xl font-bold">S/ {subscriptionStats.totalCost.toFixed(2)}</p>
                </div>
              </div>
            )}
            {subscriptions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Sin suscripciones registradas</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Suscripción</th>
                      <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                      <th className="text-left py-3 px-4 font-semibold">Costo</th>
                      <th className="text-left py-3 px-4 font-semibold">Renovación</th>
                      <th className="text-left py-3 px-4 font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((s) => (
                      <tr key={s.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-3 px-4">{s.name}</td>
                        <td className="py-3 px-4"><span className="text-xs bg-muted px-2 py-1 rounded">{s.type}</span></td>
                        <td className="py-3 px-4">S/ {s.cost.toFixed(2)}</td>
                        <td className="py-3 px-4">{new Date(s.renewalDate).toLocaleDateString('es-PE')}</td>
                        <td className="py-3 px-4"><span className={`text-xs px-2 py-1 rounded ${s.status === 'activa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{s.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Peripherals Report */}
        {activeTab === 'peripherals' && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Reporte de Periféricos</h2>
            <Button
              onClick={() =>
                handleExportCSV(
                  peripherals,
                  `perifericos_${new Date().toISOString().split('T')[0]}.csv`
                )
              }
              className="mb-4 bg-primary hover:bg-blue-600 text-primary-foreground"
            >
              Exportar a CSV
            </Button>
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{peripherals.length}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Monitores</p>
                <p className="text-2xl font-bold">{peripherals.filter(p => p.type === 'monitor').length}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Impresoras</p>
                <p className="text-2xl font-bold">{peripherals.filter(p => p.type === 'impresora').length}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Proyectores</p>
                <p className="text-2xl font-bold">{peripherals.filter(p => p.type === 'proyector').length}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Activos</p>
                <p className="text-2xl font-bold text-green-600">{peripherals.filter(p => p.status === 'activo').length}</p>
              </div>
            </div>
            {peripherals.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Sin periféricos registrados</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Periférico</th>
                      <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                      <th className="text-left py-3 px-4 font-semibold">Modelo</th>
                      <th className="text-left py-3 px-4 font-semibold">Ubicación</th>
                      <th className="text-left py-3 px-4 font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {peripherals.map((p) => (
                      <tr key={p.id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-3 px-4">{p.name}</td>
                        <td className="py-3 px-4"><span className="text-xs bg-muted px-2 py-1 rounded capitalize">{p.type}</span></td>
                        <td className="py-3 px-4">{p.model || '-'}</td>
                        <td className="py-3 px-4">{p.location || '-'}</td>
                        <td className="py-3 px-4"><span className={`text-xs px-2 py-1 rounded ${p.status === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{p.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Issues Report */}
        {activeTab === 'issues' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {issuesStats && (
                <>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Total de Incidencias</p>
                    <p className="text-3xl font-bold">{issuesStats.total}</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Abiertas</p>
                    <p className="text-3xl font-bold text-red-500">{issuesStats.open}</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">En Progreso</p>
                    <p className="text-3xl font-bold text-yellow-500">{issuesStats.inProgress}</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Resueltas</p>
                    <p className="text-3xl font-bold text-green-500">{issuesStats.resolved}</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Cerradas</p>
                    <p className="text-3xl font-bold text-blue-500">{issuesStats.closed}</p>
                  </div>
                </>
              )}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Detalle de Incidencias</h2>
              <Button
                onClick={() =>
                  handleExportCSV(
                    issues,
                    `incidencias_${new Date().toISOString().split('T')[0]}.csv`
                  )
                }
                className="mb-4 bg-primary hover:bg-blue-600 text-primary-foreground"
              >
                Exportar a CSV
              </Button>
              {issues.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Sin incidencias registradas</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Título</th>
                        <th className="text-left py-3 px-4 font-semibold">Categoría</th>
                        <th className="text-left py-3 px-4 font-semibold">Prioridad</th>
                        <th className="text-left py-3 px-4 font-semibold">Estado</th>
                        <th className="text-left py-3 px-4 font-semibold">Reportado por</th>
                        <th className="text-left py-3 px-4 font-semibold">Asignado a</th>
                      </tr>
                    </thead>
                    <tbody>
                      {issues.map((issue) => (
                        <tr key={issue.id} className="border-b border-border hover:bg-muted/30">
                          <td className="py-3 px-4 max-w-xs truncate">{issue.title}</td>
                          <td className="py-3 px-4"><span className="text-xs bg-muted px-2 py-1 rounded capitalize">{issue.category}</span></td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded font-medium ${
                              issue.priority === 'critica' ? 'bg-red-100 text-red-800' :
                              issue.priority === 'alta' ? 'bg-orange-100 text-orange-800' :
                              issue.priority === 'media' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {issue.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded ${
                              issue.status === 'abierto' ? 'bg-red-100 text-red-800' :
                              issue.status === 'en_progreso' ? 'bg-yellow-100 text-yellow-800' :
                              issue.status === 'resuelto' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {issue.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{issue.reportedBy || '-'}</td>
                          <td className="py-3 px-4">{issue.assignedTo || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
