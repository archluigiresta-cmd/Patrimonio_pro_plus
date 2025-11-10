import type { Property, Tenant, Contract, Payment, Deadline, Expense, Vehicle } from '@/types';

export const properties: Property[] = [
    { id: 'imm-001', code: 'VIL-SOL', name: 'Villa Sole', address: 'Via dei Girasoli 12, Roma', type: 'Villa', surface: 250, rooms: 7, status: 'Affittato', imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2070&auto=format&fit=crop' },
    { id: 'imm-002', code: 'APP-CEN', name: 'Appartamento Centrale', address: 'Corso Vittorio Emanuele 150, Milano', type: 'Appartamento', surface: 80, rooms: 3, status: 'Affittato', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop' },
    { id: 'imm-003', code: 'UFF-FIN', name: 'Ufficio Finanziario', address: 'Piazza Affari 1, Milano', type: 'Ufficio', surface: 120, rooms: 4, status: 'Libero', imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop' },
    { id: 'imm-004', code: 'GAR-DBL', name: 'Garage Doppio', address: 'Via Torino 34, Torino', type: 'Garage', surface: 30, rooms: 1, status: 'Libero', imageUrl: 'https://images.unsplash.com/photo-1589331908127-245c88821535?q=80&w=2071&auto=format&fit=crop' },
];

export const tenants: Tenant[] = [
    { id: 'inq-001', name: 'Mario Rossi', email: 'mario.rossi@email.com', phone: '3331234567', propertyId: 'imm-001' },
    { id: 'inq-002', name: 'Giulia Bianchi', email: 'giulia.bianchi@email.com', phone: '3387654321', propertyId: 'imm-002' },
];

export const contracts: Contract[] = [
    { id: 'con-001', propertyId: 'imm-001', tenantId: 'inq-001', startDate: '2023-01-01', endDate: '2026-12-31', rentAmount: 2500 },
    { id: 'con-002', propertyId: 'imm-002', tenantId: 'inq-002', startDate: '2022-06-01', endDate: '2026-05-31', rentAmount: 1200 },
];

export const payments: Payment[] = [
    { id: 'pag-001', contractId: 'con-001', amount: 2500, date: '2024-07-01', status: 'Pagato' },
    { id: 'pag-002', contractId: 'con-002', amount: 1200, date: '2024-07-05', status: 'Pagato' },
    { id: 'pag-003', contractId: 'con-001', amount: 2500, date: '2024-06-01', status: 'Pagato' },
    { id: 'pag-004', contractId: 'con-002', amount: 1200, date: '2024-08-05', status: 'In Attesa' },
];

export const deadlines: Deadline[] = [
    { id: 'sca-001', propertyId: 'imm-001', title: 'Pagamento IMU', date: '2024-12-16', type: 'Tassa' },
    { id: 'sca-002', propertyId: 'imm-002', title: 'Manutenzione Caldaia', date: '2024-09-15', type: 'Manutenzione' },
    { id: 'sca-003', propertyId: 'imm-001', title: 'Rinnovo Contratto Luce', date: '2024-11-01', type: 'Utenza' },
];

export const expenses: Expense[] = [
    { id: 'spe-001', propertyId: 'imm-001', title: 'Tassa Rifiuti', category: 'Tasse', amount: 350, date: '2024-07-20' },
    { id: 'spe-002', propertyId: 'imm-002', title: 'Spese Condominiali', category: 'Condominio', amount: 150, date: '2024-07-01' },
    { id: 'spe-003', propertyId: 'imm-001', title: 'Riparazione Tetto', category: 'Manutenzione', amount: 1200, date: '2024-06-15' },
];

export const vehicles: Vehicle[] = [
    { id: 'vec-001', plate: 'AB123CD', model: 'Fiat 500', insuranceCompany: 'Generali', insuranceExpiry: '2025-06-30', stampDutyAmount: 180, stampDutyExpiry: '2025-04-30', lastRevision: '2023-05-15', nextRevision: '2025-05-15' },
    { id: 'vec-002', plate: 'XY987ZW', model: 'Audi A3', insuranceCompany: 'Allianz', insuranceExpiry: '2024-08-20', stampDutyAmount: 250, stampDutyExpiry: '2024-07-31', lastRevision: '2024-01-10', nextRevision: '2026-01-10' },
];
