import { tenants as initialTenants, properties } from '@/data/store';
import InteractiveTable, { type Column } from '@/components/ui/InteractiveTable';
import type { Tenant } from '@/types';
import { Mail, Phone, Edit, Trash2 } from 'lucide-react';

const InquiliniScreen = () => {
    const tenants = initialTenants.map(tenant => ({
        ...tenant,
        propertyName: properties.find(p => p.id === tenant.propertyId)?.name || 'N/A'
    }));

    type TenantWithProperty = typeof tenants[0];

    const columns: Column<TenantWithProperty>[] = [
        {
            accessor: 'name',
            header: 'Nome',
            render: (item) => (
                <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
            )
        },
        {
            accessor: 'email',
            header: 'Contatti',
            render: (item) => (
                <div>
                    <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-gray-400"/> {item.email}
                    </div>
                     <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone size={14} className="text-gray-400"/> {item.phone}
                    </div>
                </div>
            )
        },
        {
            accessor: 'propertyName',
            header: 'Immobile Affittato'
        },
        {
            accessor: 'id',
            header: 'Azioni',
            render: () => (
                <div className="flex gap-4">
                    <button className="text-gray-400 hover:text-primary-600"><Edit size={18} /></button>
                    <button className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                </div>
            )
        }
    ];

    return (
        <div className="p-6 lg:p-8">
            <InteractiveTable
                data={tenants}
                columns={columns}
                searchableColumn="name"
                title="Elenco Inquilini"
            />
        </div>
    );
};

export default InquiliniScreen;
