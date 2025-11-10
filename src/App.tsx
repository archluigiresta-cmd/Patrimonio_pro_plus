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
  const [activePath, setActivePath] = useState(window.location.hash || '#/');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const handleHashChange = () => {
      setActivePath(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const renderScreen = () => {
    const path = activePath.substring(1); // remove '#'
    switch (path) {
      case '':
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
      case '/pagamenti':
        return <PagamentiScreen />;
      case '/scadenze':
        return <ScadenzeScreen />;
      case '/spese':
        return <SpeseScreen />;
      default:
        const navItem = SIDEBAR_NAV_ITEMS.find(item => item.path === path);
        return <PlaceholderScreen pageTitle={navItem?.label || 'Pagina non trovata'} />;
    }
  };

  const getPageTitle = () => {
    const path = activePath.substring(1);
    if (path === '/' || path === '') return 'Dashboard';
    const currentNavItem = SIDEBAR_NAV_ITEMS.find(item => item.path === path);
    return currentNavItem?.label || 'Gest-Immo';
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar isCollapsed={isSidebarCollapsed} activePath={activePath.substring(1)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          pageTitle={getPageTitle()}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900/95">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
};

export default App;
