import { useMemo } from 'react';
import { Plus, TrendingDown } from 'lucide-react';
import type { Expense } from '@/types';
import InteractiveTable, { type Column } from '@/components/ui/InteractiveTable';
import ExportButton from '@/components/ui/ExportButton';
import { expenses as initialExpenses, properties } from '@/data/store';

const SpeseScreen = () => {
    const expenses = useMemo(() => {
        return initialExpenses.map(expense => {
            const property = properties.find(p => p.id === expense.propertyId);
            return {
                ...expense,
                propertyName: property?.name || 'N/A',
            };
        });
    }, []);

    type ExpenseWithDetails = typeof expenses[0];
    
    const columns: Column<ExpenseWithDetails>[] = [
        { accessor: 'title', header: 'Descrizione' },
        { accessor: 'propertyName', header: 'Immobile di Riferimento' },
        { accessor: 'category', header: 'Categoria' },
        { accessor: 'date', header: 'Data', render: item => new Date(item.date).toLocaleDateString() },
        { 
            accessor: 'amount', 
            header: 'Importo', 
            render: item => (
                <span className="font-semibold text-red-500 flex items-center gap-1">
                    <TrendingDown size={14} />
                    €{item.amount.toFixed(2)}
                </span>
            )
        },
    ];

    return (
        <div className="p-6 lg:p-8">
            <InteractiveTable
                data={expenses}
                columns={columns}
                searchableColumn="title"
                title="Registro Spese"
            >
                <ExportButton data={expenses} filename="spese.csv" />
                 <button
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    <Plus size={16} />
                    Aggiungi Spesa
                </button>
            </InteractiveTable>
        </div>
    );
};

export default SpeseScreen;
