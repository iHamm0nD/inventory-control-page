'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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

interface EquipmentTableProps {
  equipment: Equipment[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const statusColors: Record<string, string> = {
  activo: 'bg-green-500/20 text-green-200',
  inactivo: 'bg-gray-500/20 text-gray-200',
  mantenimiento: 'bg-yellow-500/20 text-yellow-200',
  retirado: 'bg-red-500/20 text-red-200',
}

export function EquipmentTable({ equipment, onEdit, onDelete }: EquipmentTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === equipment.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(equipment.map((e) => e.id)))
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-8 pl-4">
              <input
                type="checkbox"
                checked={selectedIds.size === equipment.length && equipment.length > 0}
                onChange={toggleSelectAll}
                className="rounded border-border cursor-pointer"
              />
            </TableHead>
            <TableHead>Equipo</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Serie</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Último Mantenimiento</TableHead>
            <TableHead className="text-right pr-4">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No hay equipos registrados. Agrega uno nuevo para comenzar.
              </TableCell>
            </TableRow>
          ) : (
            equipment.map((item) => (
              <TableRow
                key={item.id}
                className={`border-border hover:bg-muted/50 cursor-pointer ${selectedIds.has(item.id) ? 'bg-muted/30' : ''}`}
              >
                <TableCell className="pl-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="rounded border-border cursor-pointer"
                  />
                </TableCell>
                <TableCell className="font-semibold text-foreground">
                  <Link href={`/dashboard/equipment/${item.id}`} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.type}</TableCell>
                <TableCell className="text-muted-foreground">{item.model || '-'}</TableCell>
                <TableCell className="text-muted-foreground text-sm font-mono">{item.serialNumber || '-'}</TableCell>
                <TableCell>
                  <Badge className={statusColors[item.status] || 'bg-gray-500/20 text-gray-200'}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.location || '-'}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {item.lastMaintenanceDate
                    ? new Date(item.lastMaintenanceDate).toLocaleDateString('es-MX')
                    : 'Sin registros'}
                </TableCell>
                <TableCell className="text-right pr-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit?.(item.id)}
                      className="hover:bg-muted"
                    >
                      Ver
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete?.(item.id)}
                      className="hover:bg-destructive/20 hover:text-destructive"
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
