'use client'

import { useState, useEffect } from 'react'
import { getIssueReportsList, getIssuesStats, createIssueReport, updateIssueReport, deleteIssueReport, reassignIssueReport, resolveIssueReport } from '@/app/actions/issues'
import { getEquipmentList } from '@/app/actions/equipment'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { } from '@/components/ui/select'
import { Trash2, Edit2, CheckCircle2, Clock, AlertCircle, AlertTriangle } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface IssueReport {
  id: string
  equipmentId?: string
  title: string
  description: string
  category: string
  priority: string
  status: string
  reportedBy?: string
  assignedTo?: string
  resolution?: string
  resolution_date?: Date | string
  createdAt: Date | string
  updatedAt: Date | string
}

interface Equipment {
  id: string
  name: string
}

interface IssuesStats {
  total: number
  open: number
  inProgress: number
  resolved: number
  closed: number
  byPriority: Record<string, number>
  byCategory: Record<string, number>
}

export default function IssuesPage() {
  const [issues, setIssues] = useState<IssueReport[]>([])
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [stats, setStats] = useState<IssuesStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [showDialog, setShowDialog] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    equipmentId: '',
    title: '',
    description: '',
    category: 'hardware',
    priority: 'media',
    reportedBy: 'Usuario',
    assignedTo: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const [issuesData, equipmentData, statsData] = await Promise.all([
        getIssueReportsList(),
        getEquipmentList(),
        getIssuesStats(),
      ])
      setIssues(issuesData as IssueReport[])
      setEquipment(equipmentData as Equipment[])
      setStats(statsData as IssuesStats)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddIssue = async () => {
    if (!formData.title || !formData.description) {
      alert('Por favor completa los campos requeridos')
      return
    }

    try {
      const newIssue = await createIssueReport({
        equipmentId: formData.equipmentId || undefined,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        reportedBy: formData.reportedBy,
      })

      setIssues([...issues, newIssue])
      setShowDialog(false)
      resetForm()
      loadData()
    } catch (error) {
      console.error('Error adding issue:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      equipmentId: '',
      title: '',
      description: '',
      category: 'hardware',
      priority: 'media',
      reportedBy: 'Usuario',
      assignedTo: '',
    })
    setEditingId(null)
  }

  const handleResolve = async (id: string) => {
    const resolution = prompt('Ingresa la solución del problema:')
    if (!resolution) return

    try {
      await resolveIssueReport(id, resolution)
      loadData()
    } catch (error) {
      console.error('Error resolving issue:', error)
    }
  }

  const handleReassign = async (id: string) => {
    const assignedTo = prompt('Ingresa el nombre del técnico:')
    if (!assignedTo) return

    try {
      await reassignIssueReport(id, assignedTo)
      loadData()
    } catch (error) {
      console.error('Error reassigning issue:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Deseas eliminar esta incidencia?')) return

    try {
      await deleteIssueReport(id)
      setIssues(issues.filter(i => i.id !== id))
    } catch (error) {
      console.error('Error deleting issue:', error)
    }
  }

  const filteredIssues = issues.filter(i => {
    const statusMatch = statusFilter === 'all' || i.status === statusFilter
    const priorityMatch = priorityFilter === 'all' || i.priority === priorityFilter
    return statusMatch && priorityMatch
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'abierto':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'en_progreso':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'resuelto':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case 'cerrado':
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critica':
        return 'bg-red-100 text-red-800'
      case 'alta':
        return 'bg-orange-100 text-orange-800'
      case 'media':
        return 'bg-yellow-100 text-yellow-800'
      case 'baja':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Incidencias</h1>
              <p className="text-muted-foreground mt-1">
                Reporte y seguimiento de problemas del sistema
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingId(null)
                resetForm()
                setShowDialog(true)
              }}
              className="bg-accent hover:bg-cyan-500 text-accent-foreground"
            >
              Reportar Incidencia
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
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
                <CardTitle className="text-sm font-medium text-muted-foreground">Abiertas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">{stats.open}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">En Progreso</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Resueltas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cerradas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">{stats.closed}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="space-y-4 mb-8">
          <div>
            <Label className="text-sm font-medium mb-2 block">Estado</Label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'abierto', 'en_progreso', 'resuelto', 'cerrado'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    statusFilter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {status === 'all' ? 'Todos' : status.replace('_', ' ').toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Prioridad</Label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'baja', 'media', 'alta', 'critica'].map((priority) => (
                <button
                  key={priority}
                  onClick={() => setPriorityFilter(priority)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    priorityFilter === priority
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {priority === 'all' ? 'Todas' : priority.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Issues List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando incidencias...</p>
          </div>
        ) : (
          <div>
            {filteredIssues.length > 0 ? (
              <div className="space-y-4">
                {filteredIssues.map((issue) => (
                  <Card key={issue.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          {getStatusIcon(issue.status)}
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{issue.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(issue.id)}
                            className="p-2 hover:bg-muted rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Categoría</p>
                          <p className="font-medium capitalize">{issue.category}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Prioridad</p>
                          <span className={`px-2 py-1 rounded text-xs font-medium inline-block ${getPriorityColor(issue.priority)}`}>
                            {issue.priority}
                          </span>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Reportado por</p>
                          <p className="font-medium">{issue.reportedBy || '-'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Asignado a</p>
                          <p className="font-medium">{issue.assignedTo || '-'}</p>
                        </div>
                      </div>

                      {issue.status === 'abierto' && (
                        <div className="flex gap-2 pt-4 border-t border-border">
                          <Button
                            onClick={() => handleReassign(issue.id)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            Asignar
                          </Button>
                          <Button
                            onClick={() => handleResolve(issue.id)}
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            Resolver
                          </Button>
                        </div>
                      )}

                      {issue.status === 'resuelto' && issue.resolution && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground">Solución:</p>
                          <p className="text-sm mt-1">{issue.resolution}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No hay incidencias que coincidan con los filtros</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      {/* Report Issue Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reportar Incidencia</DialogTitle>
            <DialogDescription>
              Describe el problema que necesita atención
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Equipo (Opcional)</Label>
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

            <div>
              <Label>Título</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Pantalla no enciende"
              />
            </div>

            <div>
              <Label>Descripción</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el problema en detalle..."
                className="min-h-24"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Categoría</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="hardware">Hardware</option>
                  <option value="software">Software</option>
                  <option value="red">Red</option>
                  <option value="perimetral">Periférico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <Label>Prioridad</Label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Reportado por</Label>
              <Input
                value={formData.reportedBy}
                onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                placeholder="Tu nombre"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddIssue} className="flex-1 bg-accent text-accent-foreground">
                Reportar
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
