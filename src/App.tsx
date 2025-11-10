import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardScreen from './screens/DashboardScreen';
import PropertiesScreen from './screens/PropertiesScreen';

const AppRouter = () => {
    const [route, setRoute] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => setRoute(window.location.pathname);
        const handleNavigate = (e: Event) => {
            const customEvent = e as CustomEvent;
            const path = customEvent.detail.path;
            if (path !== window.location.pathname) {
                window.history.pushState({}, '', path);
            }
            setRoute(path);
        };
        
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('navigate', handleNavigate);
        
        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('navigate', handleNavigate);
        };
    }, []);

    switch (route) {
        case '/':
        case '/dashboard':
            return <DashboardScreen />;
        case '/immobili':
            return <PropertiesScreen />;
        default:
            return (
                <div className="p-8">
                    <h1 className="text-3xl font-bold dark:text-white">In costruzione</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Questa sezione sarà presto disponibile.</p>
                </div>
            );
    }
}

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };
  
  return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-700">
             <AppRouter />
          </main>
        </div>
      </div>
  );
};

export default App;