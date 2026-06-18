// Mock data for a 50-PC computer lab
export const mockEquipment = [
  // Active workstations (35 PCs)
  { id: '1', name: 'PC-LAB-001', type: 'Workstation', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090001', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 1200 },
  { id: '2', name: 'PC-LAB-002', type: 'Workstation', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090002', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 1200 },
  { id: '3', name: 'PC-LAB-003', type: 'Workstation', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090003', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 1200 },
  { id: '4', name: 'PC-LAB-004', type: 'Workstation', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090004', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 1200 },
  { id: '5', name: 'PC-LAB-005', type: 'Workstation', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090005', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 1200 },
  { id: '6', name: 'PC-LAB-006', type: 'Workstation', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090006', status: 'activo', location: 'Aula A2', purchaseDate: new Date('2022-01-15'), purchasePrice: 1200 },
  { id: '7', name: 'PC-LAB-007', type: 'Workstation', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090007', status: 'activo', location: 'Aula A2', purchaseDate: new Date('2022-01-15'), purchasePrice: 1200 },
  { id: '8', name: 'PC-LAB-008', type: 'Workstation', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090008', status: 'activo', location: 'Aula A2', purchaseDate: new Date('2022-01-15'), purchasePrice: 1200 },
  { id: '9', name: 'PC-LAB-009', type: 'Workstation', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090009', status: 'activo', location: 'Aula A2', purchaseDate: new Date('2022-01-15'), purchasePrice: 1200 },
  { id: '10', name: 'PC-LAB-010', type: 'Workstation', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090010', status: 'activo', location: 'Aula A2', purchaseDate: new Date('2022-01-15'), purchasePrice: 1200 },
  { id: '11', name: 'PC-LAB-011', type: 'Workstation', model: 'HP EliteDesk 800', serialNumber: 'HP800011', status: 'activo', location: 'Aula B1', purchaseDate: new Date('2022-06-10'), purchasePrice: 1350 },
  { id: '12', name: 'PC-LAB-012', type: 'Workstation', model: 'HP EliteDesk 800', serialNumber: 'HP800012', status: 'activo', location: 'Aula B1', purchaseDate: new Date('2022-06-10'), purchasePrice: 1350 },
  { id: '13', name: 'PC-LAB-013', type: 'Workstation', model: 'HP EliteDesk 800', serialNumber: 'HP800013', status: 'activo', location: 'Aula B1', purchaseDate: new Date('2022-06-10'), purchasePrice: 1350 },
  { id: '14', name: 'PC-LAB-014', type: 'Workstation', model: 'HP EliteDesk 800', serialNumber: 'HP800014', status: 'activo', location: 'Aula B1', purchaseDate: new Date('2022-06-10'), purchasePrice: 1350 },
  { id: '15', name: 'PC-LAB-015', type: 'Workstation', model: 'HP EliteDesk 800', serialNumber: 'HP800015', status: 'activo', location: 'Aula B1', purchaseDate: new Date('2022-06-10'), purchasePrice: 1350 },
  { id: '16', name: 'PC-LAB-016', type: 'Workstation', model: 'HP EliteDesk 800', serialNumber: 'HP800016', status: 'activo', location: 'Aula B2', purchaseDate: new Date('2022-06-10'), purchasePrice: 1350 },
  { id: '17', name: 'PC-LAB-017', type: 'Workstation', model: 'HP EliteDesk 800', serialNumber: 'HP800017', status: 'activo', location: 'Aula B2', purchaseDate: new Date('2022-06-10'), purchasePrice: 1350 },
  { id: '18', name: 'PC-LAB-018', type: 'Workstation', model: 'HP EliteDesk 800', serialNumber: 'HP800018', status: 'activo', location: 'Aula B2', purchaseDate: new Date('2022-06-10'), purchasePrice: 1350 },
  { id: '19', name: 'PC-LAB-019', type: 'Workstation', model: 'HP EliteDesk 800', serialNumber: 'HP800019', status: 'activo', location: 'Aula B2', purchaseDate: new Date('2022-06-10'), purchasePrice: 1350 },
  { id: '20', name: 'PC-LAB-020', type: 'Workstation', model: 'HP EliteDesk 800', serialNumber: 'HP800020', status: 'activo', location: 'Aula B2', purchaseDate: new Date('2022-06-10'), purchasePrice: 1350 },
  { id: '21', name: 'PC-LAB-021', type: 'Workstation', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90021', status: 'activo', location: 'Aula C1', purchaseDate: new Date('2023-03-20'), purchasePrice: 1100 },
  { id: '22', name: 'PC-LAB-022', type: 'Workstation', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90022', status: 'activo', location: 'Aula C1', purchaseDate: new Date('2023-03-20'), purchasePrice: 1100 },
  { id: '23', name: 'PC-LAB-023', type: 'Workstation', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90023', status: 'activo', location: 'Aula C1', purchaseDate: new Date('2023-03-20'), purchasePrice: 1100 },
  { id: '24', name: 'PC-LAB-024', type: 'Workstation', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90024', status: 'activo', location: 'Aula C1', purchaseDate: new Date('2023-03-20'), purchasePrice: 1100 },
  { id: '25', name: 'PC-LAB-025', type: 'Workstation', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90025', status: 'activo', location: 'Aula C1', purchaseDate: new Date('2023-03-20'), purchasePrice: 1100 },
  { id: '26', name: 'PC-LAB-026', type: 'Workstation', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90026', status: 'activo', location: 'Aula C2', purchaseDate: new Date('2023-03-20'), purchasePrice: 1100 },
  { id: '27', name: 'PC-LAB-027', type: 'Workstation', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90027', status: 'activo', location: 'Aula C2', purchaseDate: new Date('2023-03-20'), purchasePrice: 1100 },
  { id: '28', name: 'PC-LAB-028', type: 'Workstation', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90028', status: 'activo', location: 'Aula C2', purchaseDate: new Date('2023-03-20'), purchasePrice: 1100 },
  { id: '29', name: 'PC-LAB-029', type: 'Workstation', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90029', status: 'activo', location: 'Aula C2', purchaseDate: new Date('2023-03-20'), purchasePrice: 1100 },
  { id: '30', name: 'PC-LAB-030', type: 'Workstation', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90030', status: 'activo', location: 'Aula C2', purchaseDate: new Date('2023-03-20'), purchasePrice: 1100 },
  { id: '31', name: 'PC-LAB-031', type: 'Workstation', model: 'ASUS VivoPC', serialNumber: 'ASUS31', status: 'activo', location: 'Laboratorio D', purchaseDate: new Date('2023-08-05'), purchasePrice: 950 },
  { id: '32', name: 'PC-LAB-032', type: 'Workstation', model: 'ASUS VivoPC', serialNumber: 'ASUS32', status: 'activo', location: 'Laboratorio D', purchaseDate: new Date('2023-08-05'), purchasePrice: 950 },
  { id: '33', name: 'PC-LAB-033', type: 'Workstation', model: 'ASUS VivoPC', serialNumber: 'ASUS33', status: 'activo', location: 'Laboratorio D', purchaseDate: new Date('2023-08-05'), purchasePrice: 950 },
  { id: '34', name: 'PC-LAB-034', type: 'Workstation', model: 'ASUS VivoPC', serialNumber: 'ASUS34', status: 'activo', location: 'Laboratorio D', purchaseDate: new Date('2023-08-05'), purchasePrice: 950 },
  { id: '35', name: 'PC-LAB-035', type: 'Workstation', model: 'ASUS VivoPC', serialNumber: 'ASUS35', status: 'activo', location: 'Laboratorio D', purchaseDate: new Date('2023-08-05'), purchasePrice: 950 },

  // Inactive/Standby (8 PCs)
  { id: '36', name: 'PC-LAB-036', type: 'Workstation', model: 'Dell OptiPlex 5090', serialNumber: 'DL5090036', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2021-05-12'), purchasePrice: 950 },
  { id: '37', name: 'PC-LAB-037', type: 'Workstation', model: 'Dell OptiPlex 5090', serialNumber: 'DL5090037', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2021-05-12'), purchasePrice: 950 },
  { id: '38', name: 'PC-LAB-038', type: 'Workstation', model: 'HP ProDesk 400', serialNumber: 'HP400038', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2021-11-08'), purchasePrice: 850 },
  { id: '39', name: 'PC-LAB-039', type: 'Workstation', model: 'HP ProDesk 400', serialNumber: 'HP400039', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2021-11-08'), purchasePrice: 850 },
  { id: '40', name: 'PC-LAB-040', type: 'Workstation', model: 'Lenovo ThinkCentre M70', serialNumber: 'LEN70040', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2020-09-03'), purchasePrice: 900 },
  { id: '41', name: 'PC-LAB-041', type: 'Workstation', model: 'Lenovo ThinkCentre M70', serialNumber: 'LEN70041', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2020-09-03'), purchasePrice: 900 },
  { id: '42', name: 'PC-LAB-042', type: 'Server', model: 'Dell PowerEdge R640', serialNumber: 'DLPE640042', status: 'inactivo', location: 'Sala de Servidores', purchaseDate: new Date('2020-02-15'), purchasePrice: 4500 },
  { id: '43', name: 'PC-LAB-043', type: 'Workstation', model: 'ASUS VivoPC', serialNumber: 'ASUS43', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2022-12-10'), purchasePrice: 950 },

  // Under Maintenance (4 PCs)
  { id: '44', name: 'PC-LAB-044', type: 'Workstation', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090044', status: 'mantenimiento', location: 'Taller de Reparación', purchaseDate: new Date('2022-01-15'), purchasePrice: 1200, maintenanceReason: 'Cambio de disco duro' },
  { id: '45', name: 'PC-LAB-045', type: 'Workstation', model: 'HP EliteDesk 800', serialNumber: 'HP800045', status: 'mantenimiento', location: 'Taller de Reparación', purchaseDate: new Date('2022-06-10'), purchasePrice: 1350, maintenanceReason: 'Actualización de RAM' },
  { id: '46', name: 'PC-LAB-046', type: 'Workstation', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90046', status: 'mantenimiento', location: 'Taller de Reparación', purchaseDate: new Date('2023-03-20'), purchasePrice: 1100, maintenanceReason: 'Limpieza y servicio preventivo' },
  { id: '47', name: 'PC-LAB-047', type: 'Workstation', model: 'ASUS VivoPC', serialNumber: 'ASUS47', status: 'mantenimiento', location: 'Taller de Reparación', purchaseDate: new Date('2023-08-05'), purchasePrice: 950, maintenanceReason: 'Reparación de motherboard' },

  // Retired (3 PCs)
  { id: '48', name: 'PC-LAB-048', type: 'Workstation', model: 'Dell OptiPlex 3090', serialNumber: 'DL3090048', status: 'retirado', location: 'Depósito', purchaseDate: new Date('2018-07-20'), purchasePrice: 700, retirementReason: 'Obsoleto - Sin soporte' },
  { id: '49', name: 'PC-LAB-049', type: 'Workstation', model: 'HP ProDesk 290', serialNumber: 'HP290049', status: 'retirado', location: 'Depósito', purchaseDate: new Date('2017-11-15'), purchasePrice: 650, retirementReason: 'Fin de ciclo de vida' },
  { id: '50', name: 'PC-LAB-050', type: 'Workstation', model: 'Lenovo ThinkCentre M50', serialNumber: 'LEN50050', status: 'retirado', location: 'Depósito', purchaseDate: new Date('2016-04-10'), purchasePrice: 600, retirementReason: 'Reemplazo por modelo actual' },
]

export const mockComponents = [
  // Components for active PCs
  { id: 'c1', equipmentId: '1', type: 'RAM', name: '16GB DDR4', quantity: 2 },
  { id: 'c2', equipmentId: '1', type: 'Storage', name: '512GB SSD', quantity: 1 },
  { id: 'c3', equipmentId: '2', type: 'RAM', name: '16GB DDR4', quantity: 2 },
  { id: 'c4', equipmentId: '2', type: 'Storage', name: '512GB SSD', quantity: 1 },
  { id: 'c5', equipmentId: '3', type: 'RAM', name: '16GB DDR4', quantity: 2 },
  { id: 'c6', equipmentId: '3', type: 'Storage', name: '512GB SSD', quantity: 1 },
]

export const mockMaintenance = [
  { id: 'm1', equipmentId: '44', type: 'preventivo', description: 'Cambio de disco duro', date: new Date('2024-01-10'), technician: 'Juan Pérez', notes: 'Disk failed, replaced with new SSD' },
  { id: 'm2', equipmentId: '45', type: 'correctivo', description: 'Actualización de RAM', date: new Date('2024-01-15'), technician: 'María García', notes: 'Upgraded from 8GB to 16GB' },
  { id: 'm3', equipmentId: '1', type: 'preventivo', description: 'Limpieza y servicio', date: new Date('2023-12-20'), technician: 'Carlos López', notes: 'Routine maintenance - cleaning and software updates' },
  { id: 'm4', equipmentId: '11', type: 'preventivo', description: 'Actualización de drivers', date: new Date('2023-11-15'), technician: 'Ana Rodríguez', notes: 'Updated all drivers and BIOS' },
]

export const mockHardwareChanges = [
  { id: 'h1', equipmentId: '1', changeType: 'upgrade', componentType: 'RAM', oldComponent: '8GB DDR4', newComponent: '16GB DDR4', date: new Date('2023-06-10'), cost: 150 },
  { id: 'h2', equipmentId: '12', changeType: 'replacement', componentType: 'Storage', oldComponent: '256GB SSD', newComponent: '512GB SSD', date: new Date('2023-09-20'), cost: 80 },
  { id: 'h3', equipmentId: '20', changeType: 'upgrade', componentType: 'RAM', oldComponent: '8GB DDR4', newComponent: '16GB DDR4', date: new Date('2023-07-05'), cost: 150 },
]
