import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import type { Tenant } from '@/types';
import InteractiveTable, { type Column } from '@/components/ui/InteractiveTable';
import ExportButton from '@/components/ui/ExportButton';
import { tenants as initialTenants, properties } from '@/data/store';

const InquiliniScreen = () => {
    const tenants = useMemo(() => {
        return initialTenants.map(tenant => {
            const property = properties.find(p => p.id === tenant.propertyId);
            return {
                ...tenant,
                propertyName: property?.name || 'N/A',
                propertyAddress: property?.address || 'N/A'
            };
        });
    }, []);

    type TenantWithProperty = typeof tenants[0];

    const columns: Column<TenantWithProperty>[] = [
        { accessor: 'name', header: 'Nome' },
        { accessor: 'email', header: 'Email' },
        { accessor: 'phone', header: 'Telefono' },
        {
            accessor: 'propertyName',
            header: 'Immobile Affittato',
            render: (item) => (
                <div>
                    <p className="font-medium text-gray-800 dark:text-white">{item.propertyName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.propertyAddress}</p>
                </div>
            )
        },
    ];

    return (
        <div className="p-6 lg:p-8">
            <InteractiveTable
                data={tenants}
                columns={columns}
                searchableColumn="name"
                title="Elenco Inquilini"
            >
                <ExportButton data={tenants} filename="inquilini.csv" />
                <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    <Plus size={16} />
                    Aggiungi Inquilino
                </button>
            </InteractiveTable>
        </div>
    );
};

export default InquiliniScreen;
