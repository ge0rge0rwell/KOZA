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

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [firebaseEnabled, setFirebaseEnabled] = useState(false);

    useEffect(() => {
        const enabled = !!app;
        setFirebaseEnabled(enabled);

        if (!enabled) {
            setLoading(false);
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
                setUser(userData);
                googleAnalytics.setUserProperties({
                    user_id: firebaseUser.uid,
                    user_email: firebaseUser.email
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        if (!firebaseEnabled) return { success: false, error: 'Authentication not configured' };
        try {
            const result = await signInWithPopup(auth, googleProvider);
            googleAnalytics.trackEvent('user', 'sign_in', 'google');
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Google sign in failed:', error);
            return { success: false, error: error.message };
        }
    };

    const signInWithGithub = async () => {
        if (!firebaseEnabled) return { success: false, error: 'Authentication not configured' };
        try {
            const result = await signInWithPopup(auth, githubProvider);
            googleAnalytics.trackEvent('user', 'sign_in', 'github');
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Github sign in failed:', error);
            return { success: false, error: error.message };
        }
    };

    const signInWithMicrosoft = async () => {
        if (!firebaseEnabled) return { success: false, error: 'Authentication not configured' };
        try {
            const result = await signInWithPopup(auth, microsoftProvider);
            googleAnalytics.trackEvent('user', 'sign_in', 'microsoft');
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Microsoft sign in failed:', error);
            return { success: false, error: error.message };
        }
    };

    const registerWithEmail = async (email, password) => {
        if (!firebaseEnabled) return { success: false, error: 'Authentication not configured' };
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            googleAnalytics.trackEvent('user', 'register', 'email');
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Registration failed:', error);
            return { success: false, error: error.message };
        }
    };

    const signInWithEmail = async (email, password) => {
        if (!firebaseEnabled) return { success: false, error: 'Authentication not configured' };
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            googleAnalytics.trackEvent('user', 'sign_in', 'email');
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false, error: error.message };
        }
    };

    const signOut = async () => {
        if (!firebaseEnabled) return;
        try {
            await firebaseSignOut(auth);
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
