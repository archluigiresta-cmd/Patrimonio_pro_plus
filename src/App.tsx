import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardScreen from '@/screens/DashboardScreen';
import ImmobiliScreen from '@/screens/ImmobiliScreen';
import VeicoliScreen from '@/screens/VeicoliScreen';
import PlaceholderScreen from '@/screens/PlaceholderScreen';

// Semplice router lato client basato sull'hash
const useRouter = () => {
    const [route, setRoute] = useState(window.location.hash.substring(1) || '/');

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash.substring(1) || '/');
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const navigate = (path: string) => {
        window.location.hash = path;
    };
    
    // Inizializza il percorso se non è presente l'hash
    if (window.location.hash === '') {
        window.location.hash = '/';
    }

    return { route, navigate };
};


const AppRouter = ({ route }: { route: string }) => {
    // Estrae il titolo della pagina dal percorso per il placeholder
    const pageTitle = route.length > 1 ? route.charAt(1).toUpperCase() + route.slice(2) : 'Dashboard';

    switch (route) {
        case '/':
            return <DashboardScreen />;
        case '/immobili':
            return <ImmobiliScreen />;
        case '/veicoli':
            return <VeicoliScreen />;
        // Aggiungi qui gli altri case per le nuove schermate
        case '/inquilini':
        case '/contratti':
        case '/pagamenti':
        case '/scadenze':
        case '/manutenzioni':
        case '/spese':
        case '/documenti':
        case '/report':
        case '/analisi-finanziaria':
        case '/impostazioni':
        case '/aiuto':
            return <PlaceholderScreen pageTitle={pageTitle} />;
        default:
            return <DashboardScreen />;
    }
}

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { route } = useRouter();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };
  
  return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Sidebar isCollapsed={isSidebarCollapsed} activePath={route} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
             <AppRouter route={route} />
          </main>
        </div>
      </div>
  );
};

export default App;