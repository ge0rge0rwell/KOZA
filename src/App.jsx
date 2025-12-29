import React from 'react';
import { useApp } from './context/AppContext';
import CreateTab from './tabs/CreateTab';
import CommunityTab from './tabs/CommunityTab';
import LearnTab from './tabs/LearnTab';
import ProfileTab from './tabs/ProfileTab';
import StoryView from './views/StoryView';
import GameView from './views/GameView';
import { Bell, PlusCircle, Users, BookOpen, User } from 'lucide-react';

const App = () => {
    const { currentView, setCurrentView, activeTab, setActiveTab, notification, user } = useApp();

    const renderContent = () => {
        if (currentView?.type === 'story') {
            return <StoryView story={currentView.data} onClose={() => setCurrentView(null)} />;
        }

        if (currentView?.type === 'game') {
            return <GameView game={currentView.data} onClose={() => setCurrentView(null)} />;
        }

        switch (activeTab) {
            case 'create': return <CreateTab />;
            case 'community': return <CommunityTab />;
            case 'learn': return <LearnTab />;
            case 'profile': return <ProfileTab />;
            default: return <CreateTab />;
        }
    };

    const tabs = [
        { id: 'create', label: 'Oluştur', icon: PlusCircle },
        { id: 'community', label: 'Topluluk', icon: Users },
        { id: 'learn', label: 'Öğren', icon: BookOpen },
        { id: 'profile', label: 'Profil', icon: User }
    ];

    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-40">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => {
                            setCurrentView(null);
                            setActiveTab('create');
                        }}
                        className="flex items-center gap-2 font-semibold text-lg hover:text-primary-600 transition-colors"
                    >
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                            K
                        </div>
                        KOZA
                    </button>

                    <div className="flex items-center gap-2 text-sm">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-full">
                            <div className="w-2 h-2 bg-primary-600 rounded-full" />
                            <span className="font-medium">{user.xp} / {user.nextLevelXp} XP</span>
                            <span className="text-neutral-500">Seviye {user.level}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-16">
                {renderContent()}
            </main>

            {/* Bottom Navigation */}
            {!currentView && (
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
            )}

            {/* Notification */}
            {notification && (
                <div className="fixed bottom-24 right-4 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 max-w-sm animate-slide-up z-50">
                    <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.type === 'levelup' ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600'
                            }`}>
                            <Bell size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">{notification.title}</p>
                            <p className="text-sm text-neutral-600 mt-0.5">{notification.message}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
