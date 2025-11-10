import { contracts as initialContracts, properties, tenants } from '@/data/store';
import InteractiveTable, { type Column } from '@/components/ui/InteractiveTable';
import type { Contract } from '@/types';
import { Edit, FileText, Trash2 } from 'lucide-react';

const ContrattiScreen = () => {
    const contracts = initialContracts.map(contract => ({
        ...contract,
        propertyName: properties.find(p => p.id === contract.propertyId)?.name || 'N/A',
        tenantName: tenants.find(t => t.id === contract.tenantId)?.name || 'N/A'
    }));

    type ContractWithDetails = typeof contracts[0];

    const columns: Column<ContractWithDetails>[] = [
        { 
            accessor: 'id', 
            header: 'ID Contratto',
            render: (item) => <span className="font-mono text-xs">{item.id}</span>
        },
        { accessor: 'propertyName', header: 'Immobile' },
        { accessor: 'tenantName', header: 'Inquilino' },
        {
            accessor: 'startDate',
            header: 'Periodo',
            render: (item) => (
                <span>
                    {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                </span>
            )
        },
        {
            accessor: 'rentAmount',
            header: 'Canone Mensile',
            render: (item) => `€ ${item.rentAmount.toFixed(2)}`
        },
        {
            accessor: 'id',
            header: 'Azioni',
            render: () => (
                 <div className="flex gap-4">
                    <button className="text-gray-400 hover:text-blue-500"><FileText size={18} /></button>
                    <button className="text-gray-400 hover:text-primary-600"><Edit size={18} /></button>
                    <button className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                </div>
            )
        }
    ];

    return (
        <div className="p-6 lg:p-8">
            <InteractiveTable
                data={contracts}
                columns={columns}
                searchableColumn="propertyName"
                title="Elenco Contratti"
            />
        </div>
    );
};

export default ContrattiScreen;
