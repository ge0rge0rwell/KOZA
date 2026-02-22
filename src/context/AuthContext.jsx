'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    OAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'firebase/auth';
import { googleAnalytics } from '../utils/googleAnalytics';
import { app, auth, db } from '../services/firebase';

const AuthContext = createContext(null);

// Initialize Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

// XState Imports
import { useAuthActor } from './GlobalStateMachineContext';
import { useSelector } from '@xstate/react';

export const AuthProvider = ({ children }) => {
    // Connect to the Auth Machine
    const authActor = useAuthActor();

    // Selectors to get data from the machine
    const user = useSelector(authActor, (snapshot) => snapshot.context.user);
    const status = useSelector(authActor, (snapshot) => snapshot.value);
    const loading = status === 'checking' || status === 'authenticating';

    const [firebaseEnabled, setFirebaseEnabled] = useState(false);

    useEffect(() => {
        const enabled = !!app;
        setFirebaseEnabled(enabled);

        if (!enabled) {
            // If Firebase is not enabled, we tell the machine we are done checking (with no user)
            authActor.send({ type: 'AUTH.CHECK_COMPLETE', user: null });
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL
                };

                // Send event to machine
                authActor.send({ type: 'AUTH.CHECK_COMPLETE', user: userData });

                googleAnalytics.setUserProperties({
                    user_id: firebaseUser.uid,
                    user_email: firebaseUser.email
                });
            } else {
                authActor.send({ type: 'AUTH.CHECK_COMPLETE', user: null });
            }
        });

        return () => unsubscribe();
    }, [authActor]);

    const signInWithGoogle = async () => {
        if (!firebaseEnabled) return { success: false, error: 'Authentication not configured' };

        authActor.send({ type: 'AUTH.LOGIN_START' });

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };

            authActor.send({ type: 'AUTH.LOGIN_SUCCESS', user: userData });
            googleAnalytics.trackEvent('user', 'sign_in', 'google');
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Google sign in failed:', error);
            authActor.send({ type: 'AUTH.LOGIN_FAILURE', error: error.message });
            return { success: false, error: error.message };
        }
    };

    const signInWithGithub = async () => {
        if (!firebaseEnabled) return { success: false, error: 'Authentication not configured' };

        authActor.send({ type: 'AUTH.LOGIN_START' });

        try {
            const result = await signInWithPopup(auth, githubProvider);
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };

            authActor.send({ type: 'AUTH.LOGIN_SUCCESS', user: userData });
            googleAnalytics.trackEvent('user', 'sign_in', 'github');
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Github sign in failed:', error);
            authActor.send({ type: 'AUTH.LOGIN_FAILURE', error: error.message });
            return { success: false, error: error.message };
        }
    };

    const signInWithMicrosoft = async () => {
        if (!firebaseEnabled) return { success: false, error: 'Authentication not configured' };

        authActor.send({ type: 'AUTH.LOGIN_START' });

        try {
            const result = await signInWithPopup(auth, microsoftProvider);
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };

            authActor.send({ type: 'AUTH.LOGIN_SUCCESS', user: userData });
            googleAnalytics.trackEvent('user', 'sign_in', 'microsoft');
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Microsoft sign in failed:', error);
            authActor.send({ type: 'AUTH.LOGIN_FAILURE', error: error.message });
            return { success: false, error: error.message };
        }
    };

    const registerWithEmail = async (email, password) => {
        if (!firebaseEnabled) return { success: false, error: 'Authentication not configured' };

        authActor.send({ type: 'AUTH.LOGIN_START' });

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };

            authActor.send({ type: 'AUTH.LOGIN_SUCCESS', user: userData });
            googleAnalytics.trackEvent('user', 'register', 'email');
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Registration failed:', error);
            authActor.send({ type: 'AUTH.LOGIN_FAILURE', error: error.message });
            return { success: false, error: error.message };
        }
    };

    const signInWithEmail = async (email, password) => {
        if (!firebaseEnabled) return { success: false, error: 'Authentication not configured' };

        authActor.send({ type: 'AUTH.LOGIN_START' });

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };

            authActor.send({ type: 'AUTH.LOGIN_SUCCESS', user: userData });
            googleAnalytics.trackEvent('user', 'sign_in', 'email');
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Login failed:', error);
            authActor.send({ type: 'AUTH.LOGIN_FAILURE', error: error.message });
            return { success: false, error: error.message };
        }
    };

    const signOut = async () => {
        if (!firebaseEnabled) return;

        authActor.send({ type: 'AUTH.LOGOUT_START' });

        try {
            await firebaseSignOut(auth);
            // The onAuthStateChanged listener will fire and handle the rest (AUTH.CHECK_COMPLETE -> user: null)
            // But we can also be explicit if we want:
            // authActor.send({ type: 'AUTH.CHECK_COMPLETE', user: null });

            googleAnalytics.trackEvent('user', 'sign_out', 'manual');
            return { success: true };
        } catch (error) {
            console.error('Sign out failed:', error);
            return { success: false, error: error.message };
        }
    };

    const ADMIN_EMAIL = 'oguzhanacar.bt@gmail.com';

    const value = React.useMemo(() => ({
        user,
        isAdmin: user?.email === ADMIN_EMAIL,
        loading,
        firebaseEnabled,
        firestoreEnabled: !!db,
        signInWithGoogle,
        signInWithGithub,
        signInWithMicrosoft,
        registerWithEmail,
        signInWithEmail,
        signOut
    }), [
        user,
        loading,
        firebaseEnabled,
        signInWithGoogle,
        signInWithGithub,
        signInWithMicrosoft,
        registerWithEmail,
        signInWithEmail,
        signOut
    ]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
