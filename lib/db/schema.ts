import { pgTable, text, timestamp, boolean, decimal, bigint, index } from 'drizzle-orm/pg-core'

// ============= Better Auth Tables (Required) =============
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refreshToken: text('refreshToken'),
  accessToken: text('accessToken'),
  expiresAt: bigint('expiresAt', { mode: 'number' }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// ============= Equipment Management Tables =============
export const equipment = pgTable(
  'equipment',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    name: text('name').notNull(),
    type: text('type').notNull(), // e.g., 'Desktop', 'Laptop', 'Server', 'Monitor', 'Switch'
    model: text('model'),
    serialNumber: text('serialNumber').unique(),
    description: text('description'),
    status: text('status').notNull().default('activo'), // activo, inactivo, mantenimiento, retirado
    location: text('location'),
    purchaseDate: timestamp('purchaseDate'),
    purchasePrice: decimal('purchasePrice', { precision: 10, scale: 2 }),
    lastMaintenanceDate: timestamp('lastMaintenanceDate'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_equipment_userId').on(table.userId),
    statusIdx: index('idx_equipment_status').on(table.status),
  })
)

export const component = pgTable(
  'component',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    equipmentId: text('equipmentId')
      .notNull()
      .references(() => equipment.id, { onDelete: 'cascade' }),
    name: text('name').notNull(), // e.g., 'RAM', 'SSD', 'Power Supply'
    componentType: text('componentType').notNull(),
    model: text('model'),
    serialNumber: text('serialNumber'),
    specifications: text('specifications'), // JSON string with specs
    installationDate: timestamp('installationDate'),
    replacementDate: timestamp('replacementDate'),
    status: text('status').notNull().default('activo'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_component_userId').on(table.userId),
    equipmentIdIdx: index('idx_component_equipmentId').on(table.equipmentId),
  })
)

// ============= Maintenance Records =============
export const maintenance = pgTable(
  'maintenance',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    equipmentId: text('equipmentId')
      .notNull()
      .references(() => equipment.id, { onDelete: 'cascade' }),
    maintenanceType: text('maintenanceType').notNull(), // 'preventivo', 'correctivo', 'repotenciacion'
    description: text('description'),
    performedBy: text('performedBy'),
    startDate: timestamp('startDate').notNull(),
    endDate: timestamp('endDate'),
    cost: decimal('cost', { precision: 10, scale: 2 }),
    notes: text('notes'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_maintenance_userId').on(table.userId),
    equipmentIdIdx: index('idx_maintenance_equipmentId').on(table.equipmentId),
    startDateIdx: index('idx_maintenance_startDate').on(table.startDate),
  })
)

// ============= Hardware Changes (for tracking upgrades/replacements) =============
export const hardwareChange = pgTable(
  'hardware_change',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    maintenanceId: text('maintenanceId')
      .notNull()
      .references(() => maintenance.id, { onDelete: 'cascade' }),
    equipmentId: text('equipmentId')
      .notNull()
      .references(() => equipment.id, { onDelete: 'cascade' }),
    componentId: text('componentId').references(() => component.id, { onDelete: 'set null' }),
    action: text('action').notNull(), // 'reemplazo', 'mejora', 'reparacion'
    oldComponent: text('oldComponent'), // Description of old component
    newComponent: text('newComponent'), // Description of new component
    changeDate: timestamp('changeDate').notNull(),
    cost: decimal('cost', { precision: 10, scale: 2 }),
    reason: text('reason'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_hardware_change_userId').on(table.userId),
    equipmentIdIdx: index('idx_hardware_change_equipmentId').on(table.equipmentId),
  })
)

// ============= Equipment History (for lifecycle tracking) =============
export const equipmentHistory = pgTable(
  'equipment_history',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    equipmentId: text('equipmentId')
      .notNull()
      .references(() => equipment.id, { onDelete: 'cascade' }),
    eventType: text('eventType').notNull(), // 'repotenciacion', 'cambio_componente', 'mantenimiento'
    description: text('description'),
    componentsBefore: text('componentsBefore'), // JSON string
    componentsAfter: text('componentsAfter'), // JSON string
    cost: decimal('cost', { precision: 10, scale: 2 }),
    eventDate: timestamp('eventDate').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_equipment_history_userId').on(table.userId),
    equipmentIdIdx: index('idx_equipment_history_equipmentId').on(table.equipmentId),
  })
)

// ============= Installed Software Management =============
export const installedSoftware = pgTable(
  'installed_software',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    equipmentId: text('equipmentId')
      .notNull()
      .references(() => equipment.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    version: text('version'),
    vendor: text('vendor'),
    licenseType: text('licenseType').notNull(), // 'propietaria', 'libre', 'educativa', 'trial'
    licenseCost: decimal('licenseCost', { precision: 10, scale: 2 }),
    licensesAvailable: bigint('licensesAvailable', { mode: 'number' }),
    installationDate: timestamp('installationDate'),
    expiryDate: timestamp('expiryDate'),
    status: text('status').notNull().default('activo'), // activo, inactivo, vencido
    notes: text('notes'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_software_userId').on(table.userId),
    equipmentIdIdx: index('idx_software_equipmentId').on(table.equipmentId),
    statusIdx: index('idx_software_status').on(table.status),
  })
)

// ============= Subscriptions Management =============
export const subscription = pgTable(
  'subscription',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    name: text('name').notNull(),
    provider: text('provider'),
    type: text('type').notNull(), // 'software', 'servicio', 'soporte', 'nube'
    cost: decimal('cost', { precision: 10, scale: 2 }).notNull(),
    billingFrequency: text('billingFrequency').notNull(), // 'anual', 'mensual', 'trimestral'
    startDate: timestamp('startDate').notNull(),
    renewalDate: timestamp('renewalDate').notNull(),
    status: text('status').notNull().default('activa'), // activa, inactiva, vencida, cancelada
    autoRenewal: boolean('autoRenewal').default(true),
    licenseCount: bigint('licenseCount', { mode: 'number' }),
    licenseUsed: bigint('licenseUsed', { mode: 'number' }).default(0),
    notes: text('notes'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_subscription_userId').on(table.userId),
    statusIdx: index('idx_subscription_status').on(table.status),
    renewalDateIdx: index('idx_subscription_renewalDate').on(table.renewalDate),
  })
)

// ============= Output Peripherals Management =============
export const outputPeripheral = pgTable(
  'output_peripheral',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    equipmentId: text('equipmentId').references(() => equipment.id, { onDelete: 'set null' }),
    name: text('name').notNull(),
    type: text('type').notNull(), // 'monitor', 'impresora', 'parlantes', 'proyector', 'ploter', 'otro'
    model: text('model'),
    serialNumber: text('serialNumber').unique(),
    vendor: text('vendor'),
    resolution: text('resolution'), // Para monitores (e.g., 1920x1080)
    specs: text('specs'), // Especificaciones adicionales
    status: text('status').notNull().default('activo'), // activo, inactivo, dañado, retirado
    location: text('location'),
    purchaseDate: timestamp('purchaseDate'),
    purchasePrice: decimal('purchasePrice', { precision: 10, scale: 2 }),
    lastMaintenanceDate: timestamp('lastMaintenanceDate'),
    notes: text('notes'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_peripheral_userId').on(table.userId),
    equipmentIdIdx: index('idx_peripheral_equipmentId').on(table.equipmentId),
    statusIdx: index('idx_peripheral_status').on(table.status),
  })
)

// ============= Issues/Reports Management =============
export const issueReport = pgTable(
  'issue_report',
  {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    equipmentId: text('equipmentId').references(() => equipment.id, { onDelete: 'set null' }),
    title: text('title').notNull(),
    description: text('description').notNull(),
    category: text('category').notNull(), // 'hardware', 'software', 'red', 'perimetral', 'otro'
    priority: text('priority').notNull().default('media'), // 'baja', 'media', 'alta', 'critica'
    status: text('status').notNull().default('abierto'), // 'abierto', 'en_progreso', 'resuelto', 'cerrado'
    reportedBy: text('reportedBy'),
    assignedTo: text('assignedTo'),
    resolution: text('resolution'),
    resolution_date: timestamp('resolution_date'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_report_userId').on(table.userId),
    equipmentIdIdx: index('idx_report_equipmentId').on(table.equipmentId),
    statusIdx: index('idx_report_status').on(table.status),
    priorityIdx: index('idx_report_priority').on(table.priority),
  })
)
