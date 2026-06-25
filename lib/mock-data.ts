// Datos simulados para laboratorio de 50 computadoras
export const mockEquipment = [
  // Workstations activas (35 PCs) - Precios en Soles Peruanos
  { id: '1', name: 'PC-LAB-001', type: 'Estación de Trabajo', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090001', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 4440 },
  { id: '2', name: 'PC-LAB-002', type: 'Estación de Trabajo', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090002', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 4440 },
  { id: '3', name: 'PC-LAB-003', type: 'Estación de Trabajo', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090003', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 4440 },
  { id: '4', name: 'PC-LAB-004', type: 'Estación de Trabajo', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090004', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 4440 },
  { id: '5', name: 'PC-LAB-005', type: 'Estación de Trabajo', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090005', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 4440 },
  { id: '6', name: 'PC-LAB-006', type: 'Estación de Trabajo', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090006', status: 'activo', location: 'Aula A2', purchaseDate: new Date('2022-01-15'), purchasePrice: 4440 },
  { id: '7', name: 'PC-LAB-007', type: 'Estación de Trabajo', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090007', status: 'activo', location: 'Aula A2', purchaseDate: new Date('2022-01-15'), purchasePrice: 4440 },
  { id: '8', name: 'PC-LAB-008', type: 'Estación de Trabajo', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090008', status: 'activo', location: 'Aula A2', purchaseDate: new Date('2022-01-15'), purchasePrice: 4440 },
  { id: '9', name: 'PC-LAB-009', type: 'Estación de Trabajo', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090009', status: 'activo', location: 'Aula A2', purchaseDate: new Date('2022-01-15'), purchasePrice: 4440 },
  { id: '10', name: 'PC-LAB-010', type: 'Estación de Trabajo', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090010', status: 'activo', location: 'Aula A2', purchaseDate: new Date('2022-01-15'), purchasePrice: 4440 },
  { id: '11', name: 'PC-LAB-011', type: 'Estación de Trabajo', model: 'HP EliteDesk 800', serialNumber: 'HP800011', status: 'activo', location: 'Aula B1', purchaseDate: new Date('2022-06-10'), purchasePrice: 4995 },
  { id: '12', name: 'PC-LAB-012', type: 'Estación de Trabajo', model: 'HP EliteDesk 800', serialNumber: 'HP800012', status: 'activo', location: 'Aula B1', purchaseDate: new Date('2022-06-10'), purchasePrice: 4995 },
  { id: '13', name: 'PC-LAB-013', type: 'Estación de Trabajo', model: 'HP EliteDesk 800', serialNumber: 'HP800013', status: 'activo', location: 'Aula B1', purchaseDate: new Date('2022-06-10'), purchasePrice: 4995 },
  { id: '14', name: 'PC-LAB-014', type: 'Estación de Trabajo', model: 'HP EliteDesk 800', serialNumber: 'HP800014', status: 'activo', location: 'Aula B1', purchaseDate: new Date('2022-06-10'), purchasePrice: 4995 },
  { id: '15', name: 'PC-LAB-015', type: 'Estación de Trabajo', model: 'HP EliteDesk 800', serialNumber: 'HP800015', status: 'activo', location: 'Aula B1', purchaseDate: new Date('2022-06-10'), purchasePrice: 4995 },
  { id: '16', name: 'PC-LAB-016', type: 'Estación de Trabajo', model: 'HP EliteDesk 800', serialNumber: 'HP800016', status: 'activo', location: 'Aula B2', purchaseDate: new Date('2022-06-10'), purchasePrice: 4995 },
  { id: '17', name: 'PC-LAB-017', type: 'Estación de Trabajo', model: 'HP EliteDesk 800', serialNumber: 'HP800017', status: 'activo', location: 'Aula B2', purchaseDate: new Date('2022-06-10'), purchasePrice: 4995 },
  { id: '18', name: 'PC-LAB-018', type: 'Estación de Trabajo', model: 'HP EliteDesk 800', serialNumber: 'HP800018', status: 'activo', location: 'Aula B2', purchaseDate: new Date('2022-06-10'), purchasePrice: 4995 },
  { id: '19', name: 'PC-LAB-019', type: 'Estación de Trabajo', model: 'HP EliteDesk 800', serialNumber: 'HP800019', status: 'activo', location: 'Aula B2', purchaseDate: new Date('2022-06-10'), purchasePrice: 4995 },
  { id: '20', name: 'PC-LAB-020', type: 'Estación de Trabajo', model: 'HP EliteDesk 800', serialNumber: 'HP800020', status: 'activo', location: 'Aula B2', purchaseDate: new Date('2022-06-10'), purchasePrice: 4995 },
  { id: '21', name: 'PC-LAB-021', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90021', status: 'activo', location: 'Aula C1', purchaseDate: new Date('2023-03-20'), purchasePrice: 4070 },
  { id: '22', name: 'PC-LAB-022', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90022', status: 'activo', location: 'Aula C1', purchaseDate: new Date('2023-03-20'), purchasePrice: 4070 },
  { id: '23', name: 'PC-LAB-023', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90023', status: 'activo', location: 'Aula C1', purchaseDate: new Date('2023-03-20'), purchasePrice: 4070 },
  { id: '24', name: 'PC-LAB-024', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90024', status: 'activo', location: 'Aula C1', purchaseDate: new Date('2023-03-20'), purchasePrice: 4070 },
  { id: '25', name: 'PC-LAB-025', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90025', status: 'activo', location: 'Aula C1', purchaseDate: new Date('2023-03-20'), purchasePrice: 4070 },
  { id: '26', name: 'PC-LAB-026', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90026', status: 'activo', location: 'Aula C2', purchaseDate: new Date('2023-03-20'), purchasePrice: 4070 },
  { id: '27', name: 'PC-LAB-027', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90027', status: 'activo', location: 'Aula C2', purchaseDate: new Date('2023-03-20'), purchasePrice: 4070 },
  { id: '28', name: 'PC-LAB-028', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90028', status: 'activo', location: 'Aula C2', purchaseDate: new Date('2023-03-20'), purchasePrice: 4070 },
  { id: '29', name: 'PC-LAB-029', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90029', status: 'activo', location: 'Aula C2', purchaseDate: new Date('2023-03-20'), purchasePrice: 4070 },
  { id: '30', name: 'PC-LAB-030', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90030', status: 'activo', location: 'Aula C2', purchaseDate: new Date('2023-03-20'), purchasePrice: 4070 },
  { id: '31', name: 'PC-LAB-031', type: 'Estación de Trabajo', model: 'ASUS VivoPC', serialNumber: 'ASUS31', status: 'activo', location: 'Laboratorio D', purchaseDate: new Date('2023-08-05'), purchasePrice: 3515 },
  { id: '32', name: 'PC-LAB-032', type: 'Estación de Trabajo', model: 'ASUS VivoPC', serialNumber: 'ASUS32', status: 'activo', location: 'Laboratorio D', purchaseDate: new Date('2023-08-05'), purchasePrice: 3515 },
  { id: '33', name: 'PC-LAB-033', type: 'Estación de Trabajo', model: 'ASUS VivoPC', serialNumber: 'ASUS33', status: 'activo', location: 'Laboratorio D', purchaseDate: new Date('2023-08-05'), purchasePrice: 3515 },
  { id: '34', name: 'PC-LAB-034', type: 'Estación de Trabajo', model: 'ASUS VivoPC', serialNumber: 'ASUS34', status: 'activo', location: 'Laboratorio D', purchaseDate: new Date('2023-08-05'), purchasePrice: 3515 },
  { id: '35', name: 'PC-LAB-035', type: 'Estación de Trabajo', model: 'ASUS VivoPC', serialNumber: 'ASUS35', status: 'activo', location: 'Laboratorio D', purchaseDate: new Date('2023-08-05'), purchasePrice: 3515 },

  // Inactivas/Standby (8 PCs)
  { id: '36', name: 'PC-LAB-036', type: 'Estación de Trabajo', model: 'Dell OptiPlex 5090', serialNumber: 'DL5090036', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2021-05-12'), purchasePrice: 3515 },
  { id: '37', name: 'PC-LAB-037', type: 'Estación de Trabajo', model: 'Dell OptiPlex 5090', serialNumber: 'DL5090037', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2021-05-12'), purchasePrice: 3515 },
  { id: '38', name: 'PC-LAB-038', type: 'Estación de Trabajo', model: 'HP ProDesk 400', serialNumber: 'HP400038', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2021-11-08'), purchasePrice: 3145 },
  { id: '39', name: 'PC-LAB-039', type: 'Estación de Trabajo', model: 'HP ProDesk 400', serialNumber: 'HP400039', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2021-11-08'), purchasePrice: 3145 },
  { id: '40', name: 'PC-LAB-040', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M70', serialNumber: 'LEN70040', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2020-09-03'), purchasePrice: 3330 },
  { id: '41', name: 'PC-LAB-041', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M70', serialNumber: 'LEN70041', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2020-09-03'), purchasePrice: 3330 },
  { id: '42', name: 'PC-LAB-042', type: 'Servidor', model: 'Dell PowerEdge R640', serialNumber: 'DLPE640042', status: 'inactivo', location: 'Sala de Servidores', purchaseDate: new Date('2020-02-15'), purchasePrice: 16650 },
  { id: '43', name: 'PC-LAB-043', type: 'Estación de Trabajo', model: 'ASUS VivoPC', serialNumber: 'ASUS43', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2022-12-10'), purchasePrice: 3515 },

  // En mantenimiento (4 PCs)
  { id: '44', name: 'PC-LAB-044', type: 'Estación de Trabajo', model: 'Dell OptiPlex 7090', serialNumber: 'DL7090044', status: 'mantenimiento', location: 'Taller de Reparación', purchaseDate: new Date('2022-01-15'), purchasePrice: 4440, maintenanceReason: 'Cambio de disco duro' },
  { id: '45', name: 'PC-LAB-045', type: 'Estación de Trabajo', model: 'HP EliteDesk 800', serialNumber: 'HP800045', status: 'mantenimiento', location: 'Taller de Reparación', purchaseDate: new Date('2022-06-10'), purchasePrice: 4995, maintenanceReason: 'Actualización de RAM' },
  { id: '46', name: 'PC-LAB-046', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M90', serialNumber: 'LEN90046', status: 'mantenimiento', location: 'Taller de Reparación', purchaseDate: new Date('2023-03-20'), purchasePrice: 4070, maintenanceReason: 'Limpieza y servicio preventivo' },
  { id: '47', name: 'PC-LAB-047', type: 'Estación de Trabajo', model: 'ASUS VivoPC', serialNumber: 'ASUS47', status: 'mantenimiento', location: 'Taller de Reparación', purchaseDate: new Date('2023-08-05'), purchasePrice: 3515, maintenanceReason: 'Reparación de placa base' },

  // Retiradas (3 PCs)
  { id: '48', name: 'PC-LAB-048', type: 'Estación de Trabajo', model: 'Dell OptiPlex 3090', serialNumber: 'DL3090048', status: 'retirado', location: 'Depósito', purchaseDate: new Date('2018-07-20'), purchasePrice: 2590, retirementReason: 'Obsoleto - Sin soporte' },
  { id: '49', name: 'PC-LAB-049', type: 'Estación de Trabajo', model: 'HP ProDesk 290', serialNumber: 'HP290049', status: 'retirado', location: 'Depósito', purchaseDate: new Date('2017-11-15'), purchasePrice: 2405, retirementReason: 'Fin de ciclo de vida' },
  { id: '50', name: 'PC-LAB-050', type: 'Estación de Trabajo', model: 'Lenovo ThinkCentre M50', serialNumber: 'LEN50050', status: 'retirado', location: 'Depósito', purchaseDate: new Date('2016-04-10'), purchasePrice: 2220, retirementReason: 'Reemplazo por modelo actual' },
]

export const mockComponents = [
  // PC-LAB-001
  { id: 'c1', equipmentId: '1', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c2', equipmentId: '1', type: 'Almacenamiento', name: 'SSD NVMe 512GB' },
  { id: 'c3', equipmentId: '1', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c4', equipmentId: '1', type: 'Fuente', name: 'Fuente 650W 80+ Bronze' },
  
  // PC-LAB-002
  { id: 'c5', equipmentId: '2', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c6', equipmentId: '2', type: 'Almacenamiento', name: 'SSD NVMe 512GB' },
  { id: 'c7', equipmentId: '2', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c8', equipmentId: '2', type: 'Red', name: 'Ethernet Realtek Gigabit' },
  
  // PC-LAB-003
  { id: 'c9', equipmentId: '3', type: 'RAM', name: 'RAM DDR4 8GB 3200MHz' },
  { id: 'c10', equipmentId: '3', type: 'Almacenamiento', name: 'SSD 256GB' },
  { id: 'c11', equipmentId: '3', type: 'GPU', name: 'Gráficos Intel UHD 630' },
  { id: 'c12', equipmentId: '3', type: 'Fuente', name: 'Fuente 500W 80+ Bronze' },
  
  // PC-LAB-004
  { id: 'c13', equipmentId: '4', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c14', equipmentId: '4', type: 'Almacenamiento', name: 'SSD NVMe 512GB' },
  { id: 'c15', equipmentId: '4', type: 'GPU', name: 'NVIDIA GeForce GTX 1660' },
  { id: 'c16', equipmentId: '4', type: 'Monitor', name: 'Monitor 24" Full HD' },
  
  // PC-LAB-005
  { id: 'c17', equipmentId: '5', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c18', equipmentId: '5', type: 'Almacenamiento', name: 'SSD NVMe 512GB' },
  { id: 'c19', equipmentId: '5', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c20', equipmentId: '5', type: 'Refrigeración', name: 'Cooler Noctua NH-D15' },
  
  // PC-LAB-006
  { id: 'c21', equipmentId: '6', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c22', equipmentId: '6', type: 'Almacenamiento', name: 'SSD NVMe 512GB' },
  { id: 'c23', equipmentId: '6', type: 'GPU', name: 'NVIDIA GeForce GTX 1650 Super' },
  { id: 'c24', equipmentId: '6', type: 'Fuente', name: 'Fuente 750W 80+ Gold' },
  
  // PC-LAB-007
  { id: 'c25', equipmentId: '7', type: 'RAM', name: 'RAM DDR4 8GB 3200MHz' },
  { id: 'c26', equipmentId: '7', type: 'Almacenamiento', name: 'SSD 256GB' },
  { id: 'c27', equipmentId: '7', type: 'GPU', name: 'AMD Radeon RX 6500 XT' },
  { id: 'c28', equipmentId: '7', type: 'Red', name: 'Ethernet Intel Gigabit' },
  
  // PC-LAB-008
  { id: 'c29', equipmentId: '8', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c30', equipmentId: '8', type: 'Almacenamiento', name: 'SSD NVMe 512GB' },
  { id: 'c31', equipmentId: '8', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c32', equipmentId: '8', type: 'Audio', name: 'Realtek ALC1200' },
  
  // PC-LAB-009
  { id: 'c33', equipmentId: '9', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c34', equipmentId: '9', type: 'Almacenamiento', name: 'SSD NVMe 512GB' },
  { id: 'c35', equipmentId: '9', type: 'GPU', name: 'NVIDIA GeForce RTX 3060' },
  { id: 'c36', equipmentId: '9', type: 'Óptico', name: 'Grabadora DVD-RW' },
  
  // PC-LAB-010
  { id: 'c37', equipmentId: '10', type: 'RAM', name: '16GB DDR4 3200MHz' },
  { id: 'c38', equipmentId: '10', type: 'Almacenamiento', name: 'SSD NVMe 512GB' },
  { id: 'c39', equipmentId: '10', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c40', equipmentId: '10', type: 'Refrigeración', name: 'Refrigeración Corsair H100i' },
  
  // PC-LAB-011
  { id: 'c41', equipmentId: '11', type: 'RAM', name: 'RAM DDR4 16GB 2933MHz' },
  { id: 'c42', equipmentId: '11', type: 'Almacenamiento', name: 'SSD M.2 512GB' },
  { id: 'c43', equipmentId: '11', type: 'GPU', name: 'Gráficos Intel UHD 630' },
  { id: 'c44', equipmentId: '11', type: 'Fuente', name: 'Fuente 600W 80+ Bronze' },
  
  // PC-LAB-012
  { id: 'c45', equipmentId: '12', type: 'RAM', name: 'RAM DDR4 32GB 2933MHz' },
  { id: 'c46', equipmentId: '12', type: 'Almacenamiento', name: 'SSD NVMe 1TB' },
  { id: 'c47', equipmentId: '12', type: 'GPU', name: 'NVIDIA Quadro P2000' },
  { id: 'c48', equipmentId: '12', type: 'Red', name: 'Ethernet Intel Gigabit' },
  
  // PC-LAB-013
  { id: 'c49', equipmentId: '13', type: 'RAM', name: 'RAM DDR4 16GB 2933MHz' },
  { id: 'c50', equipmentId: '13', type: 'Almacenamiento', name: 'SSD 512GB' },
  { id: 'c51', equipmentId: '13', type: 'GPU', name: 'Gráficos Intel UHD 630' },
  { id: 'c52', equipmentId: '13', type: 'Teclado', name: 'Teclado USB Estándar' },
  
  // PC-LAB-014
  { id: 'c53', equipmentId: '14', type: 'RAM', name: 'RAM DDR4 16GB 2933MHz' },
  { id: 'c54', equipmentId: '14', type: 'Almacenamiento', name: 'SSD 512GB' },
  { id: 'c55', equipmentId: '14', type: 'GPU', name: 'NVIDIA GeForce MX350' },
  { id: 'c56', equipmentId: '14', type: 'Ratón', name: 'Ratón Óptico USB' },
  
  // PC-LAB-015
  { id: 'c57', equipmentId: '15', type: 'RAM', name: 'RAM DDR4 16GB 2933MHz' },
  { id: 'c58', equipmentId: '15', type: 'Almacenamiento', name: 'SSD 512GB' },
  { id: 'c59', equipmentId: '15', type: 'GPU', name: 'Gráficos Intel UHD 630' },
  { id: 'c60', equipmentId: '15', type: 'Monitor', name: 'Monitor 27" QHD' },
  
  // PC-LAB-016
  { id: 'c61', equipmentId: '16', type: 'RAM', name: 'RAM DDR4 16GB 2933MHz' },
  { id: 'c62', equipmentId: '16', type: 'Almacenamiento', name: 'SSD 512GB' },
  { id: 'c63', equipmentId: '16', type: 'GPU', name: 'NVIDIA GeForce GTX 1050' },
  { id: 'c64', equipmentId: '16', type: 'Fuente', name: 'Fuente 550W 80+ Bronze' },
  
  // PC-LAB-017
  { id: 'c65', equipmentId: '17', type: 'RAM', name: 'RAM DDR4 8GB 2933MHz' },
  { id: 'c66', equipmentId: '17', type: 'Almacenamiento', name: 'SSD 256GB' },
  { id: 'c67', equipmentId: '17', type: 'GPU', name: 'Gráficos Intel UHD 630' },
  { id: 'c68', equipmentId: '17', type: 'Red', name: 'Ethernet Realtek Gigabit' },
  
  // PC-LAB-018
  { id: 'c69', equipmentId: '18', type: 'RAM', name: 'RAM DDR4 16GB 2933MHz' },
  { id: 'c70', equipmentId: '18', type: 'Almacenamiento', name: 'SSD 512GB' },
  { id: 'c71', equipmentId: '18', type: 'GPU', name: 'NVIDIA GeForce GTX 1650' },
  { id: 'c72', equipmentId: '18', type: 'Refrigeración', name: 'Ventilador Intel Estándar' },
  
  // PC-LAB-019
  { id: 'c73', equipmentId: '19', type: 'RAM', name: 'RAM DDR4 32GB 2933MHz' },
  { id: 'c74', equipmentId: '19', type: 'Almacenamiento', name: 'SSD NVMe 1TB' },
  { id: 'c75', equipmentId: '19', type: 'GPU', name: 'NVIDIA RTX 2080 Super' },
  { id: 'c76', equipmentId: '19', type: 'Fuente', name: 'Fuente 850W 80+ Platinum' },
  
  // PC-LAB-020
  { id: 'c77', equipmentId: '20', type: 'RAM', name: 'RAM DDR4 16GB 2933MHz' },
  { id: 'c78', equipmentId: '20', type: 'Almacenamiento', name: 'SSD 512GB' },
  { id: 'c79', equipmentId: '20', type: 'GPU', name: 'Gráficos Intel UHD 630' },
  { id: 'c80', equipmentId: '20', type: 'Monitor', name: 'Monitor 24" Full HD' },
]

export const mockMaintenance = [
  // PC-LAB-001
  { id: 'm1', equipmentId: '1', type: 'preventivo', description: 'Limpieza de ventiladores', date: new Date('2024-01-15'), technician: 'Juan Pérez', notes: 'Limpieza de filtros, revisión de pasta térmica' },
  { id: 'm2', equipmentId: '1', type: 'correctivo', description: 'Reparación de ventilador', date: new Date('2023-11-10'), technician: 'Carlos López', notes: 'Fallo en rodamiento ventilador CPU - reemplazado con unidad nueva' },
  
  // PC-LAB-002
  { id: 'm3', equipmentId: '2', type: 'preventivo', description: 'Actualización de controladores', date: new Date('2024-01-12'), technician: 'Ana Rodríguez', notes: 'Actualización de controladores GPU e Intel de NVIDIA e Intel' },
  { id: 'm4', equipmentId: '2', type: 'repotenciacion', description: 'Actualización de RAM', date: new Date('2023-10-20'), technician: 'María García', notes: 'Actualización de 8GB a 16GB DDR4' },
  
  // PC-LAB-003
  { id: 'm5', equipmentId: '3', type: 'preventivo', description: 'Servicio preventivo', date: new Date('2024-01-08'), technician: 'Juan Pérez', notes: 'Limpieza completa del sistema, desfragmentación, análisis antimalware' },
  
  // PC-LAB-004
  { id: 'm6', equipmentId: '4', type: 'correctivo', description: 'Cambio de SSD', date: new Date('2023-12-28'), technician: 'Carlos López', notes: 'SSD primario mostró errores de lectura, reemplazado con unidad nueva de 512GB' },
  
  // PC-LAB-005
  { id: 'm7', equipmentId: '5', type: 'preventivo', description: 'Limpieza general', date: new Date('2024-01-05'), technician: 'María García', notes: 'Limpieza de chasis, gestión de cables, revisión térmica' },
  { id: 'm8', equipmentId: '5', type: 'correctivo', description: 'Reparación de fuente', date: new Date('2023-09-15'), technician: 'Ana Rodríguez', notes: 'Problema de condensador PSU - reemplazado con unidad 650W' },
  
  // PC-LAB-006
  { id: 'm9', equipmentId: '6', type: 'preventivo', description: 'Mantenimiento de BIOS', date: new Date('2024-01-03'), technician: 'Juan Pérez', notes: 'Actualización de BIOS a versión estable más reciente' },
  
  // PC-LAB-007
  { id: 'm10', equipmentId: '7', type: 'repotenciacion', description: 'Actualización de SSD', date: new Date('2023-11-25'), technician: 'Carlos López', notes: 'Almacenamiento actualizado de 256GB a 512GB NVMe' },
  
  // PC-LAB-008
  { id: 'm11', equipmentId: '8', type: 'correctivo', description: 'Reemplazo de RAM defectuosa', date: new Date('2023-10-30'), technician: 'María García', notes: 'Módulo RAM defectuoso identificado, reemplazado con módulo funcional' },
  
  // PC-LAB-009
  { id: 'm12', equipmentId: '9', type: 'preventivo', description: 'Limpieza de radiador', date: new Date('2024-01-02'), technician: 'Ana Rodríguez', notes: 'Limpieza de radiador y ventilador, aplicación de pasta térmica' },
  
  // PC-LAB-010
  { id: 'm13', equipmentId: '10', type: 'correctivo', description: 'Reparación de puerto USB', date: new Date('2023-11-15'), technician: 'Juan Pérez', notes: 'Puerto USB trasero dañado, reparado en placa base' },
  
  // PC-LAB-011
  { id: 'm14', equipmentId: '11', type: 'preventivo', description: 'Revisión de sistema', date: new Date('2023-12-22'), technician: 'Carlos López', notes: 'Verificación completa del sistema, actualización de software' },
  
  // PC-LAB-012
  { id: 'm15', equipmentId: '12', type: 'repotenciacion', description: 'Actualización de GPU', date: new Date('2023-12-15'), technician: 'María García', notes: 'GPU actualizada de UHD 630 a RTX 3060' },
  
  // PC-LAB-013
  { id: 'm16', equipmentId: '13', type: 'correctivo', description: 'Reparación de pantalla', date: new Date('2023-12-05'), technician: 'Ana Rodríguez', notes: 'Pantalla con píxeles muertos, reemplazada por nueva' },
  
  // PC-LAB-014
  { id: 'm17', equipmentId: '14', type: 'preventivo', description: 'Servicio general', date: new Date('2023-11-28'), technician: 'Juan Pérez', notes: 'Servicio de mantenimiento preventivo completo' },
  
  // PC-LAB-015
  { id: 'm18', equipmentId: '15', type: 'correctivo', description: 'Reemplazo de disco', date: new Date('2023-11-20'), technician: 'Carlos López', notes: 'Disco duro con problemas reemplazado por SSD' },
  
  // PC-LAB-016
  { id: 'm19', equipmentId: '16', type: 'preventivo', description: 'Limpieza preventiva', date: new Date('2023-11-10'), technician: 'María García', notes: 'Limpieza de polvo y aplicación de pasta térmica' },
  
  // PC-LAB-017
  { id: 'm20', equipmentId: '17', type: 'correctivo', description: 'Reparación de fuente', date: new Date('2023-10-25'), technician: 'Ana Rodríguez', notes: 'Fuente ruidosa, reemplazada por nueva de 550W' },
  
  // PC-LAB-018
  { id: 'm21', equipmentId: '18', type: 'preventivo', description: 'Mantenimiento de sistema', date: new Date('2023-10-15'), technician: 'Juan Pérez', notes: 'Limpieza y actualización de software' },
  
  // PC-LAB-019
  { id: 'm22', equipmentId: '19', type: 'repotenciacion', description: 'Mejora de especificaciones', date: new Date('2023-09-30'), technician: 'Carlos López', notes: 'Sistema actualizado con RAM y GPU de última generación' },
  
  // PC-LAB-020
  { id: 'm23', equipmentId: '20', type: 'correctivo', description: 'Reparación de motherboard', date: new Date('2023-09-10'), technician: 'María García', notes: 'Placa base dañada, reparada en taller especializado' },
]

export const mockHardwareChanges = [
  { id: 'hw1', equipmentId: '1', changeType: 'mejora', oldComponent: 'RAM DDR4 8GB', newComponent: 'RAM DDR4 16GB', date: new Date('2023-12-20'), cost: 120 },
  { id: 'hw2', equipmentId: '1', changeType: 'reemplazo', oldComponent: 'SSD 256GB', newComponent: 'SSD NVMe 512GB', date: new Date('2023-11-15'), cost: 90 },
  { id: 'hw3', equipmentId: '2', changeType: 'reemplazo', oldComponent: 'Fuente 500W', newComponent: 'Fuente 650W 80+ Gold', date: new Date('2023-10-20'), cost: 110 },
  { id: 'hw4', equipmentId: '3', changeType: 'mejora', oldComponent: 'Gráficos Intel UHD 630', newComponent: 'NVIDIA RTX 3060', date: new Date('2023-12-15'), cost: 350 },
  { id: 'hw5', equipmentId: '4', changeType: 'reemplazo', oldComponent: 'SSD 256GB', newComponent: 'SSD NVMe 512GB', date: new Date('2023-11-25'), cost: 85 },
  { id: 'hw6', equipmentId: '5', changeType: 'correctivo', oldComponent: 'Encabezado USB defectuoso', newComponent: 'Encabezado USB nuevo', date: new Date('2023-11-05'), cost: 25 },
  { id: 'hw7', equipmentId: '6', changeType: 'mejora', oldComponent: 'RAM DDR4 8GB', newComponent: 'RAM DDR4 32GB', date: new Date('2023-10-30'), cost: 280 },
  { id: 'hw8', equipmentId: '7', changeType: 'reemplazo', oldComponent: 'SSD 256GB', newComponent: 'SSD NVMe 512GB', date: new Date('2023-10-15'), cost: 95 },
  { id: 'hw9', equipmentId: '8', changeType: 'correctivo', oldComponent: 'Ventilador CPU defectuoso', newComponent: 'Ventilador CPU nuevo', date: new Date('2023-09-20'), cost: 65 },
  { id: 'hw10', equipmentId: '9', changeType: 'mejora', oldComponent: 'GTX 1650', newComponent: 'RTX 2060', date: new Date('2023-09-10'), cost: 220 },
  { id: 'hw11', equipmentId: '10', changeType: 'reemplazo', oldComponent: 'HDD 1TB', newComponent: 'SSD NVMe 512GB', date: new Date('2023-08-25'), cost: 105 },
  { id: 'hw12', equipmentId: '11', changeType: 'mejora', oldComponent: 'RAM DDR4 8GB', newComponent: 'RAM DDR4 16GB', date: new Date('2023-08-15'), cost: 130 },
  { id: 'hw13', equipmentId: '12', changeType: 'reemplazo', oldComponent: 'SSD M.2 256GB', newComponent: 'SSD NVMe 1TB', date: new Date('2023-07-20'), cost: 150 },
  { id: 'hw14', equipmentId: '13', changeType: 'correctivo', oldComponent: 'Monitor roto', newComponent: 'Monitor nuevo 24"', date: new Date('2023-07-10'), cost: 280 },
  { id: 'hw15', equipmentId: '14', changeType: 'mejora', oldComponent: 'GPU MX350', newComponent: 'GPU GTX 1660', date: new Date('2023-06-15'), cost: 200 },
  { id: 'hw16', equipmentId: '15', changeType: 'reemplazo', oldComponent: 'SSD 256GB', newComponent: 'SSD 512GB', date: new Date('2023-06-01'), cost: 80 },
]

// ============= Installed Software Mock Data =============
export const mockInstalledSoftware = [
  // PC-LAB-001
  { id: 'sw1', equipmentId: '1', name: 'Windows 10 Pro', version: '21H2', vendor: 'Microsoft', licenseType: 'propietaria', licenseCost: 300, licensesAvailable: 1, installationDate: new Date('2022-01-15'), status: 'activo' },
  { id: 'sw2', equipmentId: '1', name: 'Microsoft Office 365', version: 'Latest', vendor: 'Microsoft', licenseType: 'propietaria', licenseCost: 180, licensesAvailable: 1, expiryDate: new Date('2025-01-15'), status: 'activo' },
  { id: 'sw3', equipmentId: '1', name: 'Visual Studio Code', version: '1.85.1', vendor: 'Microsoft', licenseType: 'libre', licenseCost: 0, installationDate: new Date('2023-06-10'), status: 'activo' },
  { id: 'sw4', equipmentId: '1', name: 'VLC Media Player', version: '3.0.20', vendor: 'VideoLAN', licenseType: 'libre', licenseCost: 0, installationDate: new Date('2023-01-20'), status: 'activo' },

  // PC-LAB-002
  { id: 'sw5', equipmentId: '2', name: 'Windows 10 Pro', version: '21H2', vendor: 'Microsoft', licenseType: 'propietaria', licenseCost: 300, licensesAvailable: 1, installationDate: new Date('2022-01-15'), status: 'activo' },
  { id: 'sw6', equipmentId: '2', name: 'AutoCAD 2024', version: '2024.0', vendor: 'Autodesk', licenseType: 'educativa', licenseCost: 0, licensesAvailable: 1, installationDate: new Date('2024-01-10'), status: 'activo' },
  { id: 'sw7', equipmentId: '2', name: 'Adobe Photoshop', version: '2024', vendor: 'Adobe', licenseType: 'propietaria', licenseCost: 600, licensesAvailable: 1, expiryDate: new Date('2025-06-01'), status: 'activo' },

  // PC-LAB-003
  { id: 'sw8', equipmentId: '3', name: 'Windows 10 Home', version: '21H2', vendor: 'Microsoft', licenseType: 'propietaria', licenseCost: 200, licensesAvailable: 1, installationDate: new Date('2023-03-20'), status: 'activo' },
  { id: 'sw9', equipmentId: '3', name: 'LibreOffice Suite', version: '7.6', vendor: 'The Document Foundation', licenseType: 'libre', licenseCost: 0, installationDate: new Date('2023-04-01'), status: 'activo' },

  // PC-LAB-004
  { id: 'sw10', equipmentId: '4', name: 'Windows 10 Pro', version: '21H2', vendor: 'Microsoft', licenseType: 'propietaria', licenseCost: 300, licensesAvailable: 1, installationDate: new Date('2022-01-15'), status: 'activo' },
  { id: 'sw11', equipmentId: '4', name: 'MATLAB R2023b', version: '2023b', vendor: 'MathWorks', licenseType: 'educativa', licenseCost: 0, licensesAvailable: 1, installationDate: new Date('2023-10-01'), status: 'activo' },

  // PC-LAB-005
  { id: 'sw12', equipmentId: '5', name: 'Windows 10 Pro', version: '21H2', vendor: 'Microsoft', licenseType: 'propietaria', licenseCost: 300, licensesAvailable: 1, installationDate: new Date('2022-01-15'), status: 'activo' },
  { id: 'sw13', equipmentId: '5', name: 'Blender', version: '4.0', vendor: 'Blender', licenseType: 'libre', licenseCost: 0, installationDate: new Date('2023-12-01'), status: 'activo' },

  // PC-LAB-006
  { id: 'sw14', equipmentId: '6', name: 'Windows 10 Pro', version: '21H2', vendor: 'Microsoft', licenseType: 'propietaria', licenseCost: 300, licensesAvailable: 1, installationDate: new Date('2022-06-10'), status: 'activo' },
  { id: 'sw15', equipmentId: '6', name: 'Python 3.11', version: '3.11', vendor: 'Python Software Foundation', licenseType: 'libre', licenseCost: 0, installationDate: new Date('2023-07-15'), status: 'activo' },

  // PC-LAB-007
  { id: 'sw16', equipmentId: '7', name: 'Windows 10 Pro', version: '21H2', vendor: 'Microsoft', licenseType: 'propietaria', licenseCost: 300, licensesAvailable: 1, installationDate: new Date('2022-06-10'), status: 'activo' },
]

// ============= Subscriptions Mock Data =============
export const mockSubscriptions = [
  { id: 'sub1', name: 'Microsoft 365 Business', provider: 'Microsoft', type: 'software', cost: 1200, billingFrequency: 'anual', startDate: new Date('2024-01-01'), renewalDate: new Date('2025-01-01'), status: 'activa', autoRenewal: true, licenseCount: 50, licenseUsed: 35 },
  { id: 'sub2', name: 'Adobe Creative Cloud', provider: 'Adobe', type: 'software', cost: 3000, billingFrequency: 'anual', startDate: new Date('2024-02-15'), renewalDate: new Date('2025-02-15'), status: 'activa', autoRenewal: true, licenseCount: 10, licenseUsed: 8 },
  { id: 'sub3', name: 'Autodesk Fusion 360', provider: 'Autodesk', type: 'software', cost: 680, billingFrequency: 'anual', startDate: new Date('2024-03-01'), renewalDate: new Date('2025-03-01'), status: 'activa', autoRenewal: true, licenseCount: 20, licenseUsed: 15 },
  { id: 'sub4', name: 'Norton Antivirus', provider: 'Norton', type: 'soporte', cost: 300, billingFrequency: 'anual', startDate: new Date('2024-01-15'), renewalDate: new Date('2025-01-15'), status: 'activa', autoRenewal: true, licenseCount: 50, licenseUsed: 50 },
  { id: 'sub5', name: 'Google Workspace', provider: 'Google', type: 'servicio', cost: 1500, billingFrequency: 'mensual', startDate: new Date('2024-01-01'), renewalDate: new Date('2026-01-01'), status: 'activa', autoRenewal: true, licenseCount: 100, licenseUsed: 75 },
  { id: 'sub6', name: 'AWS Educación', provider: 'Amazon', type: 'nube', cost: 500, billingFrequency: 'anual', startDate: new Date('2024-03-10'), renewalDate: new Date('2025-03-10'), status: 'activa', autoRenewal: false, licenseCount: 1, licenseUsed: 1 },
  { id: 'sub7', name: 'JetBrains All Products', provider: 'JetBrains', type: 'software', cost: 2400, billingFrequency: 'anual', startDate: new Date('2023-06-01'), renewalDate: new Date('2024-06-01'), status: 'inactiva', autoRenewal: false, licenseCount: 20, licenseUsed: 0 },
]

// ============= Output Peripherals Mock Data =============
export const mockOutputPeripherals = [
  // Monitores
  { id: 'p1', equipmentId: '1', name: 'Monitor Laboratorio A1-001', type: 'monitor', model: 'Dell S2421H', serialNumber: 'DELLS2421001', vendor: 'Dell', resolution: '1920x1200', specs: '24" Full HD, 60Hz', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 300 },
  { id: 'p2', equipmentId: '2', name: 'Monitor Laboratorio A1-002', type: 'monitor', model: 'Dell S2421H', serialNumber: 'DELLS2421002', vendor: 'Dell', resolution: '1920x1200', specs: '24" Full HD, 60Hz', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2022-01-15'), purchasePrice: 300 },
  { id: 'p3', equipmentId: '3', name: 'Monitor Laboratorio A1-003', type: 'monitor', model: 'LG 24UP550', serialNumber: 'LG24UP550003', vendor: 'LG', resolution: '3840x2160', specs: '24" 4K Ultra HD, 60Hz', status: 'activo', location: 'Aula A1', purchaseDate: new Date('2023-06-01'), purchasePrice: 450 },
  
  // Impresoras
  { id: 'p4', name: 'Impresora Multifunción Aula A', type: 'impresora', model: 'HP LaserJet Pro M478', serialNumber: 'HPLJ478001', vendor: 'HP', specs: 'A3, Color, 35ppm', status: 'activo', location: 'Aula A2', purchaseDate: new Date('2022-05-20'), purchasePrice: 800 },
  { id: 'p5', name: 'Impresora Multifunción Aula B', type: 'impresora', model: 'Canon imagePRESS C7570', serialNumber: 'CANC7570001', vendor: 'Canon', specs: 'A3, Color, 70ppm', status: 'activo', location: 'Aula B1', purchaseDate: new Date('2022-08-10'), purchasePrice: 5000 },
  { id: 'p6', name: 'Impresora B/N Oficina', type: 'impresora', model: 'Brother HL-L8360CDW', serialNumber: 'BROTHL8360001', vendor: 'Brother', specs: 'Monocromática, 33ppm', status: 'inactivo', location: 'Almacén', purchaseDate: new Date('2021-03-15'), purchasePrice: 400 },

  // Proyectores
  { id: 'p7', name: 'Proyector Aula C1', type: 'proyector', model: 'Epson EB-2250U', serialNumber: 'EPSEB2250001', vendor: 'Epson', specs: '5000 lúmenes, 4K', status: 'activo', location: 'Aula C1', purchaseDate: new Date('2023-02-14'), purchasePrice: 2500 },
  { id: 'p8', name: 'Proyector Auditorio', type: 'proyector', model: 'Panasonic PT-RZ870', serialNumber: 'PANRZ870001', vendor: 'Panasonic', specs: '8500 lúmenes, Full HD', status: 'activo', location: 'Auditorio', purchaseDate: new Date('2022-11-20'), purchasePrice: 3500 },

  // Parlantes
  { id: 'p9', name: 'Sistema de Sonido Auditorio', type: 'parlantes', model: 'JBL Professional LSR308', serialNumber: 'JBLLSR308001', vendor: 'JBL', specs: '8" Woofer, 8ohm', status: 'activo', location: 'Auditorio', purchaseDate: new Date('2023-01-10'), purchasePrice: 1200 },
  { id: 'p10', name: 'Parlantes Laboratorio', type: 'parlantes', model: 'Logitech Z906', serialNumber: 'LOGZ906001', vendor: 'Logitech', specs: '5.1 Surround, 500W', status: 'activo', location: 'Laboratorio D', purchaseDate: new Date('2022-04-05'), purchasePrice: 350 },

  // Ploter
  { id: 'p11', name: 'Ploter CAD Aula B', type: 'ploter', model: 'Epson SureColor T5270', serialNumber: 'EPST5270001', vendor: 'Epson', specs: '36", 2880 dpi', status: 'activo', location: 'Aula B2', purchaseDate: new Date('2023-05-18'), purchasePrice: 4500 },
]

// ============= Issues/Reports Mock Data =============
export const mockIssueReports = [
  { id: 'ir1', equipmentId: '1', title: 'Pantalla con píxeles defectuosos', description: 'Monitor muestra línea de píxeles muertos en la parte superior', category: 'hardware', priority: 'alta', status: 'resuelto', reportedBy: 'Juan López', assignedTo: 'Técnico A', resolution: 'Reemplazo de monitor', resolution_date: new Date('2024-01-20') },
  { id: 'ir2', equipmentId: '2', title: 'Software licencia vencida', description: 'Adobe Photoshop muestra mensaje de licencia expirada', category: 'software', priority: 'media', status: 'resuelto', reportedBy: 'María García', assignedTo: 'Admin', resolution: 'Renovación de suscripción', resolution_date: new Date('2024-01-18') },
  { id: 'ir3', equipmentId: '4', title: 'Conexión a red intermitente', description: 'El PC pierde conexión cada 2-3 horas', category: 'red', priority: 'alta', status: 'en_progreso', reportedBy: 'Carlos Ruiz', assignedTo: 'Técnico B', resolution: null, resolution_date: null },
  { id: 'ir4', equipmentId: '5', title: 'Rendimiento lento del sistema', description: 'Equipo tarda mucho en cargar programas', category: 'software', priority: 'media', status: 'abierto', reportedBy: 'Ana Martínez', assignedTo: null, resolution: null, resolution_date: null },
  { id: 'ir5', equipmentId: '7', title: 'Fallo en el ventilador', description: 'Ventilador de CPU emite ruido anormal', category: 'hardware', priority: 'alta', status: 'abierto', reportedBy: 'Luis Fernández', assignedTo: null, resolution: null, resolution_date: null },
  { id: 'ir6', equipmentId: '8', title: 'Impresora no detectada', description: 'El equipo no detecta la impresora de red', category: 'perimetral', priority: 'media', status: 'en_progreso', reportedBy: 'Sofía Díaz', assignedTo: 'Técnico A', resolution: null, resolution_date: null },
  { id: 'ir7', equipmentId: '10', title: 'Driver de USB desactualizado', description: 'USB 3.0 funciona a velocidad 2.0', category: 'software', priority: 'baja', status: 'resuelto', reportedBy: 'Miguel Ángel', assignedTo: 'Técnico C', resolution: 'Actualización de drivers', resolution_date: new Date('2024-01-15') },
  { id: 'ir8', equipmentId: '12', title: 'Pantalla rota por caída', description: 'Monitor físicamente dañado tras caída accidental', category: 'hardware', priority: 'critica', status: 'resuelto', reportedBy: 'Pedro Sánchez', assignedTo: 'Técnico D', resolution: 'Reemplazo de monitor', resolution_date: new Date('2024-01-10') },
  { id: 'ir9', equipmentId: '14', title: 'Software pirata detectado', description: 'Sistema detectó software no licenciado', category: 'software', priority: 'critica', status: 'abierto', reportedBy: 'Sistema', assignedTo: 'Admin', resolution: null, resolution_date: null },
  { id: 'ir10', equipmentId: null, title: 'Necesidad de nuevo PC para laboratorio', description: 'Requerimiento de equipo adicional para expansión de capacidad', category: 'otro', priority: 'media', status: 'abierto', reportedBy: 'Gerencia', assignedTo: null, resolution: null, resolution_date: null },
]

// In-memory storage for new records (development only)
export let newEquipmentList: any[] = []
export let newComponentsList: any[] = []

export function addNewEquipment(equipment: any) {
  newEquipmentList.push(equipment)
}

export function addNewComponent(component: any) {
  newComponentsList.push(component)
}

export function getNewEquipment() {
  return [...newEquipmentList]
}

export function getNewComponents() {
  return [...newComponentsList]
}
