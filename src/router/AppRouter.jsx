import React from 'react';
import { useApp } from '../context/AppContext';
import CreateTab from '../tabs/CreateTab';
import CommunityTab from '../tabs/CommunityTab';
import LearnTab from '../tabs/LearnTab';
import ProfileTab from '../tabs/ProfileTab';
import StoryView from '../views/StoryView';
import GameView from '../views/GameView';


const AppRouter = () => {
    const { currentView, setCurrentView, activeTab } = useApp();

    // 1. Full Screen Views (Story / Game)
    if (currentView?.type === 'story') {
        return <StoryView story={currentView.data} onClose={() => setCurrentView(null)} />;
    }

    if (currentView?.type === 'game') {
        return <GameView game={currentView.data} onClose={() => setCurrentView(null)} />;
    }

    // 2. Tab Navigation
    const TabContent = () => {
        switch (activeTab) {
            case 'create': return <CreateTab />;
            case 'community': return <CommunityTab />;
            case 'learn': return <LearnTab />;
            case 'profile': return <ProfileTab />;
            default: return <CreateTab />;
        }
    };

    return (
        <div key={activeTab + (currentView?.type || 'none')} className="animate-liquid">
            <TabContent />
        </div>
    );
};

export default AppRouter;
