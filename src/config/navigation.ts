import { Home, Building2, Car, Users, FileText, Calendar, HardHat, Euro, FileBox, BarChart2, TrendingUp, Settings, LifeBuoy } from 'lucide-react';
import type { NavItem } from '@/types';

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/', type: 'link' },
  { id: 'immobili', label: 'Immobili', icon: Building2, path: '/immobili', type: 'link' },
  { id: 'veicoli', label: 'Veicoli', icon: Car, path: '/veicoli', type: 'link' },
  { id: 'inquilini', label: 'Inquilini', icon: Users, path: '/inquilini', type: 'link' },
  { id: 'contratti', label: 'Contratti', icon: FileText, path: '/contratti', type: 'link' },
  { id: 'pagamenti', label: 'Pagamenti', icon: Euro, path: '/pagamenti', type: 'link' },
  { id: 'scadenze', label: 'Scadenze', icon: Calendar, path: '/scadenze', type: 'link' },
  { id: 'manutenzioni', label: 'Manutenzioni', icon: HardHat, path: '/manutenzioni', type: 'link' },
  { id: 'spese', label: 'Spese', icon: Euro, path: '/spese', type: 'link' },
  { id: 'documenti', label: 'Documenti', icon: FileBox, path: '/documenti', type: 'link' },
  { id: 'spacer1', label: '', icon: () => null, type: 'spacer' },
  { id: 'report', label: 'Report', icon: BarChart2, path: '/report', type: 'link' },
  { id: 'analisi-finanziaria', label: 'Analisi Finanziaria', icon: TrendingUp, path: '/analisi-finanziaria', type: 'link' },
  { id: 'spacer2', label: '', icon: () => null, type: 'spacer' },
  { id: 'impostazioni', label: 'Impostazioni', icon: Settings, path: '/impostazioni', type: 'link' },
  { id: 'aiuto-supporto', label: 'Aiuto & Supporto', icon: LifeBuoy, path: '/aiuto', type: 'link' },
];