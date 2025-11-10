import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { expenses as initialExpenses, properties, getPropertyById } from '@/data/store';

const SpeseScreen = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Registro Spese</h1>
        <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
            <Plus size={16} />
            Aggiungi Spesa
        </button>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descrizione</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Immobile</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Data</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Importo</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Azioni</span></th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                {expenses.map(expense => {
                    const property = getPropertyById(expense.propertyId);
                    return (
                        <tr key={expense.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{expense.title}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{expense.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {property?.name || 'N/D'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {new Date(expense.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-500">
                                -€{expense.amount.toFixed(2)}
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
      
      <Modal title="Aggiungi Nuova Spesa" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="space-y-4">
            <div>
                <label htmlFor="expense-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrizione Spesa</label>
                <input type="text" name="expense-title" id="expense-title" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" placeholder="Es. Bolletta luce" />
            </div>
            <div>
                <label htmlFor="expense-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoria</label>
                <select id="expense-category" name="expense-category" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700">
                    <option>Tasse</option>
                    <option>Utenze</option>
                    <option>Condominio</option>
                    <option>Manutenzione</option>
                    <option>Altro</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="expense-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Importo (€)</label>
                    <input type="number" name="expense-amount" id="expense-amount" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                </div>
                <div>
                    <label htmlFor="expense-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data</label>
                    <input type="date" name="expense-date" id="expense-date" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                </div>
            </div>
            <div>
                <label htmlFor="expense-property" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Immobile di Riferimento</label>
                <select id="expense-property" name="expense-property" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700">
                    <option>Nessuno</option>
                    {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">Annulla</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-sm hover:bg-primary-700">Aggiungi Spesa</button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default SpeseScreen;