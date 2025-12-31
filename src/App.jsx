import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import { googleAnalytics } from './utils/googleAnalytics';

// New Architecture Components
import MainLayout from './components/layout/MainLayout';
import AppRouter from './router/AppRouter';

const App = () => {
    const { currentView, activeTab } = useApp();
    const { user: authUser, loading: authLoading } = useAuth();

    // Track page views
    useEffect(() => {
        const path = currentView ? `/${currentView.type}` : `/${activeTab}`;
        googleAnalytics.trackPageView(path);
    }, [currentView, activeTab]);

    // Show loading state while checking auth
    if (authLoading) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 animate-pulse">
                        K
                    </div>
                    <p className="text-neutral-600">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    // Show HomePage if not authenticated
    if (!authUser) {
        return <HomePage />;
    }

    // Render Authenticated App
    return (
        <MainLayout>
            <AppRouter />
        </MainLayout>
    );
};

export default App;
