import { LogOut, Cloud, CloudOff, RefreshCw, User as UserIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import React, { useState } from 'react';

const Header = () => {
    const { setCurrentView, setActiveTab } = useApp();
    const { user: authUser, signOut, firestoreEnabled } = useAuth();
    const { user, isSyncing, cloudSynced } = useUser();
    const [imgError, setImgError] = useState(false);

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl liquid-glass rounded-2xl z-40 px-6 h-16 flex items-center justify-between border-white/20 transition-liquid hover:border-white/40">
            <button
                onClick={() => {
                    setCurrentView(null);
                    setActiveTab('create');
                }}
                className="flex items-center gap-3 font-bold text-xl text-neutral-900 transition-liquid group"
            >
                <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-white font-black shadow-lg transition-liquid group-hover:scale-110 group-active:scale-95 morph-shape">
                    K
                </div>
                <span className="tracking-tighter italic text-shimmer">KOZA</span>
            </button>

            <div className="flex items-center gap-3">
                {/* Cloud Sync Status */}
                {authUser && (
                    <div className={`items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-liquid hidden sm:flex border border-white/20 ${isSyncing ? 'bg-primary-50 text-primary-600' :
                        cloudSynced ? 'bg-green-50 text-green-600' : 'bg-neutral-50 text-neutral-500'
                        }`}>
                        {isSyncing ? (
                            <RefreshCw size={12} className="animate-spin" />
                        ) : cloudSynced ? (
                            <Cloud size={12} />
                        ) : (
                            <CloudOff size={12} />
                        )}
                        <span className="tracking-widest">{isSyncing ? 'Sync' : cloudSynced ? 'Cloud' : 'Local'}</span>
                    </div>
                )}

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/50 rounded-lg shadow-sm transition-liquid hover:bg-white active:scale-95 border border-white/30">
                    <div className="w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(0,122,255,0.4)]" />
                    <span className="font-bold text-xs tabular-nums text-neutral-600">{user.xp} XP</span>
                </div>

                {authUser && (
                    <div className="flex items-center gap-2 pl-3 border-l border-white/30">
                        {authUser.photoURL && !imgError ? (
                            <img
                                src={authUser.photoURL}
                                alt={authUser.displayName || 'User'}
                                className="w-9 h-9 object-cover transition-liquid hover:scale-105 morph-shape shadow-sm"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="w-9 h-9 bg-neutral-100 flex items-center justify-center text-neutral-500 morph-shape border border-white/50">
                                <UserIcon size={18} />
                            </div>
                        )}
                        <button
                            onClick={handleSignOut}
                            className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50/50 rounded-xl transition-liquid active:scale-90"
                            title="Çıkış Yap"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
