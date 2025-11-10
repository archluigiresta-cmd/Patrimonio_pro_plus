import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { deadlines as initialDeadlines, properties, getPropertyById } from '@/data/store';

const ScadenzeScreen = () => {
  const [deadlines, setDeadlines] = useState(initialDeadlines);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getStatus = (dateString: string) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const expiryDate = new Date(dateString);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Scaduto', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' };
    if (diffDays <= 7) return { text: 'Urgente', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' };
    return { text: 'In programma', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' };
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestione Scadenze</h1>
        <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
            <Plus size={16} />
            Nuova Scadenza
        </button>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Scadenza</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Immobile Collegato</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Data</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stato</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Azioni</span></th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                {deadlines.map(deadline => {
                    const property = getPropertyById(deadline.propertyId);
                    const status = getStatus(deadline.date);
                    return (
                        <tr key={deadline.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{deadline.title}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{deadline.type}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {property?.name || 'N/D'}
                            </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {new Date(deadline.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                                    {status.text}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-200 mr-4"><Edit size={18}/></button>
                                <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"><Trash2 size={18}/></button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
      </Card>
      
      <Modal title="Aggiungi Nuova Scadenza" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
         <form className="space-y-4">
            <div>
                <label htmlFor="deadline-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Titolo Scadenza</label>
                <input type="text" name="deadline-title" id="deadline-title" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" placeholder="Es. Pagamento Rata IMU" />
            </div>
             <div>
                <label htmlFor="deadline-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
                <select id="deadline-type" name="deadline-type" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700">
                    <option>Tassa</option>
                    <option>Utenza</option>
                    <option>Manutenzione</option>
                    <option>Affitto</option>
                    <option>Altro</option>
                </select>
            </div>
            <div>
                <label htmlFor="deadline-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data Scadenza</label>
                <input type="date" name="deadline-date" id="deadline-date" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
            </div>
            <div>
                <label htmlFor="deadline-property" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Immobile di Riferimento</label>
                <select id="deadline-property" name="deadline-property" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700">
                    <option>Nessuno</option>
                    {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">Annulla</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-sm hover:bg-primary-700">Aggiungi Scadenza</button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default ScadenzeScreen;