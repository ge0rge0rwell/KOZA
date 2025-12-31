import React from 'react';
import { LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { user, setCurrentView, setActiveTab } = useApp();
    const { user: authUser, signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
    };

    return (
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

                <div className="flex items-center gap-3 text-sm">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-full">
                        <div className="w-2 h-2 bg-primary-600 rounded-full" />
                        <span className="font-medium">{user.xp} / {user.nextLevelXp} XP</span>
                        <span className="text-neutral-500">Seviye {user.level}</span>
                    </div>

                    {authUser && (
                        <div className="flex items-center gap-2">
                            {authUser.photoURL && (
                                <img
                                    src={authUser.photoURL}
                                    alt={authUser.displayName || 'User'}
                                    className="w-8 h-8 rounded-full"
                                />
                            )}
                            <button
                                onClick={handleSignOut}
                                className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                                title="Çıkış Yap"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
