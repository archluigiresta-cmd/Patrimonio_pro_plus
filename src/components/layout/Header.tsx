import { Menu, Sun, Moon, Bell, ChevronDown, Search } from 'lucide-react';

interface HeaderProps {
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    pageTitle: string;
}

const Header = ({ isSidebarCollapsed, toggleSidebar, isDarkMode, toggleDarkMode, pageTitle }: HeaderProps) => {
    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 -ml-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
                    aria-label="Toggle sidebar"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white hidden sm:block">{pageTitle}</h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cerca globale..."
                        className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>
                
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

                <button className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 text-primary-700 dark:text-primary-300 font-bold">
                        LR
                    </div>
                    <div className="hidden lg:block text-left">
                        <p className="font-semibold text-sm text-gray-800 dark:text-white">Luigi Resta</p>
                        <p className="text-xs text-gray-500">Free Plan</p>
                    </div>
                    <ChevronDown size={16} className="text-gray-500 hidden lg:block" />
                </button>
            </div>
        </header>
    );
};

export default Header;
