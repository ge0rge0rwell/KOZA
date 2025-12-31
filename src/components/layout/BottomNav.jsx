import React from 'react';
import { PlusCircle, Users, BookOpen, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const BottomNav = () => {
    const { activeTab, setActiveTab, currentView } = useApp();

    if (currentView) return null;

    const tabs = [
        { id: 'create', label: 'Oluştur', icon: PlusCircle },
        { id: 'community', label: 'Topluluk', icon: Users },
        { id: 'learn', label: 'Öğren', icon: BookOpen },
        { id: 'profile', label: 'Profil', icon: User }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-around">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${isActive ? 'text-primary-600' : 'text-neutral-500 hover:text-neutral-900'
                                    }`}
                            >
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-xs font-medium">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default BottomNav;
