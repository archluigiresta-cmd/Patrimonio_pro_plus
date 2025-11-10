import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { Vehicle } from '@/types';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { vehicles as initialVehicles } from '@/data/store';

const VeicoliScreen = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatus = (dateString: string) => {
    const today = new Date();
    const expiryDate = new Date(dateString);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Scaduto', color: 'text-red-500' };
    if (diffDays <= 30) return { text: `In scadenza (${diffDays} gg)`, color: 'text-yellow-500' };
    return { text: 'Attivo', color: 'text-green-500' };
  };
  
  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Elenco Veicoli</h1>
        <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
            <Plus size={16} />
            Aggiungi Veicolo
        </button>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Veicolo</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assicurazione</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Bollo</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Revisione</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Azioni</span></th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                {vehicles.map(vehicle => (
                    <tr key={vehicle.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{vehicle.model}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{vehicle.plate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-semibold ${getStatus(vehicle.insuranceExpiry).color}`}>{getStatus(vehicle.insuranceExpiry).text}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(vehicle.insuranceExpiry).toLocaleDateString()}</div>
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-semibold ${getStatus(vehicle.stampDutyExpiry).color}`}>{getStatus(vehicle.stampDutyExpiry).text}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(vehicle.stampDutyExpiry).toLocaleDateString()}</div>
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-semibold ${getStatus(vehicle.nextRevision).color}`}>{getStatus(vehicle.nextRevision).text}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(vehicle.nextRevision).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-200 mr-4"><Edit size={18}/></button>
                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"><Trash2 size={18}/></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </Card>
      
      <Modal title="Aggiungi Nuovo Veicolo" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Modello</label>
                    <input type="text" name="model" id="model" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" placeholder="Es. Fiat 500" />
                </div>
                <div>
                    <label htmlFor="plate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Targa</label>
                    <input type="text" name="plate" id="plate" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" placeholder="AB123CD" />
                </div>
            </div>
            
            <h3 className="text-md font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">Assicurazione</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="insuranceCompany" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Compagnia</label>
                    <input type="text" name="insuranceCompany" id="insuranceCompany" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                </div>
                 <div>
                    <label htmlFor="insuranceExpiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data Scadenza</label>
                    <input type="date" name="insuranceExpiry" id="insuranceExpiry" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                </div>
            </div>

            <h3 className="text-md font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">Bollo</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="stampDutyAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Importo (€)</label>
                    <input type="number" name="stampDutyAmount" id="stampDutyAmount" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                </div>
                 <div>
                    <label htmlFor="stampDutyExpiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data Scadenza</label>
                    <input type="date" name="stampDutyExpiry" id="stampDutyExpiry" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                </div>
            </div>
            
            <h3 className="text-md font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">Revisione</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="lastRevision" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data Ultima</label>
                    <input type="date" name="lastRevision" id="lastRevision" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                </div>
                 <div>
                    <label htmlFor="nextRevision" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data Prossima</label>
                    <input type="date" name="nextRevision" id="nextRevision" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">Annulla</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-sm hover:bg-primary-700">Aggiungi Veicolo</button>
            </div>
        </form>
      </Modal>

    </div>
  );
};

export default VeicoliScreen;