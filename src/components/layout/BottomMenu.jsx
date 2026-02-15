import React, { memo, useCallback, useMemo } from 'react';
import { useUI } from '../../context/UIContext';
import { Home, Users, Book } from 'lucide-react';
import './BottomMenu.css';

const BottomMenu = () => {
    const { activeTab, setActiveTab, setCurrentView } = useUI();

    const navItems = useMemo(() => [
        { id: 'create', label: 'Keşfet', icon: <Home size={20} /> },
        { id: 'community', label: 'Topluluk', icon: <Users size={20} /> },
        { id: 'learn', label: 'Akademi', icon: <Book size={20} /> },
    ], []);

    const handleTabChange = useCallback((id) => {
        setActiveTab(id);
        setCurrentView(null);
    }, [setActiveTab, setCurrentView]);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 will-change-transform">
            <div className="menu px-4 py-2 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 flex items-center gap-4">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        className={`group relative flex flex-col items-center gap-1 p-2 transition-all cursor-pointer ${activeTab === item.id ? 'text-primary-600 scale-110' : 'text-neutral-400 hover:text-neutral-600'}`}
                        onClick={() => handleTabChange(item.id)}
                    >
                        <div className={`transition-all duration-300 ${activeTab === item.id ? 'translate-y-[-2px]' : ''}`}>
                            {item.icon}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.1em] transition-all opacity-0 group-hover:opacity-100 ${activeTab === item.id ? 'opacity-100' : ''}`}>
                            {item.label}
                        </span>
                        {activeTab === item.id && (
                            <div className="absolute -bottom-1 w-1 h-1 bg-primary-600 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default memo(BottomMenu);
