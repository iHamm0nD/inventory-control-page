'use client'

import { useState, useEffect } from 'react'
import { getEquipmentList, deleteEquipment } from '@/app/actions/equipment'
import { EquipmentTable } from '@/components/equipment-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Equipment {
  id: string
  name: string
  type: string
  model?: string
  serialNumber?: string
  status: string
  location?: string
  purchasePrice?: string
  lastMaintenanceDate?: Date
  createdAt: Date
}

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const router = useRouter()

  useEffect(() => {
    loadEquipment()
  }, [])

  async function loadEquipment() {
    try {
      setLoading(true)
      const data = await getEquipmentList()
      setEquipment(data as Equipment[])
    } catch (error) {
      console.error('Error loading equipment:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      return
    }
    try {
      await deleteEquipment(id)
      setEquipment(equipment.filter((e) => e.id !== id))
    } catch (error) {
      console.error('Error deleting equipment:', error)
      alert('Error al eliminar el equipo')
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/dashboard/equipment/${id}`)
  }

  const filteredEquipment = equipment.filter((item) => {
    if (filter === 'all') return true
    return item.status === filter
  })

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      activo: 'Activos',
      inactivo: 'Inactivos',
      mantenimiento: 'En Mantenimiento',
      retirado: 'Retirados',
      all: 'Todos',
    }
    return labels[status] || status
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Equipos</h1>
              <p className="text-muted-foreground mt-1">
                Total de equipos: <strong>{equipment.length}</strong>
              </p>
            </div>
            <Link href="/dashboard/equipment/new">
              <Button className="bg-accent hover:bg-cyan-500 text-accent-foreground">
                Agregar Equipo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {['all', 'activo', 'inactivo', 'mantenimiento', 'retirado'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {getStatusLabel(status)}
            </button>
          ))}
        </div>

        {/* Equipment Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando equipos...</p>
          </div>
        ) : (
          <EquipmentTable
            equipment={filteredEquipment}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  )
}
