import type { Property, Tenant, Contract, Payment, Deadline, Expense, Vehicle } from '@/types';

export const properties: Property[] = [
  { id: 'imm-001', code: 'IMM-001', name: 'Villa sul Lago', address: 'Via Roma 1, Como', type: 'Villa', surface: 250, rooms: 7, imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop', status: 'Affittato' },
  { id: 'imm-002', code: 'IMM-002', name: 'Appartamento Centrale', address: 'Corso Buenos Aires 10, Milano', type: 'Appartamento', surface: 80, rooms: 3, imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop', status: 'Affittato' },
  { id: 'imm-003', code: 'IMM-003', name: 'Ufficio Moderno', address: 'Viale della Liberazione 5, Milano', type: 'Ufficio', surface: 120, rooms: 4, imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop', status: 'Libero' },
  { id: 'imm-004', code: 'IMM-004', name: 'Garage Piazza V Giornate', address: 'Piazza V Giornate, Milano', type: 'Garage', surface: 15, rooms: 1, imageUrl: 'https://images.unsplash.com/photo-1588821338101-23de6b56435e?q=80&w=2070&auto=format&fit=crop', status: 'Affittato' },
];

export const tenants: Tenant[] = [
  { id: 'inq-001', name: 'Mario Rossi', email: 'mario.rossi@email.com', phone: '3331234567', propertyId: 'imm-001' },
  { id: 'inq-002', name: 'Giulia Bianchi', email: 'giulia.bianchi@email.com', phone: '3337654321', propertyId: 'imm-002' },
  { id: 'inq-003', name: 'Luca Verdi', email: 'luca.verdi@email.com', phone: '3339876543', propertyId: 'imm-004' },
];

export const contracts: Contract[] = [
  { id: 'con-001', propertyId: 'imm-001', tenantId: 'inq-001', startDate: '2023-01-01', endDate: '2027-01-01', rentAmount: 2500 },
  { id: 'con-002', propertyId: 'imm-002', tenantId: 'inq-002', startDate: '2022-06-01', endDate: '2026-06-01', rentAmount: 1200 },
  { id: 'con-003', propertyId: 'imm-004', tenantId: 'inq-003', startDate: '2024-01-01', endDate: '2025-01-01', rentAmount: 200 },
];

export const payments: Payment[] = [
  { id: 'pag-001', contractId: 'con-001', amount: 2500, date: '2024-07-01', status: 'Pagato' },
  { id: 'pag-002', contractId: 'con-002', amount: 1200, date: '2024-07-03', status: 'Pagato' },
  { id: 'pag-003', contractId: 'con-002', amount: 1200, date: '2024-06-03', status: 'Pagato' },
  { id: 'pag-004', contractId: 'con-003', amount: 200, date: '2024-07-05', status: 'In Attesa' },
];

export const deadlines: Deadline[] = [
    { id: 'scd-001', propertyId: 'imm-001', title: 'Pagamento IMU', date: '2024-12-16', type: 'Tassa' },
    { id: 'scd-002', propertyId: 'imm-002', title: 'Rinnovo Contratto', date: '2026-06-01', type: 'Affitto' },
    { id: 'scd-003', propertyId: 'imm-001', title: 'Manutenzione Caldaia', date: '2024-09-15', type: 'Manutenzione' },
    { id: 'scd-004', propertyId: 'imm-003', title: 'Pagamento TARI', date: '2024-07-31', type: 'Tassa' },
];

export const expenses: Expense[] = [
    { id: 'spe-001', propertyId: 'imm-001', title: 'Riparazione tetto', category: 'Manutenzione', amount: 1200, date: '2024-05-20' },
    { id: 'spe-002', propertyId: 'imm-002', title: 'Spese condominiali', category: 'Condominio', amount: 150, date: '2024-07-01' },
    { id: 'spe-003', propertyId: 'imm-001', title: 'Acconto IMU', category: 'Tasse', amount: 800, date: '2024-06-16' },
    { id: 'spe-004', propertyId: 'imm-002', title: 'Bolletta Elettricità', category: 'Utenze', amount: 85, date: '2024-06-28' },
];

export const vehicles: Vehicle[] = [
    { id: 'vec-001', plate: 'AB123CD', model: 'Fiat 500', insuranceCompany: 'Generali', insuranceExpiry: '2025-06-30', stampDutyAmount: 180, stampDutyExpiry: '2025-04-30', lastRevision: '2023-07-15', nextRevision: '2025-07-15' },
    { id: 'vec-002', plate: 'XY987ZW', model: 'BMW X1', insuranceCompany: 'Allianz', insuranceExpiry: '2024-08-10', stampDutyAmount: 250, stampDutyExpiry: '2025-01-31', lastRevision: '2024-02-20', nextRevision: '2026-02-20' },
];
