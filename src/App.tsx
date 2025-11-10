import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardScreen from './screens/DashboardScreen';
import ImmobiliScreen from './screens/ImmobiliScreen';
import VeicoliScreen from './screens/VeicoliScreen';
import InquiliniScreen from './screens/InquiliniScreen';
import ContrattiScreen from './screens/ContrattiScreen';
import PagamentiScreen from './screens/PagamentiScreen';
import ScadenzeScreen from './screens/ScadenzeScreen';
import SpeseScreen from './screens/SpeseScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';
import { SIDEBAR_NAV_ITEMS } from './config/navigation';

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });
  const [activePath, setActivePath] = useState(window.location.hash.substring(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setActivePath(window.location.hash.substring(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    // Set initial route
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const renderContent = () => {
    const currentPath = activePath.startsWith('/') ? activePath : '/' + activePath;
    switch (currentPath) {
      case '/': return <DashboardScreen />;
      case '/immobili': return <ImmobiliScreen />;
      case '/veicoli': return <VeicoliScreen />;
      case '/inquilini': return <InquiliniScreen />;
      case '/contratti': return <ContrattiScreen />;
      case '/pagamenti': return <PagamentiScreen />;
      case '/scadenze': return <ScadenzeScreen />;
      case '/spese': return <SpeseScreen />;
      default:
        const currentItem = SIDEBAR_NAV_ITEMS.find(item => item.path === currentPath);
        return <PlaceholderScreen pageTitle={currentItem?.label || 'Pagina'} />;
    }
  };

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
      <Sidebar isCollapsed={isSidebarCollapsed} activePath={activePath.startsWith('/') ? activePath : '/' + activePath} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isCollapsed={isSidebarCollapsed}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
