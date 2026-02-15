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
    const { setUser } = useUser(); // To update stats

    const [savedStories, setSavedStories] = useLocalStorage('koza-stories', []);
    const [activeStory, setActiveStory] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null); // Moved analysis here as it relates to story creation

    // Sync Stories
    useEffect(() => {
        if (!authUser || !firestoreEnabled) return;

        const loadStories = async () => {
            try {
                const cloudStories = await firestoreService.getUserStories(authUser.uid);
                if (cloudStories && cloudStories.length > 0) {
                    setSavedStories(prev => {
                        // Create a map by ID to ensure uniqueness
                        const storyMap = new Map();

                        // Local stories (might have newer unsynced items)
                        prev.forEach(s => storyMap.set(String(s.id), s));

                        // Cloud stories (take precedence on conflict or just add new)
                        cloudStories.forEach(s => storyMap.set(String(s.id), s));

                        // Sort by date desc
                        return Array.from(storyMap.values())
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .slice(0, 50);
                    });
                }
            } catch (error) {
                console.error("Story load error", error);
            }
        };

        loadStories();

        // Subscribe with merge logic
        const unsubscribe = firestoreService.subscribeToStories(authUser.uid, (data) => {
            if (!data) return;
            setSavedStories(prev => {
                const storyMap = new Map();
                prev.forEach(s => storyMap.set(String(s.id), s));
                data.forEach(s => storyMap.set(String(s.id), s));

                const merged = Array.from(storyMap.values())
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 50);

                if (JSON.stringify(prev) !== JSON.stringify(merged)) {
                    return merged;
                }
                return prev;
            });
        });
        return () => unsubscribe();
    }, [authUser, firestoreEnabled]); // Removed setSavedStories from deps to avoid loop if it's not stable

    const saveStory = useCallback(async (story) => {
        const newStory = {
            id: Date.now(),
            ...story,
            createdAt: new Date().toISOString()
        };

        setSavedStories(prev => [newStory, ...prev].slice(0, 50));

        // Track
        const eventType = story.type === 'story' ? 'story_created' : 'game_created';
        analytics.track(eventType, { title: story.title });

        // Update User Stats
        setUser(prev => ({
            ...prev,
            storiesCreated: story.type === 'story' ? prev.storiesCreated + 1 : prev.storiesCreated,
            gamesCreated: story.type === 'game' ? prev.gamesCreated + 1 : prev.gamesCreated
        }));

        // Cloud
        if (authUser && firestoreEnabled) {
            try {
                await firestoreService.saveStory(authUser.uid, newStory);
            } catch (e) {
                console.error("Save story failed", e);
            }
        }
    }, [authUser, firestoreEnabled, setUser, setSavedStories]);

    const deleteStory = useCallback(async (id) => {
        setSavedStories(prev => prev.filter(s => s.id !== id));
        if (authUser && firestoreEnabled) {
            try {
                await firestoreService.deleteStory(authUser.uid, id);
            } catch (e) {
                console.error("Delete story failed", e);
            }
        }
    }, [authUser, firestoreEnabled, setSavedStories]);

    const value = {
        savedStories,
        activeStory,
        setActiveStory,
        isProcessing,
        setIsProcessing,
        analysisResult,
        setAnalysisResult,
        communityWorks: COMMUNITY_WORKS,
        saveStory,
        deleteStory
    };

    return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
};

export const useStory = () => {
    const context = useContext(StoryContext);
    if (!context) throw new Error('useStory must be used within StoryProvider');
    return context;
};
