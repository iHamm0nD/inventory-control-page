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
  // PC-LAB-001
  { id: 'c1', equipmentId: '1', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c2', equipmentId: '1', type: 'Storage', name: '512GB NVMe SSD' },
  { id: 'c3', equipmentId: '1', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c4', equipmentId: '1', type: 'PSU', name: '650W 80+ Bronze' },
  
  // PC-LAB-002
  { id: 'c5', equipmentId: '2', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c6', equipmentId: '2', type: 'Storage', name: '512GB NVMe SSD' },
  { id: 'c7', equipmentId: '2', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c8', equipmentId: '2', type: 'Network', name: 'Realtek GigaEthernet' },
  
  // PC-LAB-003
  { id: 'c9', equipmentId: '3', type: 'RAM', name: '8GB DDR4 3200MHz' },
  { id: 'c10', equipmentId: '3', type: 'Storage', name: '256GB SSD' },
  { id: 'c11', equipmentId: '3', type: 'GPU', name: 'Intel UHD Graphics 630' },
  { id: 'c12', equipmentId: '3', type: 'PSU', name: '500W 80+ Bronze' },
  
  // PC-LAB-004
  { id: 'c13', equipmentId: '4', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c14', equipmentId: '4', type: 'Storage', name: '512GB NVMe SSD' },
  { id: 'c15', equipmentId: '4', type: 'GPU', name: 'NVIDIA GeForce GTX 1660' },
  { id: 'c16', equipmentId: '4', type: 'Monitor', name: '24\" Full HD' },
  
  // PC-LAB-005
  { id: 'c17', equipmentId: '5', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c18', equipmentId: '5', type: 'Storage', name: '512GB NVMe SSD' },
  { id: 'c19', equipmentId: '5', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c20', equipmentId: '5', type: 'Cooling', name: 'Noctua NH-D15' },
  
  // PC-LAB-006
  { id: 'c21', equipmentId: '6', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c22', equipmentId: '6', type: 'Storage', name: '512GB NVMe SSD' },
  { id: 'c23', equipmentId: '6', type: 'GPU', name: 'NVIDIA GeForce GTX 1650 Super' },
  { id: 'c24', equipmentId: '6', type: 'PSU', name: '750W 80+ Gold' },
  
  // PC-LAB-007
  { id: 'c25', equipmentId: '7', type: 'RAM', name: '8GB DDR4 3200MHz' },
  { id: 'c26', equipmentId: '7', type: 'Storage', name: '256GB SSD' },
  { id: 'c27', equipmentId: '7', type: 'GPU', name: 'AMD Radeon RX 6500 XT' },
  { id: 'c28', equipmentId: '7', type: 'Network', name: 'Intel GigaEthernet' },
  
  // PC-LAB-008
  { id: 'c29', equipmentId: '8', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c30', equipmentId: '8', type: 'Storage', name: '512GB NVMe SSD' },
  { id: 'c31', equipmentId: '8', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c32', equipmentId: '8', type: 'Sound', name: 'Realtek ALC1200' },
  
  // PC-LAB-009
  { id: 'c33', equipmentId: '9', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c34', equipmentId: '9', type: 'Storage', name: '512GB NVMe SSD' },
  { id: 'c35', equipmentId: '9', type: 'GPU', name: 'NVIDIA GeForce RTX 3060' },
  { id: 'c36', equipmentId: '9', type: 'Optical', name: 'DVD-RW' },
  
  // PC-LAB-010
  { id: 'c37', equipmentId: '10', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c38', equipmentId: '10', type: 'Storage', name: '512GB NVMe SSD' },
  { id: 'c39', equipmentId: '10', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c40', equipmentId: '10', type: 'Cooling', name: 'Corsair H100i' },
  
  // PC-LAB-011
  { id: 'c41', equipmentId: '11', type: 'RAM', name: '16GB DDR4 2933MHz' },
  { id: 'c42', equipmentId: '11', type: 'Storage', name: '512GB SSD M.2' },
  { id: 'c43', equipmentId: '11', type: 'GPU', name: 'Intel UHD Graphics 630' },
  { id: 'c44', equipmentId: '11', type: 'PSU', name: '600W 80+ Bronze' },
  
  // PC-LAB-012
  { id: 'c45', equipmentId: '12', type: 'RAM', name: '32GB DDR4 2933MHz' },
  { id: 'c46', equipmentId: '12', type: 'Storage', name: '1TB NVMe SSD' },
  { id: 'c47', equipmentId: '12', type: 'GPU', name: 'NVIDIA Quadro P2000' },
  { id: 'c48', equipmentId: '12', type: 'Network', name: 'Intel Gigabit Ethernet' },
  
  // PC-LAB-013
  { id: 'c49', equipmentId: '13', type: 'RAM', name: '16GB DDR4 2933MHz' },
  { id: 'c50', equipmentId: '13', type: 'Storage', name: '512GB SSD' },
  { id: 'c51', equipmentId: '13', type: 'GPU', name: 'Intel UHD Graphics 630' },
  { id: 'c52', equipmentId: '13', type: 'Keyboard', name: 'USB Standard Keyboard' },
  
  // PC-LAB-014
  { id: 'c53', equipmentId: '14', type: 'RAM', name: '16GB DDR4 2933MHz' },
  { id: 'c54', equipmentId: '14', type: 'Storage', name: '512GB SSD' },
  { id: 'c55', equipmentId: '14', type: 'GPU', name: 'NVIDIA GeForce MX350' },
  { id: 'c56', equipmentId: '14', type: 'Mouse', name: 'USB Optical Mouse' },
  
  // PC-LAB-015
  { id: 'c57', equipmentId: '15', type: 'RAM', name: '16GB DDR4 2933MHz' },
  { id: 'c58', equipmentId: '15', type: 'Storage', name: '512GB SSD' },
  { id: 'c59', equipmentId: '15', type: 'GPU', name: 'Intel UHD Graphics 630' },
  { id: 'c60', equipmentId: '15', type: 'Monitor', name: '27\" QHD' },
  
  // PC-LAB-016
  { id: 'c61', equipmentId: '16', type: 'RAM', name: '16GB DDR4 2933MHz' },
  { id: 'c62', equipmentId: '16', type: 'Storage', name: '512GB SSD' },
  { id: 'c63', equipmentId: '16', type: 'GPU', name: 'NVIDIA GeForce GTX 1050' },
  { id: 'c64', equipmentId: '16', type: 'PSU', name: '550W 80+ Bronze' },
  
  // PC-LAB-017
  { id: 'c65', equipmentId: '17', type: 'RAM', name: '8GB DDR4 2933MHz' },
  { id: 'c66', equipmentId: '17', type: 'Storage', name: '256GB SSD' },
  { id: 'c67', equipmentId: '17', type: 'GPU', name: 'Intel UHD Graphics 630' },
  { id: 'c68', equipmentId: '17', type: 'Network', name: 'Realtek GigaEthernet' },
  
  // PC-LAB-018
  { id: 'c69', equipmentId: '18', type: 'RAM', name: '16GB DDR4 2933MHz' },
  { id: 'c70', equipmentId: '18', type: 'Storage', name: '512GB SSD' },
  { id: 'c71', equipmentId: '18', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c72', equipmentId: '18', type: 'Cooling', name: 'Stock Intel Fan' },
  
  // PC-LAB-019
  { id: 'c73', equipmentId: '19', type: 'RAM', name: '32GB DDR4 2933MHz' },
  { id: 'c74', equipmentId: '19', type: 'Storage', name: '1TB NVMe SSD' },
  { id: 'c75', equipmentId: '19', type: 'GPU', name: 'NVIDIA RTX 2080 Super' },
  { id: 'c76', equipmentId: '19', type: 'PSU', name: '850W 80+ Platinum' },
  
  // PC-LAB-020
  { id: 'c77', equipmentId: '20', type: 'RAM', name: '16GB DDR4 2933MHz' },
  { id: 'c78', equipmentId: '20', type: 'Storage', name: '512GB SSD' },
  { id: 'c79', equipmentId: '20', type: 'GPU', name: 'Intel UHD Graphics 630' },
  { id: 'c80', equipmentId: '20', type: 'Monitor', name: '24\" Full HD' },
]

export const mockMaintenance = [
  // PC-LAB-001
  { id: 'm1', equipmentId: '1', type: 'preventivo', description: 'Limpieza de ventiladores', date: new Date('2024-01-15'), technician: 'Juan Pérez', notes: 'Cleaned dust filters, thermal paste checked' },
  { id: 'm2', equipmentId: '1', type: 'correctivo', description: 'Reparación de ventilador', date: new Date('2023-11-10'), technician: 'Carlos López', notes: 'CPU fan bearing failure - replaced with new unit' },
  
  // PC-LAB-002
  { id: 'm3', equipmentId: '2', type: 'preventivo', description: 'Actualización de drivers', date: new Date('2024-01-12'), technician: 'Ana Rodríguez', notes: 'Updated GPU and chipset drivers from NVIDIA and Intel' },
  { id: 'm4', equipmentId: '2', type: 'repotenciacion', description: 'Upgrade de RAM', date: new Date('2023-10-20'), technician: 'María García', notes: 'Upgraded from 8GB to 16GB DDR4' },
  
  // PC-LAB-003
  { id: 'm5', equipmentId: '3', type: 'preventivo', description: 'Servicio preventivo', date: new Date('2024-01-08'), technician: 'Juan Pérez', notes: 'Full system cleaning, defragmentation, malware scan' },
  
  // PC-LAB-004
  { id: 'm6', equipmentId: '4', type: 'correctivo', description: 'Cambio de SSD', date: new Date('2023-12-28'), technician: 'Carlos López', notes: 'Primary SSD showed read errors, replaced with new 512GB unit' },
  
  // PC-LAB-005
  { id: 'm7', equipmentId: '5', type: 'preventivo', description: 'Limpieza general', date: new Date('2024-01-05'), technician: 'María García', notes: 'Case cleaning, cable management, thermal check' },
  { id: 'm8', equipmentId: '5', type: 'correctivo', description: 'Reparación de fuente', date: new Date('2023-09-15'), technician: 'Ana Rodríguez', notes: 'PSU capacitor issue - replaced with 650W unit' },
  
  // PC-LAB-006
  { id: 'm9', equipmentId: '6', type: 'preventivo', description: 'Mantenimiento de BIOS', date: new Date('2024-01-03'), technician: 'Juan Pérez', notes: 'Updated BIOS to latest stable version' },
  
  // PC-LAB-007
  { id: 'm10', equipmentId: '7', type: 'repotenciacion', description: 'Upgrade SSD', date: new Date('2023-11-25'), technician: 'Carlos López', notes: 'Storage upgraded from 256GB to 512GB NVMe' },
  
  // PC-LAB-008
  { id: 'm11', equipmentId: '8', type: 'correctivo', description: 'Reemplazo de RAM defectuosa', date: new Date('2023-10-30'), technician: 'María García', notes: 'RAM module showing memory errors, replaced single stick' },
  
  // PC-LAB-009
  { id: 'm12', equipmentId: '9', type: 'preventivo', description: 'Limpieza de radiador', date: new Date('2024-01-02'), technician: 'Ana Rodríguez', notes: 'Cleaned liquid cooler radiator fins, topped off coolant' },
  
  // PC-LAB-010
  { id: 'm13', equipmentId: '10', type: 'repotenciacion', description: 'Instalación GPU', date: new Date('2023-12-15'), technician: 'Juan Pérez', notes: 'Added dedicated GPU upgrade from integrated graphics' },
  { id: 'm14', equipmentId: '10', type: 'preventivo', description: 'Firmware update', date: new Date('2024-01-01'), technician: 'Carlos López', notes: 'GPU firmware update for improved stability' },
  
  // PC-LAB-011
  { id: 'm15', equipmentId: '11', type: 'preventivo', description: 'Verificación general', date: new Date('2024-01-10'), technician: 'María García', notes: 'Full hardware diagnostics, no issues found' },
  
  // PC-LAB-012
  { id: 'm16', equipmentId: '12', type: 'correctivo', description: 'Reparación de conectores', date: new Date('2023-11-18'), technician: 'Ana Rodríguez', notes: 'Faulty SATA connector on motherboard - replaced board' },
  { id: 'm17', equipmentId: '12', type: 'repotenciacion', description: 'Upgrade a 32GB RAM', date: new Date('2023-09-20'), technician: 'Juan Pérez', notes: 'RAM doubled from 16GB to 32GB for better performance' },
  
  // PC-LAB-013
  { id: 'm18', equipmentId: '13', type: 'preventivo', description: 'Limpieza de filtros', date: new Date('2024-01-07'), technician: 'Carlos López', notes: 'Replaced front intake dust filters' },
  
  // PC-LAB-014
  { id: 'm19', equipmentId: '14', type: 'correctivo', description: 'Cambio de batería CMOS', date: new Date('2023-10-12'), technician: 'María García', notes: 'CMOS battery depleted, replaced and reset BIOS' },
  
  // PC-LAB-015
  { id: 'm20', equipmentId: '15', type: 'preventivo', description: 'Secado de condensación', date: new Date('2023-12-20'), technician: 'Ana Rodríguez', notes: 'Removed moisture from case after humidity spike' },
  
  // PC-LAB-016
  { id: 'm21', equipmentId: '16', type: 'correctivo', description: 'Reparación USB', date: new Date('2023-11-05'), technician: 'Juan Pérez', notes: 'Front panel USB ports not working - replaced header' },
  
  // PC-LAB-017
  { id: 'm22', equipmentId: '17', type: 'preventivo', description: 'Actualización de Windows', date: new Date('2023-12-10'), technician: 'Carlos López', notes: 'Applied latest Windows security patches and updates' },
  
  // PC-LAB-018
  { id: 'm23', equipmentId: '18', type: 'repotenciacion', description: 'Upgrade SSD NVMe', date: new Date('2023-08-30'), technician: 'María García', notes: 'Upgraded to faster NVMe SSD for boot performance' },
  
  // PC-LAB-019
  { id: 'm24', equipmentId: '19', type: 'preventivo', description: 'Verificación de rendimiento', date: new Date('2024-01-09'), technician: 'Ana Rodríguez', notes: 'Stress testing and performance benchmarks - all green' },
  
  // PC-LAB-020
  { id: 'm25', equipmentId: '20', type: 'correctivo', description: 'Limpieza de malware', date: new Date('2023-12-05'), technician: 'Juan Pérez', notes: 'Deep scan and removal of PUP programs' },
]

export const mockHardwareChanges = [
  // PC-LAB-001
  { id: 'h1', equipmentId: '1', changeType: 'upgrade', componentType: 'RAM', oldComponent: '8GB DDR4', newComponent: '16GB DDR4', date: new Date('2023-06-10'), cost: 150 },
  { id: 'h2', equipmentId: '1', changeType: 'upgrade', componentType: 'SSD', oldComponent: '256GB SSD', newComponent: '512GB NVMe', date: new Date('2023-08-15'), cost: 80 },
  
  // PC-LAB-002
  { id: 'h3', equipmentId: '2', changeType: 'replacement', componentType: 'PSU', oldComponent: '500W PSU', newComponent: '650W PSU', date: new Date('2023-09-22'), cost: 120 },
  
  // PC-LAB-003
  { id: 'h4', equipmentId: '3', changeType: 'upgrade', componentType: 'RAM', oldComponent: '4GB DDR4', newComponent: '8GB DDR4', date: new Date('2023-07-05'), cost: 100 },
  
  // PC-LAB-004
  { id: 'h5', equipmentId: '4', changeType: 'replacement', componentType: 'Storage', oldComponent: '256GB SSD', newComponent: '512GB NVMe', date: new Date('2023-12-28'), cost: 90 },
  
  // PC-LAB-005
  { id: 'h6', equipmentId: '5', changeType: 'replacement', componentType: 'PSU', oldComponent: '500W PSU', newComponent: '650W PSU', date: new Date('2023-09-15'), cost: 120 },
  
  // PC-LAB-006
  { id: 'h7', equipmentId: '6', changeType: 'upgrade', componentType: 'GPU', oldComponent: 'GTX 1050', newComponent: 'GTX 1650', date: new Date('2023-10-10'), cost: 200 },
  
  // PC-LAB-007
  { id: 'h8', equipmentId: '7', changeType: 'upgrade', componentType: 'Storage', oldComponent: '256GB SSD', newComponent: '512GB NVMe', date: new Date('2023-11-25'), cost: 85 },
  
  // PC-LAB-008
  { id: 'h9', equipmentId: '8', changeType: 'replacement', componentType: 'RAM', oldComponent: '8GB DDR4 (1x8)', newComponent: '8GB DDR4 (1x8)', date: new Date('2023-10-30'), cost: 75 },
  
  // PC-LAB-009
  { id: 'h10', equipmentId: '9', changeType: 'upgrade', componentType: 'CPU Cooler', oldComponent: 'Stock Cooler', newComponent: 'Noctua NH-D15', date: new Date('2023-05-20'), cost: 110 },
  
  // PC-LAB-010
  { id: 'h11', equipmentId: '10', changeType: 'upgrade', componentType: 'GPU', oldComponent: 'UHD 630', newComponent: 'RTX 3060', date: new Date('2023-12-15'), cost: 350 },
  
  // PC-LAB-012
  { id: 'h12', equipmentId: '12', changeType: 'upgrade', componentType: 'RAM', oldComponent: '16GB DDR4', newComponent: '32GB DDR4', date: new Date('2023-09-20'), cost: 200 },
  
  // PC-LAB-014
  { id: 'h13', equipmentId: '14', changeType: 'replacement', componentType: 'CMOS Battery', oldComponent: 'Standard CMOS', newComponent: 'Standard CMOS', date: new Date('2023-10-12'), cost: 15 },
  
  // PC-LAB-016
  { id: 'h14', equipmentId: '16', changeType: 'replacement', componentType: 'USB Header', oldComponent: 'Failed USB Header', newComponent: 'New USB Header', date: new Date('2023-11-05'), cost: 25 },
  
  // PC-LAB-018
  { id: 'h15', equipmentId: '18', changeType: 'upgrade', componentType: 'Storage', oldComponent: '256GB SATA SSD', newComponent: '512GB NVMe SSD', date: new Date('2023-08-30'), cost: 95 },
  
  // PC-LAB-019
  { id: 'h16', equipmentId: '19', changeType: 'upgrade', componentType: 'RAM', oldComponent: '16GB DDR4', newComponent: '32GB DDR4', date: new Date('2023-04-18'), cost: 200 },
]
