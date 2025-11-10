import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { Property } from '@/types';
import Card from '@/components/ui/Card';

const mockProperties: Property[] = [
  { id: 'imm-001', code: 'IMM-001', name: 'Villa Paradiso', address: 'Via Roma 1, Milano', type: 'Villa', surface: 250, rooms: 7, status: 'Affittato', imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop' },
  { id: 'imm-002', code: 'IMM-002', name: 'Appartamento Centrale', address: 'Corso Buenos Aires 10, Milano', type: 'Appartamento', surface: 80, rooms: 3, status: 'Affittato', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' },
  { id: 'imm-003', code: 'IMM-003', name: 'Ufficio Moderno', address: 'Piazza Duomo 5, Milano', type: 'Ufficio', surface: 120, rooms: 4, status: 'Libero', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop' },
];

const PropertyCard = ({ property }: { property: Property }) => {
    const statusClass = property.status === 'Affittato' 
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    
    return (
        <Card className="!p-0 flex flex-col overflow-hidden">
            <img src={property.imageUrl} alt={property.name} className="w-full h-40 object-cover" />
            <div className="p-4 flex-grow flex flex-col">
                <p className="text-xs text-gray-500">{property.code}</p>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{property.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{property.address}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {property.surface} mq - {property.rooms} locali
                </p>
                <div className="mt-4 flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClass}`}>
                        {property.status}
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="text-gray-400 hover:text-primary-600"><Edit size={18} /></button>
                        <button className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const ImmobiliScreen = () => {
  const [properties, setProperties] = useState(mockProperties);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Elenco Immobili</h1>
        <button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
            <Plus size={16} />
            Aggiungi Immobile
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
          ))}
      </div>
    </div>
  );
};

export default ImmobiliScreen;