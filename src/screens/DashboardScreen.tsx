import Card from '../components/ui/Card';

const DashboardScreen = () => {
    const summaryData = {
        totalValue: 850000,
        propertyCount: 5,
        tenantCount: 3,
        upcomingDeadlines: 2,
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-blue-500">
                    <h3 className="text-gray-500 dark:text-gray-400">Valore Totale Patrimonio</h3>
                    <p className="text-3xl font-bold mt-2">€ {summaryData.totalValue.toLocaleString('it-IT')}</p>
                </Card>
                 <Card className="border-l-4 border-green-500">
                    <h3 className="text-gray-500 dark:text-gray-400">Immobili Gestiti</h3>
                    <p className="text-3xl font-bold mt-2">{summaryData.propertyCount}</p>
                </Card>
                <Card className="border-l-4 border-yellow-500">
                    <h3 className="text-gray-500 dark:text-gray-400">Inquilini Attivi</h3>
                    <p className="text-3xl font-bold mt-2">{summaryData.tenantCount}</p>
                </Card>
                <Card className="border-l-4 border-red-500">
                    <h3 className="text-gray-500 dark:text-gray-400">Scadenze a 30gg</h3>
                    <p className="text-3xl font-bold mt-2">{summaryData.upcomingDeadlines}</p>
                </Card>
            </div>
            
            <div className="mt-8">
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Panoramica Recente</h2>
                    <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      Grafico andamento entrate/uscite (da implementare)
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardScreen;