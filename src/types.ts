import type { LucideIcon } from 'lucide-react';
import type { FC } from 'react';

export type NavItemType = 'link' | 'button' | 'spacer';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon | FC;
  path?: string;
  type: NavItemType;
}

export interface Property {
  id: string;
  code: string;
  name: string;
  address: string;
  type: 'Appartamento' | 'Villa' | 'Ufficio' | 'Terreno' | 'Garage';
  surface: number;
  rooms: number;
  imageUrl?: string;
  status: 'Libero' | 'Affittato';
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
}

export interface Contract {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
}

export interface Payment {
  id: string;
  contractId: string;
  amount: number;
  date: string;
  status: 'Pagato' | 'In Attesa' | 'In Ritardo';
}

export interface Deadline {
    id: string;
    propertyId: string;
    title: string;
    date: string;
    type: 'Tassa' | 'Utenza' | 'Manutenzione' | 'Affitto' | 'Altro';
}

export interface Expense {
    id: string;
    propertyId: string;
    title: string;
    category: 'Tasse' | 'Utenze' | 'Condominio' | 'Manutenzione' | 'Altro';
    amount: number;
    date: string;
}

export interface Vehicle {
    id: string;
    plate: string;
    model: string;
    insuranceCompany: string;
    insuranceExpiry: string;
    stampDutyAmount: number;
    stampDutyExpiry: string;
    lastRevision: string;
    nextRevision: string;
}