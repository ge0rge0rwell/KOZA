import React, { memo } from 'react';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import Onboarding from '../Onboarding';
import GalaxyToastContainer from '../galaxy/GalaxyToastContainer';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomMenu from './BottomMenu';
import { Bell } from 'lucide-react';

const NotificationOverlay = memo(({ notification }) => {
    if (!notification) return null;
    return (
        <div className="fixed bottom-24 right-8 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 max-w-sm animate-slide-up z-50 will-change-transform">
            <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.type === 'levelup' ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600'}`}>
                    <Bell size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-neutral-900">{notification.title}</p>
                    <p className="text-sm text-neutral-600 mt-0.5">{notification.message}</p>
                </div>
            </div>
        </div>
    );
});

const MainLayout = ({ children }) => {
    const { notification, showOnboarding, setShowOnboarding } = useUI();
    const { user: authUser } = useAuth();

    return (
        <div className="flex h-screen bg-white/10 backdrop-blur-3xl koza-pattern text-neutral-900 selection:bg-primary-100 selection:text-primary-900 overflow-hidden font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}

                <Header />

                <main className="flex-1 overflow-y-auto pt-20 pb-24 px-6 sm:px-10 custom-scrollbar will-change-scroll">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>

                <BottomMenu />

                <NotificationOverlay notification={notification} />
                <GalaxyToastContainer />
            </div>
        </div>
    );
};

export default memo(MainLayout);
