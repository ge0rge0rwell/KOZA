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
        <header className="fixed top-0 left-0 right-0 bg-white/20 backdrop-blur-3xl border-b border-white/80 z-40 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <button
                    onClick={() => {
                        setCurrentView(null);
                        setActiveTab('create');
                    }}
                    className="flex items-center gap-2 font-semibold text-lg text-neutral-900 hover:text-primary-600 transition-all active:scale-95"
                >
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20">
                        K
                    </div>
                    <span className="tracking-tighter italic">KOZA</span>
                </button>

                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Cloud Sync Status */}
                    {authUser && (
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase transition-all hidden sm:flex ${isSyncing ? 'bg-primary-50 text-primary-600' :
                            cloudSynced ? 'bg-green-50 text-green-600' : 'bg-white/40 text-neutral-500'
                            }`}>
                            {isSyncing ? (
                                <>
                                    <RefreshCw size={12} className="animate-spin" />
                                    <span>SENKRONİZE EDİLİYOR</span>
                                </>
                            ) : cloudSynced ? (
                                <>
                                    <Cloud size={12} />
                                    <span>BULUT AKTİF</span>
                                </>
                            ) : (
                                <>
                                    <CloudOff size={12} />
                                    <span>YEREL MOD</span>
                                </>
                            )}
                        </div>
                    )}

                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/40 rounded-full border border-white/60 shadow-sm">
                        <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                        <span className="font-bold text-xs">{user.xp} / {user.nextLevelXp} ÖZ</span>
                    </div>

                    {authUser && (
                        <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
                            {authUser.photoURL && !imgError ? (
                                <img
                                    src={authUser.photoURL}
                                    alt={authUser.displayName || 'User'}
                                    className="w-8 h-8 rounded-full ring-2 ring-primary-500/20 shadow-md object-cover"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-primary-600 shadow-inner border border-white/60">
                                    <UserIcon size={16} />
                                </div>
                            )}
                            <button
                                onClick={handleSignOut}
                                className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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
