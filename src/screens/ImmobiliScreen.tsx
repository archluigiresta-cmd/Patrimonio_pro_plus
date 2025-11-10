import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { Property } from '@/types';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { properties as initialProperties } from '@/data/store';

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
  const [properties, setProperties] = useState(initialProperties);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Elenco Immobili</h1>
        <button
            onClick={() => setIsModalOpen(true)}
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

      <Modal title="Aggiungi Nuovo Immobile" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome Immobile</label>
                <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" placeholder="Es. Villa Paradiso" />
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Indirizzo</label>
                <input type="text" name="address" id="address" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" placeholder="Es. Via Roma 1, Milano" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Codice Identificativo</label>
                    <input type="text" name="code" id="code" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" placeholder="IMM-005" />
                </div>
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
                    <select id="type" name="type" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700">
                        <option>Appartamento</option>
                        <option>Villa</option>
                        <option>Ufficio</option>
                        <option>Terreno</option>
                        <option>Garage</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="surface" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Superficie (mq)</label>
                    <input type="number" name="surface" id="surface" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                </div>
                <div>
                    <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Numero Locali</label>
                    <input type="number" name="rooms" id="rooms" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                </div>
            </div>
             <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stato</label>
                <select id="status" name="status" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700">
                    <option>Libero</option>
                    <option>Affittato</option>
                </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">Annulla</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-sm hover:bg-primary-700">Aggiungi Immobile</button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default ImmobiliScreen;