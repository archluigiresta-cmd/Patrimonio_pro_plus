export type NavItemType = 'link' | 'button' | 'spacer';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  type: NavItemType;
  action?: () => void;
  subItems?: NavItem[];
}

export interface Property {
  id: string;
  name: string;
  address: string;
  type: 'Appartamento' | 'Villa' | 'Ufficio' | 'Terreno' | 'Garage';
  value: number;
  acquisitionDate: string;
  imageUrl?: string;
  status: 'Libero' | 'Affittato' | 'In vendita';
}

export interface Contract {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  type: 'Residenziale' | 'Commerciale';
  status: 'Attivo' | 'Scaduto' | 'Rinnovato';
}

// Aggiungi qui le altre interfacce (Deadline, Document, Tenant, etc.)
