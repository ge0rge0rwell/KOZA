import { LogOut, Cloud, CloudOff, RefreshCw, User as UserIcon } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import React, { useState, useCallback, memo, useEffect } from 'react';


const UserDropdown = memo(({ authUser, onSignOut }) => (
    <div
        className="absolute top-12 right-0 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 py-3 animate-fade-in z-[110] will-change-transform"
        onClick={(e) => e.stopPropagation()}
    >
        <div className="px-4 py-3 border-b border-neutral-100 mb-2">
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">Identity</p>
            <p className="text-sm font-black text-neutral-800 truncate">{authUser.email}</p>
        </div>

        <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
        >
            <LogOut size={16} />
            <span>Sign Out</span>
        </button>
    </div>
));

const Header = () => {
    const { setCurrentView } = useUI();
    const { user: authUser, signOut } = useAuth();
    const { user, isSyncing, cloudSynced } = useUser();
    const [imgError, setImgError] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (!showDropdown) return;
        const handleClickOutside = () => setShowDropdown(false);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [showDropdown]);

    const handleSignOut = useCallback(async (e) => {
        e.stopPropagation();
        await signOut();
    }, [signOut]);

    const toggleDropdown = useCallback((e) => {
        e.stopPropagation();
        setShowDropdown(prev => !prev);
    }, []);

    const handleOpenProfile = useCallback(() => {
        setCurrentView({ type: 'profile' });
        setShowDropdown(false);
    }, [setCurrentView]);

    return (
        <header className="absolute top-0 right-0 w-full h-16 flex items-center justify-end px-6 z-[100] bg-white/5 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3">

                {authUser && (
                    <div className={`items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all hidden sm:flex border border-neutral-200/50 ${isSyncing ? 'bg-primary-50 text-primary-600' :
                        cloudSynced ? 'bg-green-50 text-green-600' : 'bg-neutral-50 text-neutral-500'
                        }`}>
                        {isSyncing ? <RefreshCw size={12} className="animate-spin" /> : cloudSynced ? <Cloud size={12} /> : <CloudOff size={12} />}
                        <span className="tracking-[0.2em]">{isSyncing ? 'Syncing' : cloudSynced ? 'Cloud' : 'Local'}</span>
                    </div>
                )}

                <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white/40 rounded-lg shadow-sm transition-all hover:bg-white/60 border border-white/20 cursor-default">
                    <div className="w-2.5 h-2.5 bg-primary-500 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.6)] animate-pulse" />
                    <span className="font-black text-xs tabular-nums text-neutral-700">{user.xp} <span className="text-[10px] opacity-60">XP</span></span>
                </div>

                {authUser && (
                    <div className="relative pl-3 border-l border-white/20">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            {authUser.photoURL && !imgError ? (
                                <img
                                    src={authUser.photoURL}
                                    alt={authUser.displayName || 'User'}
                                    className="w-10 h-10 object-cover morph-shape shadow-sm border border-white/30 will-change-transform"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="w-10 h-10 bg-white/60 flex items-center justify-center text-neutral-500 morph-shape border border-white/50">
                                    <UserIcon size={20} />
                                </div>
                            )}
                        </button>

                        {showDropdown && (
                            <UserDropdown
                                authUser={authUser}
                                onSignOut={handleSignOut}
                            />
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default memo(Header);
