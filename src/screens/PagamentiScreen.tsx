import { payments as initialPayments, contracts, properties, tenants } from '@/data/store';
import InteractiveTable, { type Column } from '@/components/ui/InteractiveTable';
import type { Payment } from '@/types';

const PagamentiScreen = () => {
    const payments = initialPayments.map(payment => {
        const contract = contracts.find(c => c.id === payment.contractId);
        const property = properties.find(p => p.id === contract?.propertyId);
        const tenant = tenants.find(t => t.id === contract?.tenantId);
        return {
            ...payment,
            propertyName: property?.name || 'N/A',
            tenantName: tenant?.name || 'N/A',
        };
    });

    type PaymentWithDetails = typeof payments[0];

    const getStatusChip = (status: Payment['status']) => {
        switch (status) {
            case 'Pagato': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'In Attesa': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'In Ritardo': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const columns: Column<PaymentWithDetails>[] = [
        { 
            accessor: 'id', 
            header: 'ID Pagamento',
            render: (item) => <span className="font-mono text-xs">{item.id}</span>
        },
        { accessor: 'tenantName', header: 'Inquilino' },
        { accessor: 'propertyName', header: 'Immobile' },
        { 
            accessor: 'date', 
            header: 'Data Pagamento',
            render: (item) => new Date(item.date).toLocaleDateString()
        },
        { 
            accessor: 'amount', 
            header: 'Importo',
            render: (item) => `€ ${item.amount.toFixed(2)}`
        },
        {
            accessor: 'status',
            header: 'Stato',
            render: (item) => (
                 <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChip(item.status)}`}>
                    {item.status}
                </span>
            )
        }
    ];

    return (
        <div className="p-6 lg:p-8">
            <InteractiveTable
                data={payments}
                columns={columns}
                searchableColumn="tenantName"
                title="Registro Pagamenti"
            />
        </div>
    );
};

export default PagamentiScreen;
