import { useMemo } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import type { Deadline } from '@/types';
import InteractiveTable, { type Column } from '@/components/ui/InteractiveTable';
import ExportButton from '@/components/ui/ExportButton';
import { deadlines as initialDeadlines, properties } from '@/data/store';

const ScadenzeScreen = () => {
    const deadlines = useMemo(() => {
        return initialDeadlines.map(deadline => {
            const property = properties.find(p => p.id === deadline.propertyId);
            return {
                ...deadline,
                propertyName: property?.name || 'N/A',
            };
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, []);

    type DeadlineWithDetails = typeof deadlines[0];

    const getStatus = (dateString: string) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        const expiryDate = new Date(dateString);
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { text: 'Scaduto', color: 'text-red-500' };
        if (diffDays <= 30) return { text: `In Scadenza (${diffDays} gg)`, color: 'text-yellow-500' };
        return { text: 'Pianificato', color: 'text-green-500' };
    };
    
    const columns: Column<DeadlineWithDetails>[] = [
        { accessor: 'title', header: 'Descrizione' },
        { accessor: 'propertyName', header: 'Immobile' },
        { accessor: 'type', header: 'Tipo' },
        { accessor: 'date', header: 'Data Scadenza', render: item => new Date(item.date).toLocaleDateString() },
        { 
            accessor: 'date', 
            header: 'Stato', 
            render: item => {
                const status = getStatus(item.date);
                return (
                    <span className={`font-semibold ${status.color} flex items-center gap-1.5`}>
                        {status.text !== 'Pianificato' && <AlertTriangle size={14} />}
                        {status.text}
                    </span>
                )
            }
        },
    ];

    return (
        <div className="p-6 lg:p-8">
            <InteractiveTable
                data={deadlines}
                columns={columns}
                searchableColumn="title"
                title="Elenco Scadenze"
            >
                <ExportButton data={deadlines} filename="scadenze.csv" />
                <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    <Plus size={16} />
                    Aggiungi Scadenza
                </button>
            </InteractiveTable>
        </div>
    );
};

export default ScadenzeScreen;
