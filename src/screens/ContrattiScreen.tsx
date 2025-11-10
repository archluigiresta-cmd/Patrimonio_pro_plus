import { useState } from 'react';
import { Plus, FileText, Calendar, User, Euro } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import Modal from '@/components/ui/Modal';
import { properties, tenants, getContractsByPropertyId, getTenantById } from '@/data/store';

const ContrattiScreen = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestione Contratti</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    <Plus size={16} />
                    Nuovo Contratto
                </button>
            </div>

            <Accordion>
                 {properties.map(prop => {
                    const contratti = getContractsByPropertyId(prop.id);
                    return (
                        <Accordion.Item 
                            key={prop.id}
                            title={
                                <div className="flex items-center gap-3">
                                    <span>{prop.name}</span>
                                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                                        {contratti.length}
                                    </span>
                                </div>
                            }
                        >
                            {contratti.length > 0 ? (
                                 <ul className="space-y-3">
                                    {contratti.map(contratto => {
                                        const inquilino = getTenantById(contratto.tenantId);
                                        return (
                                            <li key={contratto.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start gap-4">
                                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-white">Contratto di Locazione</p>
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        <span className="flex items-center gap-1.5"><User size={14} /> {inquilino?.name || 'N/D'}</span>
                                                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(contratto.startDate).toLocaleDateString()} - {new Date(contratto.endDate).toLocaleDateString()}</span>
                                                        <span className="flex items-center gap-1.5 font-semibold text-gray-600 dark:text-gray-300"><Euro size={14} /> {contratto.rentAmount.toFixed(2)}/mese</span>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                 </ul>
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400 py-4">Nessun contratto attivo per questo immobile.</p>
                            )}
                        </Accordion.Item>
                    )}
                )}
            </Accordion>
            
            <Modal title="Aggiungi Nuovo Contratto" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form className="space-y-4">
                     <div>
                        <label htmlFor="property" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Immobile</label>
                        <select id="property" name="property" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700">
                            <option>Seleziona un immobile libero</option>
                            {properties.filter(p => p.status === 'Libero').map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="tenant" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Inquilino</label>
                        <select id="tenant" name="tenant" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700">
                            <option>Seleziona un inquilino</option>
                            {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data Inizio</label>
                            <input type="date" name="startDate" id="startDate" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Data Fine</label>
                            <input type="date" name="endDate" id="endDate" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="rent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Canone Mensile (€)</label>
                        <input type="number" name="rent" id="rent" defaultValue="0" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">Annulla</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-sm hover:bg-primary-700">Aggiungi Contratto</button>
                    </div>
                </form>
            </Modal>

        </div>
    );
};

export default ContrattiScreen;