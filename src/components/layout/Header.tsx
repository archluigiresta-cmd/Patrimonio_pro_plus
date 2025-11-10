import { Menu, Search, Moon, Sun, ChevronDown } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header = ({ toggleSidebar, isCollapsed, theme, toggleTheme }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700/50 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <Menu size={22} />
        </button>
        <div className="relative hidden md:block">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
                type="text" 
                placeholder="Cerca ovunque..."
                className="w-80 pl-10 pr-4 py-2 text-sm border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="h-8 border-l border-gray-200 dark:border-gray-700"></div>

        <button className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-600 text-primary-700 dark:text-primary-300 font-bold">
                LR
            </div>
            <div className="hidden md:block text-left">
                <p className="font-semibold text-sm text-gray-800 dark:text-white">Luigi Resta</p>
                <p className="text-xs text-gray-500">luigi.resta@email.com</p>
            </div>
             <ChevronDown size={16} className="text-gray-500 hidden md:block" />
        </button>
      </div>
    </header>
  );
};

export default Header;
