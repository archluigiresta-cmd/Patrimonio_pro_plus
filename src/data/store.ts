import type { Property, Tenant, Contract, Payment, Deadline, Expense, Vehicle } from '@/types';

// DATI ESTRATTI DAI FILE DI MIGRAZIONE FORNITI
// Questa è ora l'unica fonte di dati per l'intera applicazione.

export const properties: Property[] = [
  { id: 'imm-001', code: 'IMM-001', name: 'Villa Paradiso', address: 'Via Roma 1, Milano', type: 'Villa', surface: 250, rooms: 7, status: 'Affittato', imageUrl: 'https://images.unsplash.com/photo-15701294774G92-45c003edd2be?q=80&w=2070&auto=format&fit=crop' },
  { id: 'imm-002', code: 'IMM-002', name: 'Appartamento Centrale', address: 'Corso Buenos Aires 10, Milano', type: 'Appartamento', surface: 80, rooms: 3, status: 'Affittato', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' },
  { id: 'imm-003', code: 'IMM-003', name: 'Ufficio Moderno', address: 'Piazza Duomo 5, Milano', type: 'Ufficio', surface: 120, rooms: 4, status: 'Libero', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop' },
  { id: 'imm-004', code: 'IMM-004', name: 'Garage Centrale', address: 'Via Montenapoleone 20, Milano', type: 'Garage', surface: 20, rooms: 1, status: 'Libero', imageUrl: 'https://images.unsplash.com/photo-1589331908599-8084a9354d20?q=80&w=2070&auto=format&fit=crop' },
];

export const tenants: Tenant[] = [
  { id: 'inq-1', name: 'Mario Rossi', email: 'mario.rossi@email.com', phone: '3331234567', propertyId: 'imm-001' },
  { id: 'inq-2', name: 'Giulia Bianchi', email: 'giulia.bianchi@email.com', phone: '3337654321', propertyId: 'imm-002' },
];

export const contracts: Contract[] = [
   { id: 'ctr-1', propertyId: 'imm-001', tenantId: 'inq-1', startDate: '2023-01-01', endDate: '2026-12-31', rentAmount: 1200 },
   { id: 'ctr-2', propertyId: 'imm-002', tenantId: 'inq-2', startDate: '2024-03-15', endDate: '2028-03-14', rentAmount: 850 },
];

export const payments: Payment[] = [
    { id: 'pay-01', contractId: 'ctr-1', amount: 1200, date: '2024-06-01', status: 'Pagato' },
    { id: 'pay-02', contractId: 'ctr-2', amount: 850, date: '2024-06-05', status: 'Pagato' },
    { id: 'pay-03', contractId: 'ctr-1', amount: 1200, date: '2024-07-01', status: 'In Attesa' },
    { id: 'pay-04', contractId: 'ctr-2', amount: 850, date: '2024-07-05', status: 'In Ritardo' },
];

export const deadlines: Deadline[] = [
    { id: 'dead-01', propertyId: 'imm-001', title: 'Pagamento Rata IMU', date: '2024-06-16', type: 'Tassa' },
    { id: 'dead-02', propertyId: 'imm-002', title: 'Assicurazione Casa', date: '2024-07-31', type: 'Altro' },
    { id: 'dead-03', propertyId: 'imm-001', title: 'Manutenzione Caldaia', date: '2024-09-01', type: 'Manutenzione' },
];

export const expenses: Expense[] = [
    { id: 'exp-01', propertyId: 'imm-001', title: 'Acconto IMU 2024', category: 'Tasse', amount: 1200, date: '2024-06-16' },
    { id: 'exp-02', propertyId: 'imm-002', title: 'Bolletta luce (Mar-Apr)', category: 'Utenze', amount: 85.50, date: '2024-04-15' },
    { id: 'exp-03', propertyId: 'imm-002', title: 'Spese condominiali Aprile', category: 'Condominio', amount: 250, date: '2024-04-05' },
    { id: 'exp-04', propertyId: 'imm-001', title: 'Riparazione caldaia', category: 'Manutenzione', amount: 200, date: '2024-03-18' },
];

export const vehicles: Vehicle[] = [
    { id: 'vec-001', plate: 'AB123CD', model: 'Fiat 500', insuranceCompany: 'Allianz', insuranceExpiry: '2024-12-31', stampDutyAmount: 150, stampDutyExpiry: '2025-01-31', lastRevision: '2023-06-15', nextRevision: '2025-06-15' },
    { id: 'vec-002', plate: 'XY456ZW', model: 'BMW X1', insuranceCompany: 'Generali', insuranceExpiry: '2025-05-20', stampDutyAmount: 250, stampDutyExpiry: '2025-04-30', lastRevision: '2024-03-10', nextRevision: '2026-03-10' },
];


// Funzioni per recuperare dati correlati
export const getPropertyById = (id: string) => properties.find(p => p.id === id);
export const getTenantById = (id: string) => tenants.find(t => t.id === id);
export const getTenantsByPropertyId = (propertyId: string) => tenants.filter(t => t.propertyId === propertyId);
export const getContractsByPropertyId = (propertyId: string) => contracts.filter(c => c.propertyId === propertyId);