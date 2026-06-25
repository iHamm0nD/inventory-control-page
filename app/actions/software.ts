'use server'

import { v4 as uuidv4 } from 'uuid'
import { mockInstalledSoftware } from '@/lib/mock-data'

const DEMO_USER_ID = 'demo-user-001'

// In-memory storage for new records (development only)
let newSoftwareRecords: any[] = []

function getUserId() {
  return DEMO_USER_ID
}

export async function getInstalledSoftwareList() {
  return [...mockInstalledSoftware, ...newSoftwareRecords]
}

export async function getSoftwareByEquipmentId(equipmentId: string) {
  const allSoftware = await getInstalledSoftwareList()
  return allSoftware.filter(sw => sw.equipmentId === equipmentId)
}

export async function createInstalledSoftware(data: {
  equipmentId: string
  name: string
  version?: string
  vendor?: string
  licenseType: string
  licenseCost?: number
  licensesAvailable?: number
  installationDate?: Date
  expiryDate?: Date
  status?: string
  notes?: string
}) {
  const userId = getUserId()

  const newSoftware = {
    id: uuidv4(),
    userId,
    equipmentId: data.equipmentId,
    name: data.name,
    version: data.version || '',
    vendor: data.vendor || '',
    licenseType: data.licenseType,
    licenseCost: data.licenseCost || 0,
    licensesAvailable: data.licensesAvailable || 1,
    installationDate: data.installationDate || new Date(),
    expiryDate: data.expiryDate,
    status: data.status || 'activo',
    notes: data.notes || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  newSoftwareRecords.push(newSoftware)
  return newSoftware
}

export async function updateInstalledSoftware(id: string, data: Partial<any>) {
  const index = newSoftwareRecords.findIndex(sw => sw.id === id)
  if (index !== -1) {
    newSoftwareRecords[index] = {
      ...newSoftwareRecords[index],
      ...data,
      updatedAt: new Date(),
    }
    return newSoftwareRecords[index]
  }
  
  // Also check mock data
  const mockIndex = mockInstalledSoftware.findIndex(sw => sw.id === id)
  if (mockIndex !== -1) {
    return {
      ...mockInstalledSoftware[mockIndex],
      ...data,
      updatedAt: new Date(),
    }
  }
}

export async function deleteInstalledSoftware(id: string) {
  const index = newSoftwareRecords.findIndex(sw => sw.id === id)
  if (index !== -1) {
    newSoftwareRecords.splice(index, 1)
    return true
  }
  return false
}
