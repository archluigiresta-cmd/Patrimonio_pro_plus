import { Home, Building2, Car, FileText, Users, Calendar, FileBox, HardHat, Euro, BarChart2, Settings, HelpCircle } from 'lucide-react';
import { NavItem } from './types';

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/', type: 'link' },
  { id: 'properties', label: 'Immobili', icon: Building2, path: '/immobili', type: 'link' },
  { id: 'vehicles', label: 'Veicoli', icon: Car, path: '/veicoli', type: 'link' },
  { id: 'contracts', label: 'Contratti', icon: FileText, path: '/contratti', type: 'link' },
  { id: 'tenants', label: 'Inquilini', icon: Users, path: '/inquilini', type: 'link' },
  { id: 'deadlines', label: 'Scadenze', icon: Calendar, path: '/scadenze', type: 'link' },
  { id: 'documents', label: 'Documenti', icon: FileBox, path: '/documenti', type: 'link' },
  { id: 'maintenance', label: 'Manutenzioni', icon: HardHat, path: '/manutenzioni', type: 'link' },
  { id: 'expenses', label: 'Spese', icon: Euro, path: '/spese', type: 'link' },
  { id: 'payments', label: 'Pagamenti', icon: Euro, path: '/pagamenti', type: 'link' },
  { id: 'spacer1', label: '', icon: () => null, type: 'spacer' },
  { id: 'reports', label: 'Report', icon: BarChart2, path: '/report', type: 'link' },
  { id: 'settings', label: 'Impostazioni', icon: Settings, path: '/impostazioni', type: 'link' },
  { id: 'help', label: 'Aiuto', icon: HelpCircle, path: '/aiuto', type: 'link' },
];
