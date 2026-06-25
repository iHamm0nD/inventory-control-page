'use client'

import { useState, useEffect } from 'react'
import { getInstalledSoftwareList, createInstalledSoftware, deleteInstalledSoftware } from '@/app/actions/software'
import { getEquipmentList } from '@/app/actions/equipment'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trash2 } from 'lucide-react'

interface Software {
  id: string
  equipmentId: string
  name: string
  version?: string
  vendor?: string
  licenseType: string
  licenseCost?: number
  licensesAvailable?: number
  installationDate?: Date
  expiryDate?: Date
  status: string
  notes?: string
}

interface Equipment {
  id: string
  name: string
}

export default function SoftwarePage() {
  const [software, setSoftware] = useState<Software[]>([])
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showDialog, setShowDialog] = useState(false)
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    version: '',
    vendor: '',
    licenseType: 'propietaria',
    licenseCost: '',
    installationDate: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const [softwareData, equipmentData] = await Promise.all([
        getInstalledSoftwareList(),
        getEquipmentList(),
      ])
      setSoftware(softwareData as Software[])
      setEquipment(equipmentData as Equipment[])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSoftware = async () => {
    if (!selectedEquipmentId || !formData.name) {
      alert('Por favor completa los campos requeridos')
      return
    }

    try {
      const newSoftware = await createInstalledSoftware({
        equipmentId: selectedEquipmentId,
        name: formData.name,
        version: formData.version,
        vendor: formData.vendor,
        licenseType: formData.licenseType,
        licenseCost: formData.licenseCost ? Number(formData.licenseCost) : 0,
        licensesAvailable: 1,
        installationDate: new Date(formData.installationDate),
      })

      setSoftware([...software, newSoftware])
      setShowDialog(false)
      setFormData({
        name: '',
        version: '',
        vendor: '',
        licenseType: 'propietaria',
        licenseCost: '',
        installationDate: new Date().toISOString().split('T')[0],
      })
      setSelectedEquipmentId('')
    } catch (error) {
      console.error('Error adding software:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Deseas eliminar este software?')) return

    try {
      await deleteInstalledSoftware(id)
      setSoftware(software.filter(s => s.id !== id))
    } catch (error) {
      console.error('Error deleting software:', error)
    }
  }

  const filteredSoftware = software.filter(s => {
    if (filter === 'all') return true
    return s.status === filter
  })

  const licenseStats = {
    propietaria: software.filter(s => s.licenseType === 'propietaria').length,
    libre: software.filter(s => s.licenseType === 'libre').length,
    educativa: software.filter(s => s.licenseType === 'educativa').length,
    trial: software.filter(s => s.licenseType === 'trial').length,
  }

  const totalLicenseCost = software.reduce((acc, s) => acc + (s.licenseCost || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Software Instalado</h1>
              <p className="text-muted-foreground mt-1">
                Total de aplicaciones: <strong>{software.length}</strong>
              </p>
            </div>
            <Button
              onClick={() => setShowDialog(true)}
              className="bg-accent hover:bg-cyan-500 text-accent-foreground"
            >
              Agregar Software
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{software.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Propietario</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{licenseStats.propietaria}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Libre</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{licenseStats.libre}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Educativo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{licenseStats.educativa}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Costo Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">S/ {totalLicenseCost.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {['all', 'activo', 'inactivo', 'vencido'].map((status) => (
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

        {/* Software Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando software...</p>
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Nombre</th>
                      <th className="text-left py-3 px-4 font-medium">Equipo</th>
                      <th className="text-left py-3 px-4 font-medium">Versión</th>
                      <th className="text-left py-3 px-4 font-medium">Tipo de Licencia</th>
                      <th className="text-left py-3 px-4 font-medium">Costo</th>
                      <th className="text-left py-3 px-4 font-medium">Estado</th>
                      <th className="text-left py-3 px-4 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSoftware.map((sw) => (
                      <tr key={sw.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">{sw.name}</td>
                        <td className="py-3 px-4">
                          {equipment.find(e => e.id === sw.equipmentId)?.name || 'N/A'}
                        </td>
                        <td className="py-3 px-4">{sw.version || '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            sw.licenseType === 'propietaria' ? 'bg-red-100 text-red-800' :
                            sw.licenseType === 'libre' ? 'bg-green-100 text-green-800' :
                            sw.licenseType === 'educativa' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {sw.licenseType}
                          </span>
                        </td>
                        <td className="py-3 px-4">S/ {sw.licenseCost?.toFixed(2) || '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            sw.status === 'activo' ? 'bg-green-100 text-green-800' :
                            sw.status === 'inactivo' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {sw.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleDelete(sw.id)}
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

      {/* Add Software Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar Software</DialogTitle>
            <DialogDescription>
              Registra un nuevo software instalado en los equipos
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Equipo</Label>
              <select
                value={selectedEquipmentId}
                onChange={(e) => setSelectedEquipmentId(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Selecciona un equipo</option>
                {equipment.map((eq) => (
                  <option key={eq.id} value={eq.id}>
                    {eq.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Nombre del Software</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Windows 10 Pro"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Versión</Label>
                <Input
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="Ej: 21H2"
                />
              </div>
              <div>
                <Label>Vendedor</Label>
                <Input
                  value={formData.vendor}
                  onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                  placeholder="Ej: Microsoft"
                />
              </div>
            </div>

            <div>
              <Label>Tipo de Licencia</Label>
              <select
                value={formData.licenseType}
                onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="propietaria">Propietaria</option>
                <option value="libre">Libre</option>
                <option value="educativa">Educativa</option>
                <option value="trial">Trial</option>
              </select>
            </div>

            <div>
              <Label>Costo de Licencia (S/)</Label>
              <Input
                type="number"
                value={formData.licenseCost}
                onChange={(e) => setFormData({ ...formData, licenseCost: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label>Fecha de Instalación</Label>
              <Input
                type="date"
                value={formData.installationDate}
                onChange={(e) => setFormData({ ...formData, installationDate: e.target.value })}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddSoftware} className="flex-1 bg-accent text-accent-foreground">
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
