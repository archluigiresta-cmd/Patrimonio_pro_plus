import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import InteractiveTable, { Column } from '../components/ui/InteractiveTable';
import ExportButton from '../components/ui/ExportButton';
import { Property } from '../types';

const PropertiesScreen: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    setProperties([
        { id: 'prop1', name: 'Villa al Mare', address: 'Via Roma 1, 10100 Milano', type: 'Villa', value: 500000, acquisitionDate: '2020-01-15', status: 'Affittato' },
        { id: 'prop2', name: 'Ufficio Centrale', address: 'Corso Vittorio 2, 10100 Torino', type: 'Ufficio', value: 300000, acquisitionDate: '2018-06-20', status: 'Libero' },
        { id: 'prop3', name: 'Appartamento in Centro', address: 'Piazza Castello 3, 10123 Torino', type: 'Appartamento', value: 250000, acquisitionDate: '2022-03-10', status: 'In vendita' },
    ]);
  }, []);

  const columns: Column<Property>[] = [
    { accessor: 'name', header: 'Nome Immobile' },
    { accessor: 'address', header: 'Indirizzo' },
    { accessor: 'type', header: 'Tipologia' },
    { accessor: 'value', header: 'Valore', render: (item: Property) => `€ ${item.value.toLocaleString('it-IT')}`},
    { accessor: 'status', header: 'Stato', render: (item: Property) => {
        const color = item.status === 'Affittato' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      item.status === 'Libero' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>{item.status}</span>
    }},
  ];

  const handleAddProperty = () => {
      console.log("Aggiungi immobile");
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestione Immobili</h1>
        <div className="flex items-center gap-2">
            <ExportButton data={properties} filename="immobili.csv" />
            <button
                onClick={handleAddProperty}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <Plus size={16} />
                Aggiungi Immobile
            </button>
        </div>
      </div>
      <InteractiveTable
        columns={columns}
        data={properties}
        onEdit={(item) => console.log('Edit', item)}
        onDelete={(item) => console.log('Delete', item)}
        onRowClick={(item) => console.log('Row clicked', item)}
      />
    </div>
  );
};

export default PropertiesScreen;
