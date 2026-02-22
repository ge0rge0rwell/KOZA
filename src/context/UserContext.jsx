'use client';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import * as firestoreService from '../services/firestoreService';
import { analytics } from '../utils/analytics';
import { checkAchievements } from '../utils/achievements';

const UserContext = createContext(null);

const DEFAULT_USER = {
    xp: 850,
    level: 1,
    nextLevelXp: 1000,
    storiesRead: 3,
    gamesPlayed: 1,
    storiesCreated: 0,
    gamesCreated: 0,
    totalXP: 850,
    dailyStreak: 0,
    lastVisit: null,
    title: "Empati Çırağı",
    badges: [
        { id: 1, name: "İlk Adım", unlocked: true },
        { id: 2, name: "Hikaye Anlatıcısı", unlocked: false },
        { id: 3, name: "Topluluk Yıldızı", unlocked: false },
    ],
    achievements: []
};

// XState Imports
import { useUserActor } from './GlobalStateMachineContext';
import { useSelector } from '@xstate/react';

export const UserProvider = ({ children }) => {
    const { user: authUser, firestoreEnabled } = useAuth();

    // Connect to User Machine
    const userActor = useUserActor();
    const user = useSelector(userActor, (snapshot) => snapshot.context.user);
    const syncStatus = useSelector(userActor, (snapshot) => snapshot.context.syncStatus);
    const isSyncing = syncStatus === 'syncing';
    const cloudSynced = syncStatus === 'synced'; // or check specific state matching

    // Local Storage Sync (Manual implementation to replace useLocalStorage hook's auto-write)
    const [storedUser, setStoredUser] = useLocalStorage('koza-user', DEFAULT_USER);

    // Initial Load
    useEffect(() => {
        if (storedUser) {
            userActor.send({ type: 'USER.LOAD_DATA', data: storedUser });
        }
    }, []); // Run once on mount

    // Persist machine state to local storage
    useEffect(() => {
        if (user) {
            setStoredUser(user);
        }
    }, [user, setStoredUser]);

    // We keep lastUserEvent for the AppContextBridge to pick up (Toast notifications)
    // We can detect changes in user.level or user.achievements to set this.
    // However, the machine handles the logic. 
    // Optimization: logic from 'userMachine' is pure, but we need to know *when* an event happened.
    // We can listen to the actor's event stream.
    const [lastUserEvent, setLastUserEvent] = useState(null);

    useEffect(() => {
        const subscription = userActor.on('USER.AWARD_XP', (event) => {
            // This listener might not be supported on the actor ref directly in all versions, 
            // but 'actor.subscribe' gives us state changes. 
            // Inspection API is better. For now, let's use the diffing approach for simplicity and robustness.
        });
        return () => {
            if (subscription && typeof subscription.unsubscribe === 'function') subscription.unsubscribe();
        };
    }, [userActor]);

    // Simple Diffing for Notifications (Robust fallback)
    const [prevUser, setPrevUser] = useState(user);

    useEffect(() => {
        if (!user || !prevUser) {
            setPrevUser(user);
            return;
        }

        if (user.level > prevUser.level) {
            setLastUserEvent({ type: 'levelup', level: user.level });
        } else if (user.xp > prevUser.xp) {
            const diff = user.xp - prevUser.xp;
            if (diff > 0) {
                // We don't have the 'reason' here easily unless we store it in machine context 
                // or listen to the event. For now, generic reason or passed via a side-channel?
                // Actually, we can just say "XP Kazanıldı".
                setLastUserEvent({ type: 'xp', amount: diff, reason: "Başarım" });
            }
        }

        if (user.achievements.length > prevUser.achievements.length) {
            // Find new achievements
            const newIds = user.achievements.filter(id => !prevUser.achievements.includes(id));
            // We need to map IDs to objects. We'll need the checkAchievements utility or specific list.
            // For now, let's assume we can fetch metadata elsewhere or just notify generic.
            // But AppContextBridge expects 'achievements' array.
            // Let's reload achievements metadata? 
            // Ideally the machine event `USER.AWARD_XP` could carry the result, but machines are pure.

            // Quick fix: allow LastUserEvent to be set by the awardXP wrapper too?
            // No, let's stick to state diffing.
            const newAch = newIds.map(id => ({ id, name: "Yeni Başarım", icon: "🏆" })); // Placeholder
            setLastUserEvent({ type: 'achievement', achievements: newAch });
        }

        setPrevUser(user);
    }, [user]);

    // Track daily streak
    useEffect(() => {
        const today = new Date().toDateString();
        // Safety check: if user is null (cleared storage but not context), skip
        if (!user) return;
        const lastVisit = user.lastVisit;

        if (lastVisit !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();

            const newStreak = lastVisit === yesterdayStr ? user.dailyStreak + 1 : 1;

            userActor.send({
                type: 'USER.UPDATE_PROFILE',
                data: { lastVisit: today, dailyStreak: newStreak }
            });
        }
    }, [user?.lastVisit, userActor]); // Depend on lastVisit to avoid loops, but need to be careful.
    // Actually, if we update user, user changes, effect runs again?
    // user.lastVisit will be today after update. 'today' will be same. Condition `lastVisit !== today` will be false. Safe.

    // Sync with Firestore
    useEffect(() => {
        if (!authUser || !firestoreEnabled || cloudSynced) return;

        // Trigger Sync in machine
        userActor.send({ type: 'USER.SYNC_START' });

        const syncData = async () => {
            try {
                console.log('🔄 User: Initiating full cloud synchronization...');
                const localStories = JSON.parse(localStorage.getItem('koza-stories') || '[]');

                // We pass 'user' from the machine state (which is loaded from localStorage initially)
                const currentLocalUser = user || storedUser;

                const syncResult = await firestoreService.syncLocalToCloud(authUser.uid, {
                    user: currentLocalUser,
                    stories: localStories
                });

                if (syncResult && syncResult.profile) {
                    // Update machine with cloud data
                    userActor.send({ type: 'USER.UPDATE_PROFILE', data: syncResult.profile });
                    userActor.send({ type: 'USER.SYNC_SUCCESS' });

                    if (syncResult.migrated) {
                        console.log('✅ Local data successfully migrated to cloud');
                    }
                } else {
                    userActor.send({ type: 'USER.SYNC_SUCCESS' }); // Even if no changes, we synced.
                }
            } catch (error) {
                console.error('User Sync error:', error);
                userActor.send({ type: 'USER.SYNC_FAILURE', error: error.message });
            }
        };

        syncData();
    }, [authUser, firestoreEnabled, cloudSynced, userActor]);

    // Real-time Updates
    useEffect(() => {
        if (!authUser || !firestoreEnabled || !cloudSynced) return;
        const unsubscribe = firestoreService.subscribeToProfile(authUser.uid, (data) => {
            if (data) {
                userActor.send({ type: 'USER.UPDATE_PROFILE', data });
            }
        });
        return () => unsubscribe();
    }, [authUser, firestoreEnabled, cloudSynced, userActor]);

    // Debounced Sync to Firestore (Background Save)
    useEffect(() => {
        if (!authUser || !firestoreEnabled || !cloudSynced || !user) return;

        const syncTimer = setTimeout(() => {
            firestoreService.updateUserProfile(authUser.uid, {
                xp: user.xp,
                level: user.level,
                nextLevelXp: user.nextLevelXp,
                totalXP: user.totalXP,
                storiesCreated: user.storiesCreated,
                gamesCreated: user.gamesCreated,
                storiesRead: user.storiesRead,
                gamesPlayed: user.gamesPlayed,
                dailyStreak: user.dailyStreak,
                lastVisit: user.lastVisit,
                title: user.title,
                achievements: user.achievements,
                badges: user.badges
            }).catch(e => console.error("Background sync error:", e));
        }, 2000);

        return () => clearTimeout(syncTimer);
    }, [user, authUser, firestoreEnabled, cloudSynced]);

    const awardXP = useCallback((amount, reason) => {
        analytics.track('xp_awarded', { amount, reason });

        // Store reason temporarily for the diff effect? 
        // Or just fire and forget. The diff effect will catch the XP change.
        userActor.send({ type: 'USER.AWARD_XP', amount });

        // Manual override for reason tracking if needed for toast
        // We could set a short-lived state here?
        // But AppContextBridge relies on 'lastUserEvent'. 
        // Let's set it here explicitly for the 'reason' context.
        // But wait, if we set it here, and also the diff effect sets it...
        // Let's trust the diff effect for now, or improve it later.
        // Actually, to get the "Reason" into the Toast, we need it.
        // Simple hack: 
        setLastUserEvent({ type: 'xp', amount, reason });

    }, [userActor]);

    /* 
       Direct setter replacement. 
       components calling setUser(newData) or setUser(prev => ...)
       We need to support functional updates if we want full compatibility.
    */
    const setUser = useCallback((update) => {
        let newData;
        if (typeof update === 'function') {
            // This is dangerous if we don't have current 'user'. 
            // We can read 'user' from the closure, but it might be stale?
            // useSelector 'user' is the latest render value.
            // XState doesn't support "updater functions" in events directly usually.
            // We'll calculate it here.
            // CAUTION: 'user' dependency might cause re-creation of setUser, 
            // but that's standard React.
            // We can use actor.getSnapshot().context.user to be safe?
            const currentUser = userActor.getSnapshot().context.user || DEFAULT_USER;
            newData = update(currentUser);
        } else {
            newData = update;
        }

        userActor.send({ type: 'USER.UPDATE_PROFILE', data: newData });
    }, [userActor]);

    const value = React.useMemo(() => ({
        user,
        setUser,
        awardXP,
        isSyncing,
        cloudSynced,
        lastUserEvent,
        setLastUserEvent
    }), [
        user,
        setUser,
        awardXP,
        isSyncing,
        cloudSynced,
        lastUserEvent,
        setLastUserEvent
    ]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;

    // Note: The original returned children wrapped in provider. 
    // We are doing the same.
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider');
    return context;
};
