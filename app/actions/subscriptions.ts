'use server'

import { v4 as uuidv4 } from 'uuid'
import { mockSubscriptions } from '@/lib/mock-data'

const DEMO_USER_ID = 'demo-user-001'

// In-memory storage for new records (development only)
let newSubscriptionRecords: any[] = []

function getUserId() {
  return DEMO_USER_ID
}

export async function getSubscriptionsList() {
  return [...mockSubscriptions, ...newSubscriptionRecords]
}

export async function getSubscriptionsStats() {
  const subs = await getSubscriptionsList()
  
  const total = subs.length
  const active = subs.filter(s => s.status === 'activa').length
  const totalCost = subs.reduce((acc, s) => acc + (Number(s.cost) || 0), 0)
  const expiringSoon = subs.filter(s => {
    const renewalDate = new Date(s.renewalDate)
    const daysUntilRenewal = Math.ceil((renewalDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilRenewal <= 30 && daysUntilRenewal > 0
  }).length

  return { total, active, totalCost, expiringSoon }
}

export async function createSubscription(data: {
  name: string
  provider?: string
  type: string
  cost: number
  billingFrequency: string
  startDate: Date
  renewalDate: Date
  status?: string
  autoRenewal?: boolean
  licenseCount?: number
  licenseUsed?: number
  notes?: string
}) {
  const userId = getUserId()

  const newSubscription = {
    id: uuidv4(),
    userId,
    name: data.name,
    provider: data.provider || '',
    type: data.type,
    cost: data.cost,
    billingFrequency: data.billingFrequency,
    startDate: data.startDate,
    renewalDate: data.renewalDate,
    status: data.status || 'activa',
    autoRenewal: data.autoRenewal ?? true,
    licenseCount: data.licenseCount || 1,
    licenseUsed: data.licenseUsed || 0,
    notes: data.notes || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  newSubscriptionRecords.push(newSubscription)
  return newSubscription
}

export async function updateSubscription(id: string, data: Partial<any>) {
  const index = newSubscriptionRecords.findIndex(s => s.id === id)
  if (index !== -1) {
    newSubscriptionRecords[index] = {
      ...newSubscriptionRecords[index],
      ...data,
      updatedAt: new Date(),
    }
    return newSubscriptionRecords[index]
  }

  const mockIndex = mockSubscriptions.findIndex(s => s.id === id)
  if (mockIndex !== -1) {
    return {
      ...mockSubscriptions[mockIndex],
      ...data,
      updatedAt: new Date(),
    }
  }
}

export async function deleteSubscription(id: string) {
  const index = newSubscriptionRecords.findIndex(s => s.id === id)
  if (index !== -1) {
    newSubscriptionRecords.splice(index, 1)
    return true
  }
  return false
}
