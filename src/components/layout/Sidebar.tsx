import React, { useState } from 'react';
import { Building2, LogOut } from 'lucide-react';
import { SIDEBAR_NAV_ITEMS } from '../../constants';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
    const [activeId, setActiveId] = useState(() => {
        const currentPath = window.location.pathname;
        const activeItem = SIDEBAR_NAV_ITEMS.find(item => item.path === currentPath);
        return activeItem ? activeItem.id : 'dashboard';
    });

    const navigate = (path: string) => {
        const navigateEvent = new CustomEvent('navigate', { detail: { path } });
        window.dispatchEvent(navigateEvent);
    };

    return (
        <aside className={`flex flex-col bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-lg ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className={`flex items-center h-20 border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'justify-center' : 'px-6'}`}>
                <Building2 className="text-blue-500" size={isCollapsed ? 32 : 28} />
                {!isCollapsed && <h1 className="ml-3 text-2xl font-bold text-gray-800 dark:text-white">PRO+</h1>}
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {SIDEBAR_NAV_ITEMS.map(item => {
                    if (item.type === 'spacer') {
                        return <div key={item.id} className="h-4" />;
                    }
                    const isActive = activeId === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.path) {
                                    setActiveId(item.id);
                                    navigate(item.path);
                                }
                            }}
                            className={`w-full flex items-center py-2.5 rounded-lg transition-colors duration-200 ${isCollapsed ? 'px-3 justify-center' : 'px-4'} ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                            title={item.label}
                        >
                            <item.icon size={22} />
                            {!isCollapsed && <span className="ml-4 font-medium">{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            <div className={`p-4 border-t border-gray-200 dark:border-gray-700 ${isCollapsed ? 'flex justify-center' : ''}`}>
                 <button className={`w-full flex items-center py-2.5 rounded-lg transition-colors duration-200 ${isCollapsed ? 'px-3 justify-center' : 'px-4'} hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300`}>
                    <LogOut size={22} />
                    {!isCollapsed && <span className="ml-4 font-medium">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
