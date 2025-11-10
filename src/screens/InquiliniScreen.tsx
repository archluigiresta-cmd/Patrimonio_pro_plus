import { useState } from 'react';
import { Plus, User, Mail, Phone } from 'lucide-react';
import Accordion from '@/components/ui/Accordion';
import Modal from '@/components/ui/Modal';
import { properties, getTenantsByPropertyId } from '@/data/store';

const InquiliniScreen = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Elenco Inquilini</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    <Plus size={16} />
                    Aggiungi Inquilino
                </button>
            </div>

            <Accordion>
                {properties.map(prop => {
                    const inquilini = getTenantsByPropertyId(prop.id);
                    return (
                        <Accordion.Item 
                            key={prop.id}
                            title={
                                <div className="flex items-center gap-3">
                                    <span>{prop.name}</span>
                                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                                        {inquilini.length}
                                    </span>
                                </div>
                            }
                        >
                            {inquilini.length > 0 ? (
                                 <ul className="space-y-3">
                                    {inquilini.map(inquilino => (
                                        <li key={inquilino.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start gap-4">
                                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-300">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-white">{inquilino.name}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    <span className="flex items-center gap-1.5"><Mail size={14} /> {inquilino.email}</span>
                                                    <span className="flex items-center gap-1.5"><Phone size={14} /> {inquilino.phone}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                 </ul>
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400 py-4">Nessun inquilino assegnato a questo immobile.</p>
                            )}
                        </Accordion.Item>
                    );
                })}
            </Accordion>
            
            <Modal title="Aggiungi Nuovo Inquilino" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                        <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefono</label>
                        <input type="tel" name="phone" id="phone" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700" />
                    </div>
                    <div>
                        <label htmlFor="property" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assegna a Immobile</label>
                        <select id="property" name="property" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700">
                            <option>Seleziona immobile</option>
                            {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">Annulla</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-sm hover:bg-primary-700">Aggiungi Inquilino</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default InquiliniScreen;