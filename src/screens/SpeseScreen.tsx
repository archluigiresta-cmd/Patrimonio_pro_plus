import { expenses as initialExpenses, properties } from '@/data/store';
import InteractiveTable, { type Column } from '@/components/ui/InteractiveTable';
import type { Expense } from '@/types';
import { Edit, Trash2 } from 'lucide-react';

const SpeseScreen = () => {
    const expenses = initialExpenses.map(expense => ({
        ...expense,
        propertyName: properties.find(p => p.id === expense.propertyId)?.name || 'N/A'
    }));

    type ExpenseWithProperty = typeof expenses[0];

    const columns: Column<ExpenseWithProperty>[] = [
        { accessor: 'title', header: 'Descrizione' },
        { accessor: 'propertyName', header: 'Immobile' },
        { accessor: 'category', header: 'Categoria' },
        { 
            accessor: 'date', 
            header: 'Data',
            render: (item) => new Date(item.date).toLocaleDateString()
        },
        { 
            accessor: 'amount', 
            header: 'Importo',
            render: (item) => <span className="font-semibold text-red-600">-€ {item.amount.toFixed(2)}</span>
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
                data={expenses}
                columns={columns}
                searchableColumn="title"
                title="Elenco Spese"
            />
        </div>
    );
};

export default SpeseScreen;
