import { DollarSign, Building, AlertTriangle, CheckCircle } from 'lucide-react';
import Card from '@/components/ui/Card';

const kpiData = [
    { title: 'Entrate Mensili Stimate', value: '€ 4.200,00', icon: DollarSign, color: 'text-green-500' },
    { title: 'Immobili Occupati', value: '67%', icon: Building, color: 'text-blue-500' },
    { title: 'Scadenze Prossime', value: '0', icon: AlertTriangle, color: 'text-yellow-500' },
    { title: 'Task Completati', value: '1', icon: CheckCircle, color: 'text-purple-500' }
];

const recentExpenses = [
    { title: 'Acconto IMU', category: 'Tasse', amount: '€1.200', date: '16/06/2024', color: 'text-red-500' },
    { title: 'Bolletta luce Marzo-Aprile', category: 'Utenze', amount: '€85,50', date: '15/04/2024', color: 'text-red-500' },
    { title: 'Spese condominiali Aprile', category: 'Condominio', amount: '€250', date: '05/04/2024', color: 'text-red-500' },
    { title: 'Riparazione caldaia', category: 'Manutenzione', amount: '€200', date: '18/03/2024', color: 'text-red-500' }
];

const DashboardScreen = () => {
    return (
        <div className="p-6 lg:p-8 space-y-8">
            {/* KPI Cards */}
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
            
            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Prossime Scadenze */}
                <div className="lg:col-span-1">
                     <Card className="h-full">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Prossime Scadenze</h2>
                        <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
                           <p>Nessuna scadenza imminente.</p>
                           <p className="text-sm mt-1">Tutto sotto controllo!</p>
                        </div>
                    </Card>
                </div>

                {/* Spese Recenti */}
                <div className="lg:col-span-2">
                    <Card className="h-full">
                         <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Spese Recenti</h2>
                         <div className="space-y-4">
                            {recentExpenses.map(expense => (
                                <div key={expense.title} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{expense.title}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{expense.category} - {expense.date}</p>
                                    </div>
                                    <p className={`font-semibold ${expense.color}`}>{expense.amount}</p>
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