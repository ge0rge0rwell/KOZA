import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import Onboarding from '../Onboarding';
import GalaxyToastContainer from '../galaxy/GalaxyToastContainer';
import Header from './Header';

import Sidebar from './Sidebar';
import { Home, Users, Book, User, Bell } from 'lucide-react';

import BottomMenu from './BottomMenu';

const MainLayout = ({ children }) => {
    const {
        notification,
        activeTab,
        setActiveTab,
        currentView,
        addToast,
        showOnboarding,
        setShowOnboarding
    } = useApp();

    return (
        <div className="flex h-screen bg-white/10 backdrop-blur-3xl koza-pattern text-neutral-900 selection:bg-primary-100 selection:text-primary-900 overflow-hidden">
            {/* Sidebar (History Only) */}
            <Sidebar />

            {/* Main Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Onboarding Overlay */}
                {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}

                {/* Header */}
                <Header />

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto pt-20 pb-24 px-6 sm:px-10">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>

                {/* Bottom Navigation */}
                <BottomMenu />

                {/* Notification */}
                {notification && (
                    <div className="fixed bottom-24 right-8 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 max-w-sm animate-slide-up z-50">
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

                {/* Galaxy Toast Notifications */}
                <GalaxyToastContainer />
            </div>
        </div>
    );
};

export default MainLayout;
