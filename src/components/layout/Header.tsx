import { Menu, RefreshCw, User, LogOut } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
    toggleSidebar: () => void;
}

const UserMenu = () => (
    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical">
        <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Luigi Resta</p>
                <p className="text-sm text-gray-500 truncate">luigi.resta@example.com</p>
            </div>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 px-4 py-2 text-sm" role="menuitem">
                <User size={16} /> Profilo
            </a>
            <a href="#" className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 px-4 py-2 text-sm" role="menuitem">
                <LogOut size={16} /> Esci
            </a>
        </div>
    </div>
);

const Header = ({ toggleSidebar }: HeaderProps) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <header className="flex-shrink-0 flex items-center justify-between h-20 px-6 bg-white dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700/50">
            {/* Left side: toggle and breadcrumbs */}
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="p-2 rounded-lg -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 md:hidden">
                    <Menu size={24} />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">Scadenze</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Progetto Esempio (Demo)</p>
                </div>
            </div>

            {/* Right side: actions and user menu */}
            <div className="flex items-center gap-4">
                 <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                    <RefreshCw size={14} />
                    Cambia Progetto
                 </button>
                 <div className="relative">
                    <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                           LR
                        </div>
                    </button>
                    {userMenuOpen && <UserMenu />}
                 </div>
            </div>
        </header>
    );
};

export default Header;