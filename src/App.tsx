import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardScreen from '@/screens/DashboardScreen';
import ImmobiliScreen from '@/screens/ImmobiliScreen';
import VeicoliScreen from '@/screens/VeicoliScreen';
import InquiliniScreen from '@/screens/InquiliniScreen';
import ContrattiScreen from '@/screens/ContrattiScreen';
import SpeseScreen from '@/screens/SpeseScreen';
import ScadenzeScreen from '@/screens/ScadenzeScreen';
import PlaceholderScreen from '@/screens/PlaceholderScreen';

// Semplice router lato client basato sull'hash
const useRouter = () => {
    const [route, setRoute] = useState(window.location.hash.substring(1) || '/');

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash.substring(1) || '/');
        };

        window.addEventListener('hashchange', handleHashChange);
        
        // Inizializza il percorso se non è presente l'hash
        if (window.location.hash === '') {
            window.location.hash = '/';
        }

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);
    
    return { route };
};


const AppRouter = ({ route }: { route: string }) => {
    const pageTitle = route.length > 1 ? route.charAt(1).toUpperCase() + route.slice(2) : 'Dashboard';

    switch (route) {
        case '/':
            return <DashboardScreen />;
        case '/immobili':
            return <ImmobiliScreen />;
        case '/veicoli':
            return <VeicoliScreen />;
        case '/inquilini':
            return <InquiliniScreen />;
        case '/contratti':
            return <ContrattiScreen />;
        case '/spese':
            return <SpeseScreen />;
        case '/scadenze':
            return <ScadenzeScreen />;
        case '/pagamenti':
        case '/manutenzioni':
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