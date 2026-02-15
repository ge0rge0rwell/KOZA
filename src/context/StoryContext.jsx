import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { useUser } from './UserContext'; // We might need to update user stats on story save
import * as firestoreService from '../services/firestoreService';
import { analytics } from '../utils/analytics';

const StoryContext = createContext(null);

const COMMUNITY_WORKS = [
    // TODO: Connect to 'community' collection in Firestore
    // {
    //     id: 1,
    //     title: "Sessiz Çığlığın Dönüşümü",
    //     ...
    // }
];

export const StoryProvider = ({ children }) => {
    const { user: authUser, firestoreEnabled } = useAuth();
    const { cloudSynced } = useUser();

    const [savedStories, setSavedStories] = useLocalStorage('koza-stories', []);
    const [activeStory, setActiveStory] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [lastSavedStory, setLastSavedStory] = useState(null); // Cross-context communication

    // Load/Sync Stories from Cloud
    useEffect(() => {
        if (!authUser || !firestoreEnabled || !cloudSynced) return;

        const loadStories = async () => {
            try {
                const cloudStories = await firestoreService.getUserStories(authUser.uid);
                if (cloudStories) {
                    setSavedStories(prev => {
                        const storyMap = new Map();
                        prev.forEach(s => storyMap.set(String(s.id), s));
                        cloudStories.forEach(s => storyMap.set(String(s.id), s));

                        return Array.from(storyMap.values())
                            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
                            .slice(0, 50);
                    });
                }
            } catch (error) {
                console.error("Story load error:", error);
            }
        };

        loadStories();

        const unsubscribe = firestoreService.subscribeToStories(authUser.uid, (data) => {
            if (!data) return;
            setSavedStories(prev => {
                const storyMap = new Map();
                prev.forEach(s => storyMap.set(String(s.id), s));
                data.forEach(s => storyMap.set(String(s.id), s));

                const merged = Array.from(storyMap.values())
                    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
                    .slice(0, 50);

                return JSON.stringify(prev) !== JSON.stringify(merged) ? merged : prev;
            });
        });

        return () => unsubscribe();
    }, [authUser, firestoreEnabled, cloudSynced, setSavedStories]);

    const saveStory = useCallback(async (story) => {
        const storyId = String(Date.now());
        const newStory = {
            id: storyId,
            ...story,
            createdAt: new Date().toISOString()
        };

        setSavedStories(prev => [newStory, ...prev].slice(0, 50));
        setLastSavedStory(newStory); // Emit event for UserContext/Bridge

        const eventType = story.type === 'story' ? 'story_created' : 'game_created';
        analytics.track(eventType, { title: story.title });

        if (authUser && firestoreEnabled) {
            try {
                await firestoreService.saveStory(authUser.uid, newStory);
            } catch (e) {
                console.error("Save story failed", e);
            }
        }
    }, [authUser, firestoreEnabled, setSavedStories]);

    const deleteStory = useCallback(async (id) => {
        const stringId = String(id);
        setSavedStories(prev => prev.filter(s => String(s.id) !== stringId));
        if (authUser && firestoreEnabled) {
            try {
                await firestoreService.deleteStory(authUser.uid, stringId);
            } catch (e) {
                console.error("Delete story failed", e);
            }
        }
    }, [authUser, firestoreEnabled, setSavedStories]);

    // EXTREME OPTIMIZATION: Memoized Context Value
    const value = React.useMemo(() => ({
        savedStories,
        activeStory,
        setActiveStory,
        isProcessing,
        setIsProcessing,
        analysisResult,
        setAnalysisResult,
        lastSavedStory,
        setLastSavedStory,
        communityWorks: COMMUNITY_WORKS,
        saveStory,
        deleteStory
    }), [
        savedStories,
        activeStory,
        isProcessing,
        analysisResult,
        lastSavedStory,
        saveStory,
        deleteStory
    ]);

    return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
};

export const useStory = () => {
    const context = useContext(StoryContext);
    if (!context) throw new Error('useStory must be used within StoryProvider');
    return context;
};
