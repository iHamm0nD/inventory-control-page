'use server'

import { v4 as uuidv4 } from 'uuid'
import { mockIssueReports } from '@/lib/mock-data'

const DEMO_USER_ID = 'demo-user-001'

// In-memory storage for new records (development only)
let newIssueRecords: any[] = []

function getUserId() {
  return DEMO_USER_ID
}

export async function getIssueReportsList() {
  return [...mockIssueReports, ...newIssueRecords]
}

export async function getIssuesByStatus(status?: string) {
  const allIssues = await getIssueReportsList()
  if (!status) return allIssues
  return allIssues.filter(i => i.status === status)
}

export async function getIssuesPriority(priority?: string) {
  const allIssues = await getIssueReportsList()
  if (!priority) return allIssues
  return allIssues.filter(i => i.priority === priority)
}

export async function getIssuesStats() {
  const issues = await getIssueReportsList()
  
  const total = issues.length
  const open = issues.filter(i => i.status === 'abierto').length
  const inProgress = issues.filter(i => i.status === 'en_progreso').length
  const resolved = issues.filter(i => i.status === 'resuelto').length
  const closed = issues.filter(i => i.status === 'cerrado').length
  
  const byPriority = {
    baja: issues.filter(i => i.priority === 'baja').length,
    media: issues.filter(i => i.priority === 'media').length,
    alta: issues.filter(i => i.priority === 'alta').length,
    critica: issues.filter(i => i.priority === 'critica').length,
  }

  const byCategory = issues.reduce((acc: any, i: any) => {
    acc[i.category] = (acc[i.category] || 0) + 1
    return acc
  }, {})

  return {
    total,
    open,
    inProgress,
    resolved,
    closed,
    byPriority,
    byCategory,
  }
}

export async function createIssueReport(data: {
  equipmentId?: string
  title: string
  description: string
  category: string
  priority?: string
  reportedBy?: string
  notes?: string
}) {
  const userId = getUserId()

  const newIssue = {
    id: uuidv4(),
    userId,
    equipmentId: data.equipmentId || null,
    title: data.title,
    description: data.description,
    category: data.category,
    priority: data.priority || 'media',
    status: 'abierto',
    reportedBy: data.reportedBy || 'Usuario',
    assignedTo: null,
    resolution: null,
    resolution_date: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  newIssueRecords.push(newIssue)
  return newIssue
}

export async function updateIssueReport(id: string, data: Partial<any>) {
  const index = newIssueRecords.findIndex(i => i.id === id)
  if (index !== -1) {
    newIssueRecords[index] = {
      ...newIssueRecords[index],
      ...data,
      updatedAt: new Date(),
    }
    return newIssueRecords[index]
  }

  const mockIndex = mockIssueReports.findIndex(i => i.id === id)
  if (mockIndex !== -1) {
    return {
      ...mockIssueReports[mockIndex],
      ...data,
      updatedAt: new Date(),
    }
  }
}

export async function deleteIssueReport(id: string) {
  const index = newIssueRecords.findIndex(i => i.id === id)
  if (index !== -1) {
    newIssueRecords.splice(index, 1)
    return true
  }
  return false
}

export async function resolveIssueReport(id: string, resolution: string) {
  const update = await updateIssueReport(id, {
    status: 'resuelto',
    resolution,
    resolution_date: new Date(),
  })
  return update
}

export async function reassignIssueReport(id: string, assignedTo: string) {
  const update = await updateIssueReport(id, {
    assignedTo,
    status: 'en_progreso',
  })
  return update
}
