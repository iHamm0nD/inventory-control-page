'use client'

import { useState } from 'react'
import { createEquipment } from '@/app/actions/equipment'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, X } from 'lucide-react'

const EQUIPMENT_TYPES = [
  'Computadora de Escritorio',
  'Laptop',
  'Servidor',
  'Monitor',
  'Impresora',
  'Switch',
  'Router',
  'UPS',
  'Proyector',
  'Escáner',
  'Otro',
]

const COMPONENT_TYPES = [
  'RAM',
  'Almacenamiento',
  'GPU',
  'Fuente',
  'Red',
  'Refrigeración',
  'Monitor',
  'Audio',
  'Óptico',
  'Teclado',
  'Ratón',
  'Motherboard',
  'Procesador',
  'Otro',
]

interface Component {
  id: string
  name: string
  type: string
}

export default function NewEquipmentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [components, setComponents] = useState<Component[]>([])
  const [showComponentForm, setShowComponentForm] = useState(false)
  const [newComponent, setNewComponent] = useState({ name: '', type: '' })

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    model: '',
    serialNumber: '',
    description: '',
    location: '',
    purchaseDate: '',
    purchasePrice: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleComponentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewComponent((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addComponent = () => {
    if (!newComponent.name || !newComponent.type) {
      setError('El nombre y tipo del componente son requeridos')
      return
    }

    const component: Component = {
      id: Math.random().toString(36).substr(2, 9),
      name: newComponent.name,
      type: newComponent.type,
    }

    setComponents([...components, component])
    setNewComponent({ name: '', type: '' })
    setShowComponentForm(false)
    setError('')
  }

  const removeComponent = (id: string) => {
    setComponents(components.filter((c) => c.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.type) {
      setError('El nombre y tipo de equipo son requeridos')
      return
    }

    try {
      setLoading(true)
      await createEquipment({
        name: formData.name,
        type: formData.type,
        model: formData.model,
        serialNumber: formData.serialNumber,
        description: formData.description,
        location: formData.location,
        purchaseDate: formData.purchaseDate ? new Date(formData.purchaseDate) : undefined,
        purchasePrice: formData.purchasePrice ? parseFloat(formData.purchasePrice) : undefined,
        components: components.map((c) => ({ name: c.name, type: c.type })),
      })
      router.push('/dashboard/equipment')
    } catch (err) {
      setError('Error al crear el equipo')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-6 py-6">
          <Link href="/dashboard/equipment" className="text-primary hover:text-blue-600 text-sm mb-2 inline-block">
            ← Volver a Equipos
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Registrar Nuevo Equipo</h1>
          <p className="text-muted-foreground mt-1">Completa el formulario para agregar un equipo al inventario</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-card border border-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-destructive/20 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Section 1: Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Información Básica</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombre del Equipo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: PC Escritorio Lab 1"
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Equipo *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Selecciona un tipo...</option>
                    {EQUIPMENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Modelo
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="Ej: HP Pavilion 15"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Número de Serie
                    </label>
                    <input
                      type="text"
                      name="serialNumber"
                      value={formData.serialNumber}
                      onChange={handleChange}
                      placeholder="Ej: SN123456"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Details */}
            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Detalles Adicionales</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Características, especificaciones o notas importantes..."
                    rows={4}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Ej: Aula 101"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Precio de Compra
                    </label>
                    <input
                      type="number"
                      name="purchasePrice"
                      value={formData.purchasePrice}
                      onChange={handleChange}
                      placeholder="Ej: 500.00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Fecha de Compra
                  </label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Componentes */}
            <div className="border-t border-border pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">Componentes</h2>
                {!showComponentForm && (
                  <Button
                    type="button"
                    onClick={() => setShowComponentForm(true)}
                    variant="outline"
                    size="sm"
                    className="flex gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Componente
                  </Button>
                )}
              </div>

              {showComponentForm && (
                <div className="bg-muted border border-border rounded-lg p-4 mb-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nombre del Componente
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newComponent.name}
                      onChange={handleComponentChange}
                      placeholder="Ej: RAM DDR4 16GB"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tipo de Componente
                    </label>
                    <select
                      name="type"
                      value={newComponent.type}
                      onChange={handleComponentChange}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Selecciona un tipo...</option>
                      {COMPONENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowComponentForm(false)
                        setNewComponent({ name: '', type: '' })
                      }}
                      className="border-border hover:bg-muted"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="button"
                      onClick={addComponent}
                      className="bg-primary hover:bg-blue-600 text-primary-foreground"
                    >
                      Agregar
                    </Button>
                  </div>
                </div>
              )}

              {components.length > 0 && (
                <div className="space-y-2">
                  {components.map((comp) => (
                    <div
                      key={comp.id}
                      className="flex justify-between items-center bg-muted border border-border rounded-lg p-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{comp.name}</p>
                        <p className="text-xs text-muted-foreground">{comp.type}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeComponent(comp.id)}
                        className="p-1 hover:bg-destructive/20 rounded-lg text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-border pt-6 flex gap-4 justify-end">
              <Link href="/dashboard/equipment">
                <Button variant="outline" className="border-border hover:bg-muted">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-blue-600 text-primary-foreground"
              >
                {loading ? 'Guardando...' : 'Guardar Equipo'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
