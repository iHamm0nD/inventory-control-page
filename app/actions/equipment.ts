'use server'

import { db } from '@/lib/db'
import { equipment, component, maintenance, hardwareChange, equipmentHistory } from '@/lib/db/schema'
import { and, eq, desc, gte, lte } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'
import { mockEquipment, mockComponents, mockMaintenance, mockHardwareChanges } from '@/lib/mock-data'

// Use a demo user ID for development
const DEMO_USER_ID = 'demo-user-001'

// In-memory storage for new records (development only)
let newMaintenanceRecords: any[] = []
let newHardwareChanges: any[] = []

function getUserId() {
  return DEMO_USER_ID
}

// ============= Equipment CRUD =============
export async function createEquipment(data: {
  name: string
  type: string
  model?: string
  serialNumber?: string
  description?: string
  location?: string
  purchaseDate?: Date
  purchasePrice?: number
}) {
  const userId = getUserId()

  const newEquipment = {
    id: uuidv4(),
    userId,
    name: data.name,
    type: data.type,
    model: data.model,
    serialNumber: data.serialNumber,
    description: data.description,
    location: data.location,
    purchaseDate: data.purchaseDate,
    purchasePrice: data.purchasePrice ? data.purchasePrice.toString() : undefined,
    status: 'activo',
  }

  await db.insert(equipment).values(newEquipment)
  revalidatePath('/dashboard/equipment')
  return newEquipment
}

export async function updateEquipment(id: string, data: Partial<typeof equipment.$inferInsert>) {
  const userId = getUserId()

  await db
    .update(equipment)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(equipment.id, id), eq(equipment.userId, userId)))

  revalidatePath('/dashboard/equipment')
}

export async function deleteEquipment(id: string) {
  const userId = getUserId()

  await db.delete(equipment).where(and(eq(equipment.id, id), eq(equipment.userId, userId)))

  revalidatePath('/dashboard/equipment')
}

export async function getEquipmentList() {
  // Return mock equipment data for development
  return mockEquipment.map(eq => ({
    id: eq.id,
    userId: 'demo-user-001',
    name: eq.name,
    type: eq.type,
    model: eq.model,
    serialNumber: eq.serialNumber,
    description: eq.type,
    location: eq.location,
    purchaseDate: eq.purchaseDate,
    purchasePrice: eq.purchasePrice?.toString(),
    status: eq.status,
    createdAt: eq.purchaseDate || new Date(),
    updatedAt: new Date(),
    lastMaintenanceDate: null,
  }))
}

export async function getEquipmentById(id: string) {
  // Return mock equipment by ID for development
  const eq_item = mockEquipment.find(e => e.id === id)
  
  if (!eq_item) throw new Error('Equipment not found')
  
  return {
    id: eq_item.id,
    userId: 'demo-user-001',
    name: eq_item.name,
    type: eq_item.type,
    model: eq_item.model,
    serialNumber: eq_item.serialNumber,
    description: eq_item.type,
    location: eq_item.location,
    purchaseDate: eq_item.purchaseDate,
    purchasePrice: eq_item.purchasePrice?.toString(),
    status: eq_item.status,
    createdAt: eq_item.purchaseDate || new Date(),
    updatedAt: new Date(),
    lastMaintenanceDate: null,
  }
}

// ============= Component Management =============
export async function addComponent(equipmentId: string, data: {
  name: string
  componentType: string
  model?: string
  serialNumber?: string
  specifications?: string
  installationDate?: Date
}) {
  const userId = getUserId()

  // Verify equipment exists and belongs to user
  const [eq_item] = await db
    .select()
    .from(equipment)
    .where(and(eq(equipment.id, equipmentId), eq(equipment.userId, userId)))

  if (!eq_item) throw new Error('Equipment not found')

  const newComponent = {
    id: uuidv4(),
    userId,
    equipmentId,
    name: data.name,
    componentType: data.componentType,
    model: data.model,
    serialNumber: data.serialNumber,
    specifications: data.specifications,
    installationDate: data.installationDate,
    status: 'activo',
  }

  await db.insert(component).values(newComponent)
  revalidatePath(`/dashboard/equipment/${equipmentId}`)
  return newComponent
}

export async function getEquipmentComponents(equipmentId: string) {
  // Return mock component data for development
  return mockComponents
    .filter(c => c.equipmentId === equipmentId)
    .map(c => ({
      id: c.id,
      userId: 'demo-user-001',
      equipmentId: c.equipmentId,
      name: c.name,
      componentType: c.type,
      model: c.name,
      serialNumber: '',
      specifications: '',
      installationDate: new Date(),
      status: 'activo',
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
}

export async function deleteComponent(componentId: string) {
  const userId = getUserId()

  await db.delete(component).where(and(eq(component.id, componentId), eq(component.userId, userId)))

  revalidatePath('/dashboard/equipment')
}

// ============= Maintenance & Hardware Changes =============
export async function recordMaintenance(data: {
  equipmentId: string
  maintenanceType: 'preventivo' | 'correctivo' | 'repotenciacion'
  description?: string
  performedBy?: string
  startDate: Date
  endDate?: Date
  cost?: number
  notes?: string
}) {
  // Store maintenance record in memory for development
  const newMaintenance = {
    id: uuidv4(),
    userId: DEMO_USER_ID,
    equipmentId: data.equipmentId,
    maintenanceType: data.maintenanceType,
    description: data.description,
    performedBy: data.performedBy,
    startDate: data.startDate,
    endDate: data.endDate,
    cost: data.cost ? data.cost.toString() : undefined,
    notes: data.notes,
  }

  newMaintenanceRecords.push(newMaintenance)
  revalidatePath(`/dashboard/equipment/${data.equipmentId}`)
  return newMaintenance
}

export async function getEquipmentMaintenance(equipmentId: string) {
  // Return mock maintenance data for development
  if (!equipmentId) {
    // Return all maintenance records (mock + new)
    const allMaintenance = [...mockMaintenance, ...newMaintenanceRecords]
    return allMaintenance.map(m => ({
      id: m.id,
      userId: 'demo-user-001',
      equipmentId: m.equipmentId,
      maintenanceType: m.maintenanceType || m.type,
      description: m.description,
      performedBy: m.performedBy || m.technician,
      startDate: m.startDate || m.date,
      endDate: m.endDate || null,
      cost: m.cost || '0',
      notes: m.notes,
      createdAt: m.startDate || m.date,
      updatedAt: m.startDate || m.date,
    }))
  }
  
  // Return filtered maintenance data for specific equipment
  return mockMaintenance
    .filter(m => m.equipmentId === equipmentId)
    .map(m => ({
      id: m.id,
      userId: 'demo-user-001',
      equipmentId: m.equipmentId,
      maintenanceType: m.type,
      description: m.description,
      performedBy: m.technician,
      startDate: m.date,
      endDate: null,
      cost: '0',
      notes: m.notes,
      createdAt: m.date,
      updatedAt: m.date,
    }))
}

// ============= Hardware Changes =============
export async function recordHardwareChange(data: {
  maintenanceId: string
  equipmentId: string
  componentId?: string
  action: 'reemplazo' | 'mejora' | 'reparacion'
  oldComponent?: string
  newComponent?: string
  cost?: number
  reason?: string
}) {
  // Store hardware change in memory for development
  const newChange = {
    id: uuidv4(),
    userId: DEMO_USER_ID,
    maintenanceId: data.maintenanceId,
    equipmentId: data.equipmentId,
    componentId: data.componentId,
    action: data.action,
    oldComponent: data.oldComponent,
    newComponent: data.newComponent,
    changeDate: new Date(),
    cost: data.cost ? data.cost.toString() : undefined,
    reason: data.reason,
  }

  newHardwareChanges.push(newChange)
  revalidatePath(`/dashboard/equipment/${data.equipmentId}`)
  return newChange
}

export async function getEquipmentHardwareChanges(equipmentId: string) {
  // Return mock hardware changes for development
  return mockHardwareChanges
    .filter(h => h.equipmentId === equipmentId)
    .map(h => ({
      id: h.id,
      userId: 'demo-user-001',
      maintenanceId: '',
      equipmentId: h.equipmentId,
      componentId: '',
      action: h.changeType,
      oldComponent: h.oldComponent,
      newComponent: h.newComponent,
      changeDate: h.date,
      cost: h.cost?.toString(),
      reason: `Changed from ${h.oldComponent} to ${h.newComponent}`,
      createdAt: h.date,
      updatedAt: h.date,
    }))
}

// ============= Equipment History =============
export async function getEquipmentHistory(equipmentId: string) {
  // Return combined mock maintenance and hardware changes as history
  const maintenanceHistory = newMaintenanceRecords
    .filter(m => m.equipmentId === equipmentId)
    .map(m => ({
      id: m.id,
      eventType: 'mantenimiento',
      description: `Mantenimiento ${m.maintenanceType}: ${m.description}`,
      cost: m.cost,
      eventDate: m.startDate,
    }))

  const hardwareHistory = newHardwareChanges
    .filter(h => h.equipmentId === equipmentId)
    .map(h => ({
      id: h.id,
      eventType: 'cambio_componente',
      description: `${h.action}: ${h.oldComponent} → ${h.newComponent}`,
      cost: h.cost,
      eventDate: h.changeDate,
    }))

  return [...maintenanceHistory, ...hardwareHistory].sort((a, b) => 
    new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
  )
}

// ============= Reports =============
export async function getInventorySummary() {
  // Count equipment by status from mock data
  const active = mockEquipment.filter(e => e.status === 'activo').length
  const inactive = mockEquipment.filter(e => e.status === 'inactivo').length
  const maintenance = mockEquipment.filter(e => e.status === 'mantenimiento').length
  const retired = mockEquipment.filter(e => e.status === 'retirado').length
  
  return {
    total: mockEquipment.length,
    active,
    inactive,
    maintenance,
    retired,
  }
}

export async function getUpgradedEquipment() {
  // Return equipment with hardware changes from mock data and new records
  const allChanges = [...mockHardwareChanges, ...newHardwareChanges]
  const upgradeMap = new Map<string, {
    equipmentId: string
    equipmentName: string
    eventCount: number
    totalCost: number
    lastEvent: Date
  }>()

  allChanges.forEach(change => {
    const equipment = mockEquipment.find(e => e.id === change.equipmentId)
    if (equipment) {
      const key = change.equipmentId
      if (!upgradeMap.has(key)) {
        upgradeMap.set(key, {
          equipmentId: change.equipmentId,
          equipmentName: equipment.name,
          eventCount: 0,
          totalCost: 0,
          lastEvent: change.date,
        })
      }
      const item = upgradeMap.get(key)!
      item.eventCount += 1
      item.totalCost += change.cost || 0
      if (change.date > item.lastEvent) {
        item.lastEvent = change.date
      }
    }
  })

  return Array.from(upgradeMap.values())
}

export async function getMaintenanceCosts() {
  // Return maintenance costs from mock data and new records
  const allMaintenance = [...mockMaintenance, ...newMaintenanceRecords]
  const costMap = new Map<string, {
    equipmentId: string
    equipmentName: string
    totalCost: number
    maintenanceCount: number
  }>()

  allMaintenance.forEach(maint => {
    const equipment = mockEquipment.find(e => e.id === maint.equipmentId)
    if (equipment) {
      const key = maint.equipmentId
      if (!costMap.has(key)) {
        costMap.set(key, {
          equipmentId: maint.equipmentId,
          equipmentName: equipment.name,
          totalCost: 0,
          maintenanceCount: 0,
        })
      }
      const item = costMap.get(key)!
      item.totalCost += parseFloat(maint.cost || '0')
      item.maintenanceCount += 1
    }
  })

  return Array.from(costMap.values()).sort((a, b) => b.totalCost - a.totalCost)
}

export async function getHardwareChangeReport() {
  // Return hardware changes from mock data and new records
  const allChanges = [...mockHardwareChanges, ...newHardwareChanges]
  
  return allChanges.map(hw => ({
    id: hw.id || uuidv4(),
    equipmentId: hw.equipmentId,
    action: hw.changeType || 'reemplazo',
    oldComponent: hw.oldComponent,
    newComponent: hw.newComponent,
    cost: hw.cost?.toString(),
    changeDate: hw.date,
  })).sort((a, b) => new Date(b.changeDate).getTime() - new Date(a.changeDate).getTime())
}
