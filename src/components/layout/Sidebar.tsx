import { useState } from 'react';
import { Building, LogOut, ChevronDown, ChevronRight } from 'lucide-react';
import { SIDEBAR_NAV_ITEMS } from '@/config/navigation';
import type { NavItem } from '@/types';

interface SidebarProps {
  isCollapsed: boolean;
  activePath: string;
}

const Sidebar = ({ isCollapsed, activePath }: SidebarProps) => {

    const navigate = (path: string) => {
        window.location.hash = path;
    };

    return (
        <aside className={`flex flex-col bg-white dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className={`flex items-center gap-3 h-20 border-b border-gray-200 dark:border-gray-700/50 ${isCollapsed ? 'justify-center' : 'px-6'}`}>
                <div className="bg-primary-600 p-2 rounded-lg">
                    <Building className="text-white" size={isCollapsed ? 28 : 24} />
                </div>
                {!isCollapsed && <h1 className="text-xl font-bold text-gray-800 dark:text-white">Gest-Immo</h1>}
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1.5">
                {SIDEBAR_NAV_ITEMS.map(item => {
                    if (item.type === 'spacer') {
                        return <div key={item.id} className="h-4" />;
                    }
                    const isActive = activePath === item.path || (activePath === '/' && item.id === 'dashboard');
                    return (
                        <button
                            key={item.id}
                            onClick={() => item.path && navigate(item.path)}
                            className={`w-full flex items-center py-2.5 rounded-lg transition-colors duration-200 ${isCollapsed ? 'px-3 justify-center' : 'px-4'} ${isActive ? 'bg-primary-600 text-white shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                            title={item.label}
                        >
                            <item.icon size={20} />
                            {!isCollapsed && <span className="ml-3 font-medium text-sm">{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            <div className={`p-3 border-t border-gray-200 dark:border-gray-700/50`}>
                 <button className={`w-full flex items-center text-left py-2 rounded-lg transition-colors duration-200 ${isCollapsed ? 'px-3 justify-center' : 'px-4'} hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300`}>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 text-primary-700 dark:text-primary-300 font-bold">
                        LR
                    </div>
                    {!isCollapsed && (
                        <div className="ml-3 flex-1">
                            <p className="font-semibold text-sm">Luigi Resta</p>
                            <p className="text-xs text-gray-500">Free Plan</p>
                        </div>
                    )}
                    {!isCollapsed && <ChevronRight size={16} />}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
