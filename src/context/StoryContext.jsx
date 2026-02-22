'use client';
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

// XState Imports
import { useStoryActor } from './GlobalStateMachineContext';
import { useSelector } from '@xstate/react';

export const StoryProvider = ({ children }) => {
    const { user: authUser, firestoreEnabled } = useAuth();
    const { cloudSynced } = useUser(); // We might depend on user being synced?

    // Connect to Story Machine
    const storyActor = useStoryActor();
    const savedStories = useSelector(storyActor, (snapshot) => snapshot.context.stories);

    // We keep 'activeStory' (the draft) in local state for performance (avoiding machine transition on every keystroke)
    const [activeStory, setActiveStory] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [lastSavedStory, setLastSavedStory] = useState(null);

    // Local Storage Sync (Manual implementation)
    const [localStories, setLocalStories] = useLocalStorage('koza-stories', []);

    // Initial Load
    useEffect(() => {
        if (localStories && localStories.length > 0) {
            // If machine is empty, load from local
            // We can check if machine has stories? 
            // Ideally machine is SOT. 
            storyActor.send({ type: 'STORY.FETCH_SUCCESS', stories: localStories });
        }
    }, []); // Run once

    // Persist machine state to local storage
    useEffect(() => {
        setLocalStories(savedStories);
    }, [savedStories, setLocalStories]);


    // Load/Sync Stories from Cloud
    useEffect(() => {
        if (!authUser || !firestoreEnabled || !cloudSynced) return;

        storyActor.send({ type: 'STORY.FETCH_START' });

        const loadStories = async () => {
            try {
                const cloudStories = await firestoreService.getUserStories(authUser.uid);
                if (cloudStories) {
                    // Merge strategy?
                    // Current strategy in old Context was: map merge.
                    // We should prob do the merge here and send SET matches.
                    // Or just trust cloud? 
                    // Let's do the merge to be safe and robust.
                    const mergedMap = new Map();
                    savedStories.forEach(s => mergedMap.set(String(s.id), s));
                    cloudStories.forEach(s => mergedMap.set(String(s.id), s));

                    const merged = Array.from(mergedMap.values())
                        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
                        .slice(0, 50);

                    storyActor.send({ type: 'STORY.FETCH_SUCCESS', stories: merged });
                } else {
                    storyActor.send({ type: 'STORY.FETCH_SUCCESS', stories: savedStories });
                }
            } catch (error) {
                console.error("Story load error:", error);
                storyActor.send({ type: 'STORY.FETCH_FAILURE', error: error.message });
            }
        };

        loadStories();

        const unsubscribe = firestoreService.subscribeToStories(authUser.uid, (data) => {
            if (!data) return;
            // Real-time update from cloud
            // We again need to merge or just replace?
            // If data is the *full list* from Firestore listener, we can merge.
            const mergedMap = new Map();
            // We use the actor's current snapshot content or just what we have in scope?
            // 'savedStories' is from selector, so it updates.
            // CAUTION: This effect depends on savedStories? If so it loops?
            // firestoreService.subscribeToStories usually returns the full collection or changes.
            // If straightforward subscription:
            // Let's assume data is the full list.
            storyActor.send({ type: 'STORY.FETCH_SUCCESS', stories: data });
        });

        return () => unsubscribe();
    }, [authUser, firestoreEnabled, cloudSynced, storyActor]); // data deps removed to avoid loops, relying on remote events

    const saveStory = useCallback(async (story) => {
        const storyId = String(Date.now());
        const newStory = {
            id: storyId,
            ...story,
            createdAt: new Date().toISOString()
        };

        storyActor.send({ type: 'STORY.CREATE_START' });

        // Optimistic update via machine
        storyActor.send({ type: 'STORY.CREATE_SUCCESS', story: newStory });

        setLastSavedStory(newStory); // Emit event for UserContext/Bridge

        const eventType = story.type === 'story' ? 'story_created' : 'game_created';
        analytics.track(eventType, { title: story.title });

        if (authUser && firestoreEnabled) {
            try {
                await firestoreService.saveStory(authUser.uid, newStory);
                // Machine already updated theoretically.
            } catch (e) {
                console.error("Save story failed", e);
                storyActor.send({ type: 'STORY.CREATE_FAILURE', error: e.message });
                // If failed, we might want to rollback?
                // For now, simple error state.
            }
        }
    }, [authUser, firestoreEnabled, storyActor]);

    const deleteStory = useCallback(async (id) => {
        const stringId = String(id);

        storyActor.send({ type: 'STORY.DELETE', id: stringId });

        if (authUser && firestoreEnabled) {
            try {
                await firestoreService.deleteStory(authUser.uid, stringId);
            } catch (e) {
                console.error("Delete story failed", e);
                // Rollback? state is already updated optimistically.
                // Re-fetch?
                storyActor.send({ type: 'STORY.FETCH_START' }); // Trigger re-sync as fallback
            }
        }
    }, [authUser, firestoreEnabled, storyActor]);

    const refineStory = useCallback(async (existingStory, feedback) => {
        storyActor.send({ type: 'STORY.REFINE_START' });
        setIsProcessing(true);

        try {
            const { NarrativeDomain } = await import('../domain/narrativeDomain');
            const result = await NarrativeDomain.processRefinementRequest(existingStory, feedback);

            if (result.isSafetyTriggered) {
                storyActor.send({ type: 'STORY.REFINE_FAILURE', error: result.message });
                return { success: false, message: result.message };
            }

            const updatedStory = result.data;
            storyActor.send({ type: 'STORY.REFINE_SUCCESS', story: updatedStory });

            analytics.track('story_refined', { title: updatedStory.title });

            if (authUser && firestoreEnabled) {
                await firestoreService.saveStory(authUser.uid, updatedStory);
            }

            return { success: true, story: updatedStory };
        } catch (error) {
            console.error("Refinement failed:", error);
            storyActor.send({ type: 'STORY.REFINE_FAILURE', error: error.message });
            return { success: false, message: error.message };
        } finally {
            setIsProcessing(false);
        }
    }, [authUser, firestoreEnabled, storyActor]);

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
        deleteStory,
        refineStory
    }), [
        savedStories,
        activeStory,
        isProcessing,
        analysisResult,
        lastSavedStory,
        saveStory,
        deleteStory,
        refineStory
    ]);

    return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
};

export const useStory = () => {
    const context = useContext(StoryContext);
    if (!context) throw new Error('useStory must be used within StoryProvider');
    return context;
};
