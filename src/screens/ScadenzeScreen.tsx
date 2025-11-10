import { deadlines as initialDeadlines, properties } from '@/data/store';
import InteractiveTable, { type Column } from '@/components/ui/InteractiveTable';
import type { Deadline } from '@/types';
import { Edit, Trash2 } from 'lucide-react';

const ScadenzeScreen = () => {
    const deadlines = initialDeadlines.map(deadline => ({
        ...deadline,
        propertyName: properties.find(p => p.id === deadline.propertyId)?.name || 'N/A'
    }));

    type DeadlineWithProperty = typeof deadlines[0];

    const getStatus = (dateString: string) => {
        if (!dateString) return { text: 'N/D', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' };
        const today = new Date();
        today.setHours(0,0,0,0);
        const expiryDate = new Date(dateString);
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { text: 'Scaduto', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' };
        if (diffDays <= 30) return { text: `In Scadenza`, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' };
        return { text: 'Attivo', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' };
    };

    const columns: Column<DeadlineWithProperty>[] = [
        { accessor: 'title', header: 'Oggetto' },
        { accessor: 'propertyName', header: 'Immobile' },
        { accessor: 'type', header: 'Tipo' },
        { 
            accessor: 'date', 
            header: 'Data Scadenza',
            render: (item) => new Date(item.date).toLocaleDateString()
        },
        { 
            accessor: 'id', 
            header: 'Stato',
            render: (item) => {
                const status = getStatus(item.date);
                return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>{status.text}</span>
            }
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
                data={deadlines}
                columns={columns}
                searchableColumn="title"
                title="Elenco Scadenze"
            />
        </div>
    );
};

export default ScadenzeScreen;
