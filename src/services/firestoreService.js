import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, query, orderBy, limit, startAfter, getDocs, onSnapshot, serverTimestamp, writeBatch, increment } from 'firebase/firestore';
import { db } from './firebase';

// Remove the initialize function as we now import db directly
// export const initializeFirestore = (app) => { ... } is no longer needed
const DEFAULT_USER = {
    xp: 0,
    level: 1,
    nextLevelXp: 1000,
    title: "Empati Çırağı"
};

// ==================== USER PROFILE ====================

export const getUserProfile = async (userId) => {
    if (!db) throw new Error('Firestore not initialized');

    try {
        const docRef = doc(db, 'users', userId, 'data', 'profile');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error('Error getting user profile:', error);
        throw error;
    }
};

export const createUserProfile = async (userId, profileData) => {
    if (!db) throw new Error('Firestore not initialized');

    try {
        const docRef = doc(db, 'users', userId, 'data', 'profile');
        const data = {
            ...profileData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        await setDoc(docRef, data);
        return data;
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
};

// ==================== WRITE BUFFERING (SCALE HARDENING) ====================
const profileBuffer = new Map();
let syncTimeout = null;
const SYNC_DEBOUNCE_MS = 2000;

const commitProfileSync = async (userId) => {
    if (!profileBuffer.has(userId) || !db) return;

    const data = profileBuffer.get(userId);
    profileBuffer.delete(userId);

    try {
        const docRef = doc(db, 'users', userId, 'data', 'profile');
        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
        console.log(`☁️ Cloud Sync: Profile updated for ${userId}`);
    } catch (error) {
        console.error('Buffer Sync Error:', error);
        // Put back in buffer on failure to retry
        profileBuffer.set(userId, { ...data, ...profileBuffer.get(userId) });
    }
};

export const updateUserProfile = async (userId, updates) => {
    if (!db) throw new Error('Firestore not initialized');

    // Add to buffer
    const current = profileBuffer.get(userId) || {};
    profileBuffer.set(userId, { ...current, ...updates });

    // Debounce commit
    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(() => commitProfileSync(userId), SYNC_DEBOUNCE_MS);

    return { ...current, ...updates, buffered: true };
};

// ==================== STORIES ====================

export const getUserStories = async (userId) => {
    if (!db) throw new Error('Firestore not initialized');

    try {
        const storiesRef = collection(db, 'users', userId, 'stories');
        const q = query(storiesRef, orderBy('createdAt', 'desc'));

        return new Promise((resolve, reject) => {
            const unsubscribe = onSnapshot(q,
                (snapshot) => {
                    const stories = [];
                    snapshot.forEach((doc) => {
                        stories.push({ id: doc.id, ...doc.data() });
                    });
                    unsubscribe();
                    resolve(stories);
                },
                (error) => {
                    unsubscribe();
                    reject(error);
                }
            );
        });
    } catch (error) {
        console.error('Error getting user stories:', error);
        throw error;
    }
};

export const saveStory = async (userId, story) => {
    if (!db) throw new Error('Firestore not initialized');

    try {
        const storyId = String(story.id || Date.now());
        const docRef = doc(db, 'users', userId, 'stories', storyId);

        const data = {
            ...story,
            id: storyId,
            createdAt: story.createdAt || serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        await setDoc(docRef, data);
        return { ...data, id: storyId };
    } catch (error) {
        console.error('Error saving story:', error);
        throw error;
    }
};

export const deleteStory = async (userId, storyId) => {
    if (!db) throw new Error('Firestore not initialized');

    try {
        const docRef = doc(db, 'users', userId, 'stories', String(storyId));
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting story:', error);
        throw error;
    }
};

// ==================== REAL-TIME SYNC ====================

export const subscribeToProfile = (userId, callback) => {
    if (!db) {
        console.warn('Firestore not initialized, skipping subscription');
        return () => { };
    }

    try {
        const docRef = doc(db, 'users', userId, 'data', 'profile');

        const unsubscribe = onSnapshot(docRef,
            (doc) => {
                if (doc.exists()) {
                    callback(doc.data());
                }
            },
            (error) => {
                console.error('Error in profile subscription:', error);
            }
        );

        return unsubscribe;
    } catch (error) {
        console.error('Error subscribing to profile:', error);
        return () => { };
    }
};

export const subscribeToStories = (userId, callback) => {
    if (!db) {
        console.warn('Firestore not initialized, skipping subscription');
        return () => { };
    }

    try {
        const storiesRef = collection(db, 'users', userId, 'stories');
        const q = query(storiesRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const stories = [];
                snapshot.forEach((doc) => {
                    stories.push({ id: doc.id, ...doc.data() });
                });
                callback(stories);
            },
            (error) => {
                console.error('Error in stories subscription:', error);
            }
        );

        return unsubscribe;
    } catch (error) {
        console.error('Error subscribing to stories:', error);
        return () => { };
    }
};

// ==================== BATCH OPERATIONS ====================

export const batchSaveStories = async (userId, stories) => {
    if (!db) throw new Error('Firestore not initialized');

    try {
        const batch = writeBatch(db);

        stories.forEach((story) => {
            const storyId = String(story.id || (Date.now() + Math.random()));
            const docRef = doc(db, 'users', userId, 'stories', storyId);

            batch.set(docRef, {
                ...story,
                id: storyId,
                createdAt: story.createdAt || serverTimestamp(),
                updatedAt: serverTimestamp()
            });
        });

        await batch.commit();
        console.log(`✅ Batch saved ${stories.length} stories to cloud`);
    } catch (error) {
        console.error('Error batch saving stories:', error);
        throw error;
    }
};

// ==================== COMMUNITY / PUBLIC FEED ====================

export const createPublicPost = async (userId, authorData, content, type = 'text', additionalData = null) => {
    if (!db) throw new Error('Firestore not initialized');

    try {
        const postsRef = collection(db, 'community');
        const newPostRef = doc(postsRef);

        const postData = {
            id: newPostRef.id,
            authorId: userId,
            authorName: authorData.displayName || 'Anonim Koza',
            authorAvatar: authorData.avatarUrl || '',
            content,
            type,
            data: additionalData,
            createdAt: serverTimestamp(),
            likesCount: 0,
            repliesCount: 0,
            tags: extractTags(content)
        };

        await setDoc(newPostRef, postData);
        return postData;
    } catch (error) {
        console.error('Error creating public post:', error);
        throw error;
    }
};

export const getPublicFeed = async (activeTab = 'local', lastDoc = null, limitCount = 20) => {
    if (!db) throw new Error('Firestore not initialized');

    try {
        const postsRef = collection(db, 'community');
        let q;

        if (activeTab === 'local' || activeTab === 'all') {
            q = query(postsRef, orderBy('createdAt', 'desc'), limit(limitCount));
        } else {
            const tag = activeTab.startsWith('#') ? activeTab : `#${activeTab}`;
            q = query(postsRef, orderBy('createdAt', 'desc'), limit(limitCount));
            // Note: In Firestore, filtering by tags usually requires array-contains or a separate structure.
            // For now, we'll do basic global feed or specific tag if we implement it.
            // Let's assume tags are handled via array-contains.
            // q = query(postsRef, where('tags', 'array-contains', tag), orderBy('createdAt', 'desc'), limit(limitCount));
        }

        if (lastDoc) {
            q = query(q, startAfter(lastDoc));
        }

        const snapshot = await getDocs(q);
        const posts = [];
        snapshot.forEach(doc => {
            posts.push({ id: doc.id, ...doc.data() });
        });

        return {
            posts,
            lastDoc: snapshot.docs[snapshot.docs.length - 1] || null
        };
    } catch (error) {
        console.error('Error getting public feed:', error);
        throw error;
    }
};

export const likePost = async (postId) => {
    if (!db) throw new Error('Firestore not initialized');
    try {
        const postRef = doc(db, 'community', postId);
        await updateDoc(postRef, {
            likesCount: increment(1)
        });
    } catch (error) {
        console.error('Error liking post:', error);
    }
};

export const subscribeToNotifications = (userId, callback) => {
    if (!db) return () => { };
    try {
        const notifsRef = collection(db, 'users', userId, 'notifications');
        const q = query(notifsRef, orderBy('createdAt', 'desc'), limit(20));

        return onSnapshot(q, (snapshot) => {
            const notifs = [];
            snapshot.forEach(doc => {
                notifs.push({ id: doc.id, ...doc.data() });
            });
            callback(notifs);
        });
    } catch (error) {
        console.error('Error subscribing to notifications:', error);
        return () => { };
    }
};

const extractTags = (text) => {
    if (!text) return [];
    const tags = text.match(/#\w+/g);
    return tags ? tags.map(t => t.toLowerCase()) : [];
};

// ==================== SYNC HELPERS ====================

export const syncLocalToCloud = async (userId, localData) => {
    if (!db) {
        console.warn('Firestore not initialized, skipping cloud sync');
        return null;
    }

    try {
        // 1. Get existing cloud profile
        const cloudProfile = await getUserProfile(userId);
        let profileToUse = cloudProfile;

        // 2. Migration Gap Fix: Always attempt to push local stories to cloud
        // Using batchSaveStories is safe because it uses setDoc which is idempotent
        if (localData.stories && localData.stories.length > 0) {
            console.log(`📤 Syncing ${localData.stories.length} local stories to cloud...`);
            await batchSaveStories(userId, localData.stories);
        }

        if (!cloudProfile) {
            // First time sign in - Create profile from local stats
            console.log('📤 Creating initial cloud profile for user:', userId);

            profileToUse = {
                xp: localData.user?.xp || DEFAULT_USER.xp,
                level: localData.user?.level || DEFAULT_USER.level,
                nextLevelXp: localData.user?.nextLevelXp || DEFAULT_USER.nextLevelXp,
                totalXP: localData.user?.totalXP || localData.user?.xp || DEFAULT_USER.xp,
                storiesCreated: localData.user?.storiesCreated || 0,
                gamesCreated: localData.user?.gamesCreated || 0,
                storiesRead: localData.user?.storiesRead || 0,
                gamesPlayed: localData.user?.gamesPlayed || 0,
                dailyStreak: localData.user?.dailyStreak || 0,
                lastVisit: localData.user?.lastVisit || new Date().toISOString(),
                title: localData.user?.title || DEFAULT_USER.title,
                achievements: localData.user?.achievements || [],
                badges: localData.user?.badges || []
            };

            await createUserProfile(userId, profileToUse);
            console.log('✅ Migration complete');
            return { migrated: true, profile: profileToUse };
        } else {
            // Merging: For now Cloud Profile wins on stats, but stories were merged above
            console.log('🔄 Profile exists in cloud, prioritizing cloud stats');
            return { migrated: false, profile: cloudProfile };
        }
    } catch (error) {
        console.error('Error in syncLocalToCloud:', error);
        throw error;
    }
};
