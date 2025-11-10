import { useMemo } from 'react';
import { Plus } from 'lucide-react';
import type { Contract } from '@/types';
import InteractiveTable, { type Column } from '@/components/ui/InteractiveTable';
import ExportButton from '@/components/ui/ExportButton';
import { contracts as initialContracts, properties, tenants } from '@/data/store';

const ContrattiScreen = () => {
    const contracts = useMemo(() => {
        return initialContracts.map(contract => {
            const property = properties.find(p => p.id === contract.propertyId);
            const tenant = tenants.find(t => t.id === contract.tenantId);
            return {
                ...contract,
                propertyName: property?.name || 'N/A',
                tenantName: tenant?.name || 'N/A'
            };
        });
    }, []);

    type ContractWithDetails = typeof contracts[0];

    const getStatus = (endDate: string) => {
        const today = new Date();
        const end = new Date(endDate);
        if (end < today) {
            return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300">Scaduto</span>;
        }
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Attivo</span>;
    };
    

    const columns: Column<ContractWithDetails>[] = [
        { accessor: 'id', header: 'ID Contratto', render: item => <span className="font-mono text-xs">{item.id}</span> },
        { accessor: 'tenantName', header: 'Inquilino' },
        { accessor: 'propertyName', header: 'Immobile' },
        { accessor: 'startDate', header: 'Data Inizio', render: item => new Date(item.startDate).toLocaleDateString() },
        { accessor: 'endDate', header: 'Data Fine', render: item => new Date(item.endDate).toLocaleDateString() },
        { accessor: 'rentAmount', header: 'Canone Mensile', render: item => `€ ${item.rentAmount.toFixed(2)}` },
        { accessor: 'endDate', header: 'Stato', render: item => getStatus(item.endDate) },
    ];

    return (
        <div className="p-6 lg:p-8">
            <InteractiveTable
                data={contracts}
                columns={columns}
                searchableColumn="tenantName"
                title="Elenco Contratti"
            >
                <ExportButton data={contracts} filename="contratti.csv" />
                 <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    <Plus size={16} />
                    Aggiungi Contratto
                </button>
            </InteractiveTable>
        </div>
    );
};

export default ContrattiScreen;
