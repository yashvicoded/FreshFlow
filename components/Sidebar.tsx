import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, TrendingUp, Share2, BarChart2, Settings, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Inventory', path: '/inventory', icon: <Package size={20} /> },
        { name: 'Pricing Engine', path: '/pricing', icon: <Tag size={20} /> },
        { name: 'Forecasting', path: '/forecasting', icon: <TrendingUp size={20} /> },
        { name: 'Redistribution', path: '/redistribution', icon: <Share2 size={20} /> },
        { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
        { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
            <div className="p-6 flex items-center space-x-2 border-b border-gray-100">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">F</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">FreshFlow</h1>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                isActive
                                    ? 'bg-green-50 text-green-600 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center space-x-3 px-4 py-3 w-full text-gray-600 hover:text-red-600 transition-colors">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;