import React from 'react';
import { useApp } from '../../context/AppContext';
import Onboarding from '../Onboarding';
import Toast from '../Toast';
import Header from './Header';
import BottomNav from './BottomNav';
import { Bell } from 'lucide-react';

const MainLayout = ({ children }) => {
    const { notification, toasts, showOnboarding, setShowOnboarding } = useApp();

    return (
        <div className="min-h-screen bg-neutral-50 pb-20">
            {/* Onboarding Overlay */}
            {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}

            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="pt-16">
                {children}
            </main>

            {/* Bottom Navigation */}
            <BottomNav />

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

            {/* Toast Notifications */}
            <div className="fixed top-20 right-4 z-50 space-y-2">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        type={toast.type}
                        title={toast.title}
                        message={toast.message}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainLayout;
