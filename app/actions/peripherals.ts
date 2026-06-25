'use server'

import { v4 as uuidv4 } from 'uuid'
import { mockOutputPeripherals } from '@/lib/mock-data'

const DEMO_USER_ID = 'demo-user-001'

// In-memory storage for new records (development only)
let newPeripheralRecords: any[] = []

function getUserId() {
  return DEMO_USER_ID
}

export async function getOutputPeripheralsList() {
  return [...mockOutputPeripherals, ...newPeripheralRecords]
}

export async function getPeripheralsByEquipmentId(equipmentId: string) {
  const allPeripherals = await getOutputPeripheralsList()
  return allPeripherals.filter(p => p.equipmentId === equipmentId)
}

export async function getPeripheralsStats() {
  const peripherals = await getOutputPeripheralsList()
  
  const total = peripherals.length
  const active = peripherals.filter(p => p.status === 'activo').length
  const byType = peripherals.reduce((acc: any, p: any) => {
    acc[p.type] = (acc[p.type] || 0) + 1
    return acc
  }, {})

  return { total, active, byType }
}

export async function createOutputPeripheral(data: {
  equipmentId?: string
  name: string
  type: string
  model?: string
  serialNumber?: string
  vendor?: string
  resolution?: string
  specs?: string
  status?: string
  location?: string
  purchaseDate?: Date
  purchasePrice?: number
  notes?: string
}) {
  const userId = getUserId()

  const newPeripheral = {
    id: uuidv4(),
    userId,
    equipmentId: data.equipmentId || null,
    name: data.name,
    type: data.type,
    model: data.model || '',
    serialNumber: data.serialNumber || '',
    vendor: data.vendor || '',
    resolution: data.resolution || '',
    specs: data.specs || '',
    status: data.status || 'activo',
    location: data.location || '',
    purchaseDate: data.purchaseDate,
    purchasePrice: data.purchasePrice || 0,
    lastMaintenanceDate: null,
    notes: data.notes || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  newPeripheralRecords.push(newPeripheral)
  return newPeripheral
}

export async function updateOutputPeripheral(id: string, data: Partial<any>) {
  const index = newPeripheralRecords.findIndex(p => p.id === id)
  if (index !== -1) {
    newPeripheralRecords[index] = {
      ...newPeripheralRecords[index],
      ...data,
      updatedAt: new Date(),
    }
    return newPeripheralRecords[index]
  }

  const mockIndex = mockOutputPeripherals.findIndex(p => p.id === id)
  if (mockIndex !== -1) {
    return {
      ...mockOutputPeripherals[mockIndex],
      ...data,
      updatedAt: new Date(),
    }
  }
}

export async function deleteOutputPeripheral(id: string) {
  const index = newPeripheralRecords.findIndex(p => p.id === id)
  if (index !== -1) {
    newPeripheralRecords.splice(index, 1)
    return true
  }
  return false
}
