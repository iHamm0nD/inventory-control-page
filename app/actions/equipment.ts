'use server'

import { db } from '@/lib/db'
import { equipment, component, maintenance, hardwareChange, equipmentHistory } from '@/lib/db/schema'
import { and, eq, desc, gte, lte } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

// Use a demo user ID for development
const DEMO_USER_ID = 'demo-user-001'

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
  const userId = getUserId()

  const result = await db
    .select()
    .from(equipment)
    .where(eq(equipment.userId, userId))
    .orderBy(desc(equipment.createdAt))

  return result
}

export async function getEquipmentById(id: string) {
  const userId = getUserId()

  const [eq_item] = await db
    .select()
    .from(equipment)
    .where(and(eq(equipment.id, id), eq(equipment.userId, userId)))

  if (!eq_item) throw new Error('Equipment not found')
  return eq_item
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
  const userId = getUserId()

  return await db
    .select()
    .from(component)
    .where(and(eq(component.equipmentId, equipmentId), eq(component.userId, userId)))
    .orderBy(desc(component.createdAt))
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
  const userId = getUserId()

  const newMaintenance = {
    id: uuidv4(),
    userId,
    equipmentId: data.equipmentId,
    maintenanceType: data.maintenanceType,
    description: data.description,
    performedBy: data.performedBy,
    startDate: data.startDate,
    endDate: data.endDate,
    cost: data.cost ? data.cost.toString() : undefined,
    notes: data.notes,
  }

  const [result] = await db.insert(maintenance).values(newMaintenance).returning()

  // Update equipment's last maintenance date
  await db
    .update(equipment)
    .set({ lastMaintenanceDate: new Date() })
    .where(and(eq(equipment.id, data.equipmentId), eq(equipment.userId, userId)))

  revalidatePath(`/dashboard/equipment/${data.equipmentId}`)
  return result
}

export async function getEquipmentMaintenance(equipmentId: string) {
  const userId = getUserId()

  return await db
    .select()
    .from(maintenance)
    .where(and(eq(maintenance.equipmentId, equipmentId), eq(maintenance.userId, userId)))
    .orderBy(desc(maintenance.startDate))
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
  const userId = getUserId()

  const newChange = {
    id: uuidv4(),
    userId,
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

  const [result] = await db.insert(hardwareChange).values(newChange).returning()

  // Record in equipment history
  const equipmentComponents = await getEquipmentComponents(data.equipmentId)
  const componentsAfter = JSON.stringify(equipmentComponents.map((c) => ({ id: c.id, name: c.name, type: c.componentType })))

  await db.insert(equipmentHistory).values({
    id: uuidv4(),
    userId,
    equipmentId: data.equipmentId,
    eventType: 'cambio_componente',
    description: `${data.action}: ${data.oldComponent} → ${data.newComponent}`,
    componentsAfter,
    cost: data.cost ? data.cost.toString() : undefined,
    eventDate: new Date(),
  })

  revalidatePath(`/dashboard/equipment/${data.equipmentId}`)
  return result
}

export async function getEquipmentHardwareChanges(equipmentId: string) {
  const userId = getUserId()

  return await db
    .select()
    .from(hardwareChange)
    .where(and(eq(hardwareChange.equipmentId, equipmentId), eq(hardwareChange.userId, userId)))
    .orderBy(desc(hardwareChange.changeDate))
}

// ============= Equipment History =============
export async function getEquipmentHistory(equipmentId: string) {
  const userId = getUserId()

  return await db
    .select()
    .from(equipmentHistory)
    .where(and(eq(equipmentHistory.equipmentId, equipmentId), eq(equipmentHistory.userId, userId)))
    .orderBy(desc(equipmentHistory.eventDate))
}

// ============= Reports =============
export async function getInventorySummary() {
  // Return demo data for development
  return {
    total: 24,
    active: 18,
    inactive: 3,
    maintenance: 2,
    retired: 1,
  }
}

export async function getUpgradedEquipment() {
  const userId = getUserId()

  const upgrades = await db
    .select({
      equipmentId: equipmentHistory.equipmentId,
      equipmentName: equipment.name,
      eventCount: equipmentHistory.id,
      totalCost: equipmentHistory.cost,
      lastEvent: equipmentHistory.eventDate,
    })
    .from(equipmentHistory)
    .innerJoin(equipment, eq(equipmentHistory.equipmentId, equipment.id))
    .where(and(eq(equipmentHistory.userId, userId), eq(equipmentHistory.eventType, 'cambio_componente')))
    .orderBy(desc(equipmentHistory.eventDate))

  return upgrades
}

export async function getMaintenanceCosts() {
  const userId = getUserId()

  return await db
    .select({
      equipmentId: maintenance.equipmentId,
      equipmentName: equipment.name,
      totalCost: maintenance.cost,
      maintenanceCount: maintenance.id,
    })
    .from(maintenance)
    .innerJoin(equipment, eq(maintenance.equipmentId, equipment.id))
    .where(eq(maintenance.userId, userId))
    .orderBy(desc(maintenance.cost))
}

export async function getHardwareChangeReport() {
  const userId = getUserId()

  return await db
    .select()
    .from(hardwareChange)
    .where(eq(hardwareChange.userId, userId))
    .orderBy(desc(hardwareChange.changeDate))
}
