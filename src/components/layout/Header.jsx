import { LogOut, Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

const Header = () => {
    const { setCurrentView, setActiveTab } = useApp();
    const { user: authUser, signOut, firestoreEnabled } = useAuth();
    const { user, isSyncing, cloudSynced } = useUser();

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 z-40">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <button
                    onClick={() => {
                        setCurrentView(null);
                        setActiveTab('create');
                    }}
                    className="flex items-center gap-2 font-semibold text-lg hover:text-primary-600 transition-all active:scale-95"
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
                                cloudSynced ? 'bg-green-50 text-green-600' : 'bg-neutral-50 text-neutral-400'
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

                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-full border border-neutral-200 shadow-sm">
                        <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                        <span className="font-bold text-xs">{user.xp} / {user.nextLevelXp} ÖZ</span>
                    </div>

                    {authUser && (
                        <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
                            {authUser.photoURL && (
                                <img
                                    src={authUser.photoURL}
                                    alt={authUser.displayName || 'User'}
                                    className="w-8 h-8 rounded-full ring-2 ring-primary-500/20 shadow-md"
                                />
                            )}
                            <button
                                onClick={handleSignOut}
                                className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
