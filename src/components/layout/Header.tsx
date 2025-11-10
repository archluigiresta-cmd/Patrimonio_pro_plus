import { Menu, Search, Sun } from 'lucide-react';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
    return (
        <header className="flex items-center justify-between h-20 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                <Menu size={24} />
            </button>
            <div className="flex items-center gap-4">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="text" placeholder="Cerca progetto..." className="w-64 pl-10 pr-4 py-2 border rounded-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <Sun size={22} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                       M
                    </div>
                     <div>
                        <p className="font-semibold text-sm">Mario Rossi</p>
                        <p className="text-xs text-gray-500">Amministratore</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;