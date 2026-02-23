import React, { Suspense, lazy, memo } from 'react';
import { useUI } from '../context/UIContext';
import GalaxySpinner from '../components/galaxy/GalaxySpinner';

// Lazy Load Components (Lightspeed Optimization)
const CreateTab = lazy(() => import('../tabs/CreateTab'));
const StoryView = lazy(() => import('../views/StoryView'));
const GameView = lazy(() => import('../views/GameView'));
const ProfileView = lazy(() => import('../views/ProfileView'));

const FallbackLoader = () => (
    <div className="flex items-center justify-center p-20 animate-fade-in-up">
        <GalaxySpinner size="large" />
    </div>
);

const AppRouter = () => {
    const { currentView, setCurrentView, activeTab } = useUI();

    // 1. Full Screen Overlay Views
    if (currentView?.type === 'story') {
        return (
            <Suspense fallback={<FallbackLoader />}>
                <StoryView story={currentView.data} onClose={() => setCurrentView(null)} />
            </Suspense>
        );
    }

    if (currentView?.type === 'game') {
        return (
            <Suspense fallback={<FallbackLoader />}>
                <GameView game={currentView.data} onClose={() => setCurrentView(null)} />
            </Suspense>
        );
    }

    if (currentView?.type === 'profile') {
        return (
            <Suspense fallback={<FallbackLoader />}>
                <ProfileView onClose={() => setCurrentView(null)} />
            </Suspense>
        );
    }

    // 2. Tab Navigation Content
    return (
        <div key={activeTab} className="will-change-contents">
            <Suspense fallback={<FallbackLoader />}>
                <CreateTab />
            </Suspense>
        </div>
    );
};

export default memo(AppRouter);
