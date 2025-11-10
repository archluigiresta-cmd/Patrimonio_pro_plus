import { DollarSign, Building, AlertTriangle, CheckCircle, Calendar, TrendingDown } from 'lucide-react';
import Card from '@/components/ui/Card';
import { deadlines, expenses, properties } from '@/data/store';

const DashboardScreen = () => {
    const totalProperties = properties.length;
    const rentedProperties = properties.filter(p => p.status === 'Affittato').length;
    const occupancyRate = totalProperties > 0 ? Math.round((rentedProperties / totalProperties) * 100) : 0;
    const upcomingDeadlines = deadlines.filter(d => new Date(d.date) > new Date()).length;

    const kpiData = [
        { title: 'Entrate Mensili Stimate', value: '€ 4.200,00', icon: DollarSign, color: 'text-green-500' },
        { title: 'Immobili Occupati', value: `${occupancyRate}%`, icon: Building, color: 'text-blue-500' },
        { title: 'Scadenze Prossime', value: upcomingDeadlines.toString(), icon: AlertTriangle, color: 'text-yellow-500' },
        { title: 'Task Completati', value: '1', icon: CheckCircle, color: 'text-purple-500' }
    ];

    const sortedDeadlines = [...deadlines].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="p-6 lg:p-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(item => (
                    <Card key={item.title}>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${item.color}`}>
                                <item.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.title}</h3>
                                <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{item.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                     <Card className="h-full">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Prossime Scadenze</h2>
                        {sortedDeadlines.length > 0 ? (
                             <div className="space-y-4">
                                {sortedDeadlines.slice(0, 5).map(deadline => (
                                    <div key={deadline.id} className="flex items-start gap-3">
                                        <div className="mt-1 p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full text-yellow-600 dark:text-yellow-400">
                                            <Calendar size={16} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-gray-200">{deadline.title}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(deadline.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
                               <p>Nessuna scadenza imminente.</p>
                               <p className="text-sm mt-1">Tutto sotto controllo!</p>
                            </div>
                        )}
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card className="h-full">
                         <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Spese Recenti</h2>
                         <div className="space-y-4">
                            {sortedExpenses.slice(0, 4).map(expense => (
                                <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full text-red-600 dark:text-red-400">
                                            <TrendingDown size={16} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-gray-200">{expense.title}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{expense.category} - {new Date(expense.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-red-500">-€{expense.amount.toFixed(2)}</p>
                                </div>
                            ))}
                         </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;