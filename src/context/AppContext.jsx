import React, { createContext, useContext, useEffect } from 'react';
import { useUser } from './UserContext';
import { useStory } from './StoryContext';
import { useUI } from './UIContext';

// Legacy AppContext not strictly needed if we export the hook, but good for safety
const AppContext = createContext(null);

// This provider component is now a wrapper that assumes proper nesting
// Or better: it just returns children because logic is upstream.
// BUT, to keep main.jsx clean, we can make AppProvider the "Combobulator" that nests all providers.
import { UserProvider } from './UserContext';
import { StoryProvider } from './StoryContext';
import { UIProvider } from './UIContext';

export const AppProvider = ({ children }) => {
    return (
        <UserProvider>
            <StoryProvider>
                <UIProvider>
                    <AppContextBridge>{children}</AppContextBridge>
                </UIProvider>
            </StoryProvider>
        </UserProvider>
    );
};

// Internal bridge to handle side-effects between contexts (like User Level Up -> UI Notification)
const AppContextBridge = ({ children }) => {
    const { lastUserEvent, setLastUserEvent, setUser } = useUser();
    const { lastSavedStory, setLastSavedStory } = useStory();
    const { triggerNotification, addToast } = useUI();

    // Listen to Story events to update User stats
    useEffect(() => {
        if (!lastSavedStory) return;

        setUser(prev => ({
            ...prev,
            storiesCreated: lastSavedStory.type === 'story' ? prev.storiesCreated + 1 : prev.storiesCreated,
            gamesCreated: lastSavedStory.type === 'game' ? prev.gamesCreated + 1 : prev.gamesCreated
        }));

        setLastSavedStory(null); // Clear event
    }, [lastSavedStory, setUser, setLastSavedStory]);

    // Listen to User events and trigger UI
    useEffect(() => {
        if (!lastUserEvent) return;

        if (lastUserEvent.type === 'levelup') {
            triggerNotification('levelup', 'Seviye Atladın!', `Yeni seviye: ${lastUserEvent.level}`);
        } else if (lastUserEvent.type === 'xp') {
            triggerNotification('xp', `+${lastUserEvent.amount} XP`, lastUserEvent.reason);
        } else if (lastUserEvent.type === 'achievement') {
            lastUserEvent.achievements.forEach(ach => {
                addToast('success', 'Başarı Kazanıldı!', `${ach.icon} ${ach.name}`);
            });
        }

        setLastUserEvent(null); // Clear event
    }, [lastUserEvent, triggerNotification, addToast, setLastUserEvent]);

    return children;
};


// Legacy Facade Hook
export const useApp = () => {
    // We can't simply use useContext(AppContext) because we aren't passing a value to it anymore.
    // Instead, we just call the individual hooks and merge them.
    const userContext = useUser();
    const storyContext = useStory();
    const uiContext = useUI();

    return {
        ...userContext,
        ...storyContext,
        ...uiContext
    };
};
