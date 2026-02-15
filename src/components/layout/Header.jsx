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
        <header className="absolute top-0 right-0 w-full h-16 flex items-center justify-end px-6 z-40 bg-white/10 backdrop-blur-xl border-b border-white/10">


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

                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
